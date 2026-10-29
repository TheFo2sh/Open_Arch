# Autoscaling Asynchronous Job Queues

AWS's [Autoscaling Asynchronous Job Queues reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/autoscaling-async-job-queues/autoscaling-async-job-queues.html), represented as an M1Spec architecture template. Sources: [numbered architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/autoscaling-async-job-queues/images/autoscaling-async-job-queues.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/autoscaling-async-job-queues/autoscaling-async-job-queues.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). This blueprint models the architecture; it does not deploy AWS infrastructure.

## What it is for

The pattern accepts work for asynchronous background processing, then scales parallel container jobs in response to the depth of each job type's queue. AWS gives document generation, extract-transform-load (ETL) work, and inference as example workloads.

## Architecture and data flow

1. For each job type, the reference calls for an Amazon ECS service with `desiredCount = 0`, an Amazon SQS queue, and associated Amazon CloudWatch alarms.
2. Amazon API Gateway provides an interface for adding, querying, and canceling jobs.
3. The add-job AWS Lambda function creates the job state item in Amazon DynamoDB and enqueues the job ID in Amazon SQS.
4. The SQS queue contains IDs of jobs to be processed.
5. CloudWatch monitors queue depth. Alarms trigger when the depth exceeds a configurable value and when the queue is empty.
6. Amazon ECS responds to the alarms by changing the desired count and scaling the number of parallel jobs.
7. AWS Fargate runs job processing containers from Amazon ECR. Containers poll SQS for job IDs, read the corresponding DynamoDB item, perform the job, update its status in DynamoDB, and publish to an Amazon SNS topic when its state changes.
8. A DynamoDB table stores job state, parameters, and results by job ID.
9. Amazon ECR stores job processor images. The SNS topic publishes job items on state changes to subscribers.
10. Two control Lambda functions let API Gateway query and cancel jobs by reading or updating the DynamoDB item.

## Assumptions and unspecified details

AWS does not name the job types beyond examples, the API clients, SNS subscribers, container implementation, job payloads, or job-state schema. The API client and status-subscriber systems are generic slots for consumer systems, not specified third-party products. The template represents a generic job type; repeat the queue, alarms, ECS service, and worker path for each required type.

The source does not prescribe API routes, authentication, queue settings, alarm thresholds, scaling bounds, task sizing, retry behavior, cancellation effects on running work, or networking and security configuration. In particular, it says cancellation updates the job item but does not describe how an already-running container is stopped. These details remain choices for the adopting team.

## What consumers usually customize

- Map the job API client, job-management functions, worker system, and status subscribers to the project's systems, or omit slots that do not apply.
- Define job types, job payloads and state transitions, and container images for the actual processing workloads.
- Set queue, alarm, scaling, retry, and cancellation behavior to match processing and service requirements.
- Add the project's API security, network, deployment, and operational details when turning the blueprint into infrastructure.
