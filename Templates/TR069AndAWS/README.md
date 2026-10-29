# TR-069 and AWS

An architecture for connecting TR-069 customer premises equipment (CPE) fleets to AWS for telemetry collection, real-time analytics, data lake insights, and corrective actions. Based on AWS's [TR-069 and AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tr-069-and-aws/tr-069-and-aws.html).

## What it is for

Collect KPIs and TR-181 parameters from remote gateways, detect fleet problems, and use the findings to inform operators, customers, external systems, and corrective actions through the Auto Configuration Server (ACS).

## How it works

1. The ACS configures remote gateways using TR-069. AWS says the ACS may run on-premises or on AWS; this template leaves it outside the AWS zone because the source does not choose a deployment.
2. Gateways send KPIs and TR-181 parameters to AWS IoT Core using HTTPS with custom domains or MQTT. For HTTPS ingestion, an IoT Core custom authorizer is optional.
3. IoT rules route authenticated messages to a raw Amazon Kinesis Data Streams stream.
4. Amazon Managed Service for Apache Flink normalizes TR-181 payloads, emits the normalized data to a distinct second Kinesis stream, and detects CPE problems. Findings can trigger corrective ACS actions.
5. Amazon Data Firehose delivers normalized telemetry to the data lake. AWS Database Migration Service (AWS DMS) brings additional ACS metrics collected outside TR-069 into the lake.
6. Amazon QuickSight and Amazon CloudWatch visualize and monitor fleet health. Lake data and insights also feed external systems and corrective ACS actions.
7. Amazon Connect and Amazon SNS notify operational personnel and end customers based on findings.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Systems | **Remote customer gateways (CPE)**, **Auto Configuration Server (ACS)**, an **external systems** slot, and a recipient-facing notification slot |
| Users | **Operations personnel** and **End customers** |
| Platforms | AWS IoT Core, Kinesis Data Streams, Managed Service for Apache Flink, Data Firehose, DMS, a logical data lake destination, QuickSight, CloudWatch, Amazon Connect, and Amazon SNS |
| Databases | **Raw telemetry stream** and **Normalized TR-181 stream** on Kinesis; **Fleet data lake** on the logical data lake destination |
| Protocols | TR-069, TR-181, MQTT, and HTTPS |

## Assumptions and unspecified details

- The AWS numbered flow describes a data lake repository but does not name its backing storage service. The blueprint uses a logical `Data lake repository` platform rather than assuming a specific AWS storage product.
- AWS does not specify gateway vendors/models, stream configuration, payload schema beyond TR-181 normalization, retention, authorization policy, or how the data lake is structured.
- The source does not identify external systems or specify which AWS notification service reaches which audience. The recipient-facing notification slot is a modeling abstraction, not a separately documented application.
- The custom authorizer is optional and applies to HTTPS ingestion; it is described as an AWS IoT Core capability, not modeled as an additional service.
- The reference describes the architecture and flow, not deployable AWS infrastructure or account/network topology.

## What teams usually customize

- Map the ACS, gateway fleet, external systems, and notification slot to the project's existing systems, or omit slots that do not apply.
- Choose where the ACS runs and which CPE transport is enabled.
- Select the actual data lake storage service and configure Firehose and DMS destinations.
- Define the TR-181 normalization, streaming rules, access controls, retention, alert criteria, and mapping between notification channels and recipients.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tr-069-and-aws/tr-069-and-aws.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tr-069-and-aws/images/tr-069-and-aws.png)
- [AWS architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/tr-069-and-aws/tr-069-and-aws.pdf)
- [AWS reference architecture diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
