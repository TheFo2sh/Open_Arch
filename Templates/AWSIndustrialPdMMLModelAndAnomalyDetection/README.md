# AWS Industrial PdM ML Model and Anomaly Detection

An M1Spec template based on AWS's [AWS Industrial PdM ML Model and Anomaly Detection reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-pdm-ml-anomaly-detection/industrial-pdm-ml-anomaly-detection.html), its [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/industrial-pdm-ml-anomaly-detection/images/aws-industrial-PdM-ML-anomaly-RA.png), and its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-pdm-ml-anomaly-detection/industrial-pdm-ml-anomaly-detection.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS published the architecture on March 4, 2024.

## What it is for

Build a predictive-maintenance machine-learning model for factory equipment and detect anomalies in streaming telemetry. SageMaker AI builds the model for deployment to an AWS IoT Greengrass edge gateway, while Amazon Managed Service for Apache Flink provides the streaming anomaly-detection application.

## How it works

1. **Collect at the edge.** Factory machines communicate with connectors configured in AWS IoT Greengrass on the edge gateway.
2. **Route factory telemetry.** AWS IoT Core rules trigger on MQTT topics. Amazon Data Firehose delivers factory data into an Amazon S3 data lake.
3. **Build and deploy the model.** Amazon SageMaker AI builds a predictive-maintenance model, which is deployed to the Greengrass edge gateway for inference.
4. **Query and visualize data.** Amazon Athena queries the S3 data lake using the AWS Glue Data Catalog. Amazon QuickSight visualizes analysis from Athena.
5. **Detect anomalies in streams.** AWS IoT Core also routes messages to Amazon Kinesis Data Streams. An application on Amazon Managed Service for Apache Flink analyzes the stream and sends its output to Amazon Data Firehose and AWS Lambda.
6. **Notify.** AWS Lambda sends anomaly notifications to Amazon SNS.

The diagram shows two Firehose delivery streams: one for factory data and another from the stream-analytics path to S3. It also depicts a Lambda function on the factory side for edge inference; the numbered steps identify model deployment to Greengrass but do not specify the function's implementation.

## What applying it brings

| | |
|---|---|
| Zones | **Factory** and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, AWS IoT Core, Amazon Data Firehose, Amazon S3, Amazon SageMaker AI, Amazon Athena, AWS Glue Data Catalog, Amazon QuickSight, Amazon Kinesis Data Streams, Amazon Managed Service for Apache Flink, AWS Lambda, and Amazon SNS |
| Slots | **Factory machines**, **Factory edge gateway**, and **Anomaly detection application** systems |
| Containers | Factory machine connectors and the edge inference function on the Greengrass gateway |
| Databases | Factory data lake on S3 and metadata catalog on AWS Glue Data Catalog |

No third-party service vendor or product is named in the source. MQTT is a protocol, not a required third-party service.

## Assumptions and unspecified details

The template follows the AWS page's numbered steps and linked diagram. The source does not identify factory equipment or connector products, MQTT topic schemas, telemetry formats or rates, S3 bucket layout or retention, the SageMaker training data and model configuration, the Greengrass deployment mechanism, Flink application logic or anomaly thresholds, the exact stream-analytics output sent to Firehose, or SNS subscribers and delivery channels. These details are left for consumers rather than inferred.

The blueprint represents the documented S3/Flink/Firehose connections without assigning an unspecified data schema or processing behavior. It does not prescribe a Region, VPC, security policies, availability design, service configuration, or infrastructure code. This is an architecture template, not an AWS deployment.

## What teams usually customize

- Map the factory-machine, edge-gateway, and anomaly-detection application slots to their own systems; add actual operators or other users only if their architecture needs them.
- Identify the machine interfaces, Greengrass connectors, telemetry schemas, and IoT Core rules.
- Define the training dataset and model lifecycle, the Flink detection logic, and any edge inference implementation.
- Configure Firehose delivery, S3 layout and retention, Glue/Athena tables and queries, QuickSight views, and notification subscriptions.
- Add the network, security, service settings, and deployment mechanisms required for their AWS environment.
