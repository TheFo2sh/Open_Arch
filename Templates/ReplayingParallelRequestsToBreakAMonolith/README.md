# Replaying Parallel Requests to Break a Monolith

An AWS reference architecture for safely modernizing endpoints in a legacy monolith with a strangler facade and replay-based comparison. Source: [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/replaying-parallel-requests/replaying-parallel-requests.html), [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/replaying-parallel-requests/images/replaying-parallel-requests.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/replaying-parallel-requests/replaying-parallel-requests.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The template models a parallel run for replacing selected monolith endpoints. Production requests continue to reach the monolith through API Gateway and Refactor Spaces; the recorder proxies the selected requests to the monolith while capturing payloads for a separate replay flow.

## How it works

1. **Route production traffic.** AWS Migration Hub Refactor Spaces places Amazon API Gateway in front of the legacy application. Unchanged endpoints go to the monolith on Amazon EC2; endpoints being modernized go to the proxy recorder.
2. **Capture the monolith behavior.** The recorder forwards requests to the monolith, which uses its Amazon RDS database. It copies request and response payloads to Amazon Kinesis Data Streams. Amazon Kinesis Data Firehose delivers the stream to an Amazon S3 bucket, and a sorter function stores the payloads in time order in Amazon Timestream.
3. **Establish a replay baseline.** AWS Backup periodically snapshots the monolith database to Amazon S3. An AWS Step Functions replay workflow first resets the microservice's temporary Amazon RDS database from that snapshot.
4. **Replay in isolation.** A sequencer fetches requests recorded since the snapshot time from Timestream and puts them on an Amazon SQS FIFO queue. A request repeater invokes the microservice API for each queued request and writes its responses to a separate Amazon S3 bucket.
5. **Compare results.** A response comparer matches the monolith and replay responses, sends an alarm through Amazon SNS when they differ, and stores final results in the Timestream requests database.

The recorder's production path and the reset/replay/compare path are modeled separately: replay does not send its requests through the production recorder.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Refactor Spaces, API Gateway, EC2, RDS, Lambda, Kinesis Data Streams, Kinesis Data Firehose, S3, Timestream, AWS Backup, Step Functions, SQS, SNS |
| Slots | **User**, **Legacy monolith**, and **Microservice API**; map these to the project's own users and systems when applying the template |
| Function containers | Proxy recorder, sorter, database reset, sequencer, request repeater, and response comparer |
| Databases | Monolith and temporary replay databases on RDS; recorded payloads, snapshots, and replay responses on S3; ordered requests and results on Timestream |

## Assumptions and unspecified details

The AWS source does not specify the application language or framework, API contract or authentication, database engine or schema, microservice hosting platform, Lambda runtimes, payload format or matching key, exact sorter trigger, snapshot schedule or retention, or deployment/network topology. These remain implementation choices rather than added architecture components. The “requests database” for ordered requests and final results is represented by the Timestream store shown in the diagram; no separate database service is inferred. The source names no third-party service.

## What teams usually customize

- Map the legacy monolith and microservice API slots to the project's systems, and adjust which endpoints are routed to the recorder.
- Define the API contract, request identity/matching logic, snapshot cadence, payload retention, and comparison criteria for the application's data and consistency needs.
- Choose the microservice's hosting platform, database engine/schema, function runtimes, access controls, and networking; these deployment details are not prescribed by the reference architecture.
