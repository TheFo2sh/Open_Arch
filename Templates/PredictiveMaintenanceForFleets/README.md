# Predictive Maintenance for Fleets

An M1Spec architecture template based on AWS's [Predictive Maintenance for Fleets reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/predictive-maintenance-for-fleets/predictive-maintenance-for-fleets.html) and its [linked diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/predictive-maintenance-for-fleets/images/predictive-maintenance-for-fleets.png), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source page was published October 21, 2020.

## What it is for

Predict battery failures in a vehicle fleet by training a model on historical telemetry, evaluating live sensor logs, and scheduling controlled maintenance before a predicted failure.

## How it works

1. The Fleet Management system provides an extract containing vehicle data and historical sensor logs to Amazon S3.
2. Amazon SageMaker AI trains and deploys a battery-failure prediction model from the historical data. The diagram also shows a notebook instance.
3. Connected vehicles send live sensor logs to AWS IoT Core. The source also shows an HTTP interface as an alternate ingress path; AWS does not identify its implementation.
4. AWS IoT Core routes telemetry to AWS Lambda for analysis. The diagram also routes telemetry through Amazon Kinesis Data Firehose to Amazon S3 for historical use.
5. AWS Lambda runs the trained model against incoming sensor logs and generates predictions.
6. Amazon Aurora stores completed predictions for record-keeping and future model improvements.
7. Amazon QuickSight displays the predictions on a dashboard.
8. AWS Lambda publishes real-time failure warnings through Amazon Simple Notification Service, which notifies connected vehicles so drivers and fleet managers can schedule maintenance.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| AWS platforms | Amazon S3, Amazon SageMaker AI, AWS IoT Core, Amazon Data Firehose, AWS Lambda, Amazon Aurora, Amazon QuickSight, and Amazon Simple Notification Service |
| Slots | **Fleet Management system**, **Connected vehicles**, and **Driver and fleet manager**; map these to the project's own systems and users |
| Database | **Historical vehicle data and sensor logs** on Amazon S3; **Vehicle battery predictions** on Amazon Aurora |
| Function | **Battery prediction function** on AWS Lambda |

The source names no third-party product or connectivity provider. The Fleet Management system and connected vehicles are external system slots, not vendor-specific integrations. No third-party service or API is specified by AWS.

## Assumptions and unspecified details

The template models the source diagram and its numbered flow without prescribing implementation choices AWS leaves open:

- The Fleet Management system's vendor, export format, transfer mechanism, API, and data schema are not specified.
- The HTTP ingress is shown as a flow to Lambda, but its product, endpoint, API contract, authentication, and network path are not identified.
- Vehicle connectivity, telemetry formats and rates, identity management, and delivery guarantees are not described.
- The model algorithm, features, training schedule, evaluation criteria, deployment configuration, and prediction thresholds are unspecified. The diagram's notebook instance and SageMaker model are represented as part of the SageMaker AI platform.
- The AWS source says Amazon Aurora but does not name a database engine, schema, retention policy, or availability design.
- The QuickSight dashboard and access controls, SNS subscriptions and delivery channels, and maintenance scheduling integration are not detailed. AWS states that warnings let fleet managers schedule controlled maintenance; it does not specify an automated scheduling system.

This is an architecture template, not an AWS deployment plan. It does not specify a Region, VPC, IAM policies, infrastructure code, or service configuration.

## What teams usually customize

- Map the Fleet Management system, connected vehicles, and driver/fleet manager slots to the actual fleet systems, user groups, and connectivity provider.
- Define the extract, telemetry, and prediction data models, including retention and quality requirements.
- Choose the SageMaker training and deployment process, Lambda inference implementation, and battery-failure thresholds.
- Specify the HTTP ingress and security controls, Aurora engine and schema, QuickSight dashboards, and SNS delivery channels.
- Add the consumer's maintenance scheduling workflow after deciding whether it is manual or integrated with an existing fleet system.
