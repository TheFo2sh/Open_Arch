# Machine Learning Enabled Predictive Maintenance on AWS

An M1Spec architecture template based on AWS's [Machine Learning Enabled Predictive Maintenance on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ml-predictive-maintenance/ml-predictive-maintenance.html), its [linked architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ml-predictive-maintenance/images/machine-learning-enabled-predictive-maintenance-ra.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ml-predictive-maintenance/ml-predictive-maintenance.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The reference was published September 13, 2022.

## What it is for

Implement condition-based maintenance with near-real-time inference results and notifications for sucker rod pumping systems in oil and gas operations.

## How it works

1. **Collect at the edge.** Temperature sensors on sucker rod pumps send data to factory devices. An IoT device SDK publishes it to AWS IoT Core using MQTT.
2. **Store time-series data.** An AWS IoT Core rule stores the incoming sensor data in Amazon Timestream.
3. **Visualize telemetry.** Amazon Managed Grafana visualizes and monitors the sensor data from Timestream.
4. **Deliver data to S3.** A second IoT Core rule captures, transforms, and sends telemetry through Amazon Data Firehose to Amazon S3. The PDF diagram labels this service Amazon Kinesis Data Firehose; the AWS page calls it Amazon Data Firehose.
5. **Detect abnormalities.** Amazon Lookout for Equipment analyzes data in S3 with a unique ML model and writes inference results back to S3.
6. **Catalog the data.** An AWS Glue crawler categorizes the S3 data in the AWS Glue Data Catalog.
7. **Query and visualize results.** Amazon Athena uses the catalog for on-demand queries, and Amazon Managed Grafana displays the inference results.

## What applying it brings

| | |
|---|---|
| Zones | **Oil and gas field**, **Edge device**, and **AWS Cloud** |
| Systems (slots) | **Sucker rod pumps and temperature sensors** and **Factory devices** |
| AWS platforms | AWS IoT Core, Amazon Timestream, Amazon Managed Grafana, Amazon Data Firehose, Amazon S3, Amazon Lookout for Equipment, AWS Glue, and Amazon Athena |
| Container | **IoT device client**, using the AWS IoT Device SDK and MQTT |
| Databases | Pump sensor time-series data on Timestream, predictive-maintenance data on S3, and the AWS Glue Data Catalog on AWS Glue |

No human user is shown in the source diagram, so this template does not add a user slot. The diagram does not identify a required third-party service. MQTT is shown as a protocol, and AWS IoT Device SDK is an AWS library; the pump and sensor manufacturers are unspecified.

## Assumptions and unspecified details

- The diagram shows four pumps and temperature sensors, modeled as one pump-fleet system slot rather than prescribing four separate systems.
- The source shows a single S3 icon for telemetry and inference results but does not specify the bucket count or layout. The blueprint represents it as one logical data store; it does not prescribe a bucket implementation.
- AWS does not specify the device vendor, SDK language, MQTT version or settings, telemetry schema or sampling rate, IoT rule SQL, Firehose transformations, Timestream retention, S3 organization or retention, Lookout model configuration, or Athena queries and Grafana dashboards.
- The source does not describe alert delivery channels or recipients despite mentioning notifications in its use-case description. No notification service, user role, or notification flow is inferred in this template.
- This is an architecture template, not an AWS deployment plan. It does not prescribe a Region, network design, security policies, infrastructure code, or service configuration.

## What teams usually customize

- Map the pump fleet and factory-device slots to the project's actual equipment, sensors, and device software.
- Define the device SDK, MQTT configuration, telemetry format, IoT rules, and Firehose transformation and delivery settings.
- Choose S3 bucket organization and retention, Timestream retention, Lookout model settings, catalog structure, queries, and Grafana dashboards.
- Add the specific operational alerting and notification path if the project requires one; AWS does not specify it in this reference.
