# Build your own Anomaly Detection ML Pipeline

An AWS machine-learning pipeline template based on AWS's [Build your own Anomaly Detection ML Pipeline reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/anomaly-detection-ml-pipeline/anomaly-detection-ml-pipeline.html). The linked [AWS architecture diagram (PDF)](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/build-your-own-anomaly-detection-ml-pipeline-ra.pdf?did=wp_card&trk=wp_card) is the source for the service and flow details.

> **Source verification note:** The AWS page and PDF could not be retrieved while this template was prepared because the environment could not resolve AWS hostnames. The service flow below is therefore a provisional interpretation, not a verified transcription of the diagram. In particular, AWS's exact ingestion, model training/inference, notification, monitoring, and third-party integrations are not verified here. Confirm these against the source diagram before relying on or applying the template.

## What it is for

An anomaly-detection workflow that collects observations, prepares training data, trains a model, scores new observations, and routes detected anomalies for notification.

## How it works

1. **Amazon Kinesis Data Streams** accepts observations; the blueprint shows them archived in **Amazon S3**.
2. **AWS Glue** prepares the stored observations, writing training data back to S3.
3. **Amazon SageMaker** trains a model from the prepared data and stores model artifacts in S3.
4. The stream supplies new observations for scoring with the trained model. **AWS Lambda** handles the scores, sends anomaly notifications through **Amazon SNS**, and publishes operational metrics to **Amazon CloudWatch**.

## Assumptions and details to verify

- The service sequence above is not confirmed against AWS's diagram in this environment. It is a high-level modeling assumption; implementation details such as triggers, interfaces, model algorithm, endpoint mode, retention, and alert thresholds are not specified here.
- No third-party product is included in the provisional catalog because the source's third-party integrations could not be verified. Add any shown by AWS after checking the linked PDF.
- The blueprint uses an **ML engineer** as a user slot to illustrate model interaction. Confirm or adapt that role to the source diagram and the consuming project's domain.
- This is an M1Spec architecture template, not deployable AWS infrastructure. Network layout, IAM, encryption, scaling, and operational configuration are outside its scope.

## What teams usually customize

- Replace the provisional service flow with the exact source diagram and the team's actual data producers, transformations, and scoring path.
- Map the ML engineer and workflow systems onto the project's existing users and systems.
- Add the algorithm, data formats, training cadence, inference mode, retention, alarm policy, security controls, and any required third-party services once those design choices are known.
- Add deployment-specific network, identity, storage, and monitoring details in the infrastructure design rather than treating this template as a deployment plan.
