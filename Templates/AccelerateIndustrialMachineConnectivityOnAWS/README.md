# Accelerate Industrial Machine Connectivity on AWS

An industrial connectivity architecture for ingesting real-time sensor data and asset models from historians and SCADA systems into AWS IoT SiteWise, then delivering asset-property updates to an Amazon S3 data lake.

**Source:** [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-machine-connectivity-eot/industrial-machine-connectivity-eot.html), published April 22, 2021. The source page links the [six-page PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-machine-connectivity-eot/industrial-machine-connectivity-eot.pdf#industrial-machine-connectivity-eot). See also the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Connecting industrial historians, OPC servers, and SCADA platforms to AWS IoT SiteWise for asset modeling and real-time sensor-data ingestion. The architecture also sends SiteWise property updates to S3, where downstream applications can use them for reporting, analytics, and model training.

## How it works

1. **Industrial sources.** OSIsoft PI, legacy historians, and CygNet SCADA collect real-time data from industrial devices and sensors.
2. **Edge connectivity.** Embassy of Things Twin Talk Express runs on an AWS Certified industrial PC and ingests real-time sensor data and asset models from supported historians.
3. **Asset-model provisioning.** Twin Talk uploads enriched asset-model files to an S3 bucket. An upload triggers a Lambda function to normalize the files for SiteWise and store the asset models and definitions in DynamoDB. DynamoDB Streams then triggers another Lambda function to create or update assets in SiteWise.
4. **Time-series ingestion.** Twin Talk sends real-time sensor data directly to AWS IoT SiteWise, which filters, transforms, and processes the data.
5. **Data lake delivery.** SiteWise publishes an MQTT message for each property update to AWS IoT Core. An IoT rule forwards the messages to Amazon Data Firehose, which captures and transforms them before delivering them to an S3 data lake.
6. **Downstream use.** ML and third-party applications can consume the S3 data for reporting, analytics, and model training.

## What applying it brings

| | |
|---|---|
| Zones | **Industrial site** (platform `other`) and **AWS** |
| Systems (slots) | **Industrial historians and SCADA**, **EOT Twin Talk Express**, **Asset Model Converter** on Lambda, and **Analytics and ML consumers** |
| AWS platforms | Amazon S3, AWS Lambda, Amazon DynamoDB, AWS IoT SiteWise, AWS IoT Core, Amazon Data Firehose |
| Databases | Incoming asset-model files and industrial data lake on S3; asset-model definitions on DynamoDB; industrial assets and property data on SiteWise |
| Third-party technologies | Embassy of Things Twin Talk Express, OSIsoft PI, and CygNet SCADA |

No human actor is shown in the source architecture, so the template does not add a user slot. The industrial PC is described in the edge system slot rather than modeled as an AWS service.

## What AWS does not specify

The reference does not identify the particular legacy historians or downstream ML and third-party applications. It also leaves implementation details such as historian protocols, connectivity and network design, authentication, buffering and retry behavior, asset-model schema, Lambda configuration, S3 organization and retention, Firehose transformations, and deployment sizing to the implementer. These are open design decisions, not claims that a deployed system lacks those controls. The diagram shows no command or actuation flow back to industrial equipment.

## What teams usually customize

- **Industrial sources and edge setup.** Select the supported historians and SCADA systems, Twin Talk configuration, and the AWS Certified industrial PC and its site connectivity.
- **Asset-model handling.** Define the model format and mapping, normalization rules, DynamoDB definitions, and SiteWise asset/property structure.
- **Data-lake delivery.** Choose bucket organization, retention, access controls, and the Firehose transformations appropriate to the data.
- **Consumers.** Map the downstream slot to the project's reporting, analytics, or model-training systems.
- **Operations and security.** Design the network, identity and access, encryption, monitoring, buffering, retries, and availability for the actual deployment; these details are not prescribed by the reference.
