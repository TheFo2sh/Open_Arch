# Creating Multi-Account IoT Pipelines On-The-Fly

An AWS IoT Analytics architecture that creates account-level pipelines as device groups arrive, based on AWS's [reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/multi-account-iot-pipelines/multi-account-iot-pipelines.html) and its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/multi-account-iot-pipelines/multi-account-iot-pipelines.pdf).

## What it is for

The design routes telemetry from new IoT device groups into AWS IoT Analytics pipelines in different AWS accounts. The reference diagram shows two illustrative customer accounts; it is not a deployment recipe or a complete account/security design.

## How it works

1. Device telemetry enters an **Amazon Kinesis Data Streams** stream and is processed by **Amazon Managed Service for Apache Flink**. The page calls it Managed Service for Apache Flink; the 2020 diagram uses the former name, Kinesis Data Analytics for Java.
2. Flink detects an unregistered device-group shard, buffers its messages in a custom window, and emits an event. A shard-registration **AWS Lambda** function creates an account and **Amazon S3** bucket when the current account lacks capacity.
3. Using the **AWS SDK**, the function creates an **AWS IoT Analytics** channel, pipeline, and data store for the shard and records their registration in **Amazon DynamoDB**. A registration event supplies the channel information to Flink so it can resume processing the buffered messages.
4. Flink routes each device group's telemetry to the channel in its registered account. AWS IoT Analytics transforms channel messages through its pipeline and writes transformed data to a data store backed by S3.
5. When Flink detects a new device, an asynchronous event triggers a second Lambda function to create an AWS IoT Analytics dataset. Each device's dataset uses a delta-time query on the data store for that device's most recent five minutes of data.
6. Device data can be queried with **AWS Glue** or **Amazon Redshift Spectrum**. **Amazon CloudWatch** is also shown in the diagram; the documentation does not detail its monitoring configuration.

## Assumptions and limits

- The two customer-account zones mirror the two accounts drawn in the reference; the design supports additional accounts.
- AWS describes creating a new account when an account lacks capacity, but does not define the capacity threshold, Organizations setup, account vending workflow, or which account owns the pipeline and query services. The blueprint depicts account boundaries for clarity without assigning those ownership details.
- AWS does not specify the shard/event schemas, Flink window duration, function implementation language, IAM roles and cross-account trust, network topology, regions, quotas, retention, or security configuration. The AWS SDK language and version are unspecified as well.
- The source names only AWS services and the AWS SDK; it does not identify a third-party service. This template does not invent one.
- This is an M1Spec architecture template, not deployable infrastructure. The diagram's S3-backed data store is represented separately from the AWS IoT Analytics channel, pipeline, and dataset resources.

## What teams usually customize

- The source telemetry system, number of device groups and target accounts, and the account-capacity decision.
- Event schemas, Flink buffering and transformations, registration behavior, and the five-minute dataset query window.
- Account ownership, IAM and cross-account permissions, regions, networking, data retention, and S3 security.
- The query path, including whether to use AWS Glue, Redshift Spectrum, or both.
