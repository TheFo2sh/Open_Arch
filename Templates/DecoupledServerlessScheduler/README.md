# Decoupled Serverless Scheduler

An AWS reference architecture for submitting HPC jobs to a queue and running them on EC2 workers. This template represents both the base scheduler (Part 1) and the S3-triggered worker-scaling extension (Part 2).

## What it is for

Use the base pattern when HPC jobs should be decoupled from the EC2 instances that execute them. An operator submits jobs to Amazon SQS using AWS Systems Manager Run Command; Step Functions polls the queue and runs jobs on previously launched EC2 instances. The Part 2 extension uses S3 object events to submit jobs and adjusts an EC2 Auto Scaling group to match the queue.

## How it works

### Part 1: queue-based scheduler

1. The operator submits jobs to Amazon SQS using Systems Manager Run Command, for example with Bash or Windows PowerShell.
2. The operator launches an EC2 instance or cluster tagged with `scheduler-queue`; the tag value is the SQS job queue name.
3. An EC2 launch event triggers AWS Lambda. Lambda finds the tag and starts a Step Functions state machine with the instance ID and queue name.
4. The workflow polls SQS for jobs and runs them on the previously launched EC2 instance or cluster until no jobs remain.
5. The workflow continuously writes job status to a DynamoDB table. The operator checks status through the AWS Management Console or AWS CLI.

### Part 2: S3-triggered jobs and worker scaling

1. The operator uploads job input files and executables to S3 instead of submitting job definitions directly to SQS.
2. An S3 event triggers Lambda to create and submit jobs to the queue.
3. Lambda monitors the job queue and adjusts the desired EC2 Auto Scaling group size. The group scales workers from zero to a configured maximum.
4. The operator downloads results from S3 and monitors job status through the AWS Management Console or AWS CLI.

## What applying it brings

- **Zone:** AWS.
- **User slot:** HPC operator.
- **System slots:** operator's job submission and monitoring tools, and the consumer-provided HPC application.
- **Platforms:** Amazon SQS, AWS Step Functions, Amazon EC2, Amazon CloudWatch Events, AWS Lambda, Amazon DynamoDB, AWS Systems Manager Run Command, Amazon S3, and Amazon EC2 Auto Scaling.
- **Database:** job status table on DynamoDB.

The source does not identify a required third-party service. The HPC application and its runtime are consumer-provided and unspecified. This is an architecture template, not an infrastructure deployment.

## Assumptions and unspecified details

AWS describes the flow and the `scheduler-queue` tag but does not define the job message format, queue configuration, DynamoDB schema, state-machine implementation, worker instance types or operating system, HPC application, or result layout in S3. The blueprint leaves those details open. It does not infer a job runner, additional storage service, network design, security configuration, or deployment mechanism.

## What teams usually customize

- The HPC application, worker image, instance or cluster configuration, and how the workload is invoked.
- SQS queue naming, job payloads, and any queue policies or failure handling.
- The DynamoDB job-status schema and how operators view status.
- For Part 2, the S3 input/result layout and the Lambda logic and scaling policy, including the desired and maximum worker counts.
- The submission and monitoring tools used by the project.

## Sources

- [AWS Decoupled Serverless Scheduler](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/), including [Part 1](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/decoupled-serverless-scheduler-part1.html) and [Part 2](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/decoupled-serverless-scheduler-part2.html).
- [Part 1 diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/images/decoupled-serverless-scheduler-1.png) and [Part 2 diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/images/decoupled-serverless-scheduler-2.png).
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/decoupled-serverless-scheduler/decoupled-serverless-scheduler.pdf).
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).
