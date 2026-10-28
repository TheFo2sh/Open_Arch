# Serverless Real-Time Analytics for Games

An AWS serverless event pipeline for cross-platform games, based on AWS's [Serverless Real-Time Analytics for Games reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-real-time-analytics-games/serverless-real-time-analytics-games.html), first published August 9, 2021.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-real-time-analytics-games/serverless-real-time-analytics-games.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-real-time-analytics-games/images/serverless-real-time-analytics-games.png)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/serverless-real-time-analytics-games/serverless-real-time-analytics-games.pdf#serverless-real-time-analytics-games)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Collect game events, analyze them in real time, and retain processed events for batch analysis. AWS describes uses including real-time offers, user-acquisition monitoring, abusive-player detection, A/B-test analysis, and business or operational dashboards.

## How it works

1. **Collect client events.** A game client can submit JSON events directly to **Amazon Kinesis Data Streams** using an AWS SDK. AWS names Unity with the AWS SDK for .NET and Unreal Engine with the AWS SDK for C++ as examples. In this option, **Amazon Cognito** supplies temporary credentials through an identity pool. Alternatively, the client can send events to **Amazon API Gateway**, which has a native Kinesis integration and does not require Cognito.
2. **Collect server events.** Multiplayer game servers, backend servers, and other services can send events directly to Kinesis using an AWS SDK or through API Gateway. AWS recommends an authoritative server when possible.
3. **Analyze in real time.** **Amazon Managed Service for Apache Flink** consumes the stream and runs real-time SQL to analyze, filter, and process events. The diagram labels this service **Amazon Kinesis Data Analytics**. An **AWS Lambda** function processes the data and publishes custom metrics to **Amazon CloudWatch**. CloudWatch can display operational and game-event dashboards; alerts and notifications can use **Amazon SNS**.
4. **Store for batch analysis.** **Amazon Data Firehose** consumes the stream and batches records for **Amazon S3**. Firehose can preprocess records through its built-in Lambda integration; AWS gives Parquet conversion as an example. The S3 data lake can use Intelligent-Tiering, lifecycle policies, and storage tiers for historical data.
5. **Explore and visualize.** **Amazon Athena** queries the S3 data on an ad hoc basis, and **Amazon QuickSight** visualizes results for business insights.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Cognito, API Gateway, Kinesis Data Streams, Managed Service for Apache Flink, Lambda, CloudWatch, SNS, Data Firehose, S3, Athena, QuickSight |
| Slots | **Game client** and **Game servers and backend services**, mapped to the project's own systems |
| Functions | **Real-time metrics function** and **Firehose transformation function** on Lambda |
| Database | **Game analytics data lake** on S3 |

The AWS source does not name or require a third-party service. Unity and Unreal Engine are examples of client game engines, not required external analytics services. The SDK and engine entries in the technology catalog capture these source-mentioned choices; select the relevant SDK for a client rather than treating both as requirements.

## Assumptions and details not specified by AWS

- The source describes two alternative client-ingestion paths: direct SDK access using Cognito-issued temporary credentials, or API Gateway without Cognito. The blueprint shows both as options, not as a requirement to deploy both. Server events may also use either route.
- The source names no required third-party service, client identity provider beyond Cognito, or downstream recipient of SNS notifications.
- AWS does not prescribe event schemas, stream sizing or retention, API routes, Flink SQL, Lambda implementation, metric definitions, dashboard layouts, SNS topics/subscribers, Firehose buffering settings, S3 bucket layout, or Athena catalog and query definitions.
- Parquet conversion is an example, not a required output format. S3 Intelligent-Tiering and lifecycle policies are recommendations, not fixed configuration.
- The reference describes the architecture and data flow, not network topology, IAM policies, encryption, retry behavior, service quotas, or deployable infrastructure. Those remain implementation decisions.

## What teams usually customize

- Map the **Game client** and **Game servers and backend services** slots to their own systems; decide whether client events use the SDK/Cognito path, the API Gateway path, or both.
- Choose event contracts, authoritative sources, stream and Flink processing behavior, and which events produce metrics or notifications.
- Configure Firehose transformations, the S3 data lake's format and lifecycle, Athena's catalog and queries, and the QuickSight dashboards for the team's analytics use cases.
- Define deployment, security, reliability, and operational settings; this template is an M1Spec architecture blueprint, not AWS deployment code.
