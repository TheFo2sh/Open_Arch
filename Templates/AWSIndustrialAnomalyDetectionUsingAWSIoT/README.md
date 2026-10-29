# AWS Industrial Anomaly Detection Using AWS IoT

An M1Spec architecture template based on AWS's [AWS Industrial Anomaly Detection Using AWS IoT](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-anomaly-detection-iot/industrial-anomaly-detection-iot.html), published October 12, 2021. Sources: [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-anomaly-detection-iot/images/iot-industrial-anomaly-detection-ra.png), [AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-anomaly-detection-iot/industrial-anomaly-detection-iot.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Detect industrial equipment performance anomalies through hot edge, warm streaming, and cold batch analysis, and give operational technology (OT) teams alerts and fleet-performance views.

## How it works

1. **Hot path at the edge.** AWS IoT Greengrass connects industrial assets and runs stream analytics and ML inference. The diagram calls out northbound and southbound connectors but does not identify their products or protocols.
2. **Edge-to-cloud ingestion.** AWS IoT Core and AWS IoT SiteWise ingest telemetry from the edge.
3. **Warm-path analysis.** Amazon Kinesis Data Firehose forwards streaming telemetry through Amazon Managed Service for Apache Flink (called Amazon Kinesis Data Analytics in the diagram), which runs anomaly-detection queries. Firehose forwards warm-path output to the data lake.
4. **Data lake.** Amazon S3 stores raw and processed telemetry, trained models, and inference results.
5. **Cold-path ML.** AWS documents Amazon SageMaker AI or Amazon Lookout for Equipment as alternatives for model training and batch inference; the data lake stores model and inference artifacts.
6. **Result processing.** AWS Lambda functions analyze batch inference results.
7. **Alerts.** Amazon SNS delivers alerts to OT teams through email, text, or ticketing integrations.
8. **Operational dashboards.** AWS IoT SiteWise Monitor provides no-code dashboards for real-time and historical performance.
9. **Fleet analysis.** Amazon QuickSight evaluates anomaly history and fleet performance.

## What applying it brings

| | |
|---|---|
| Zones | **OT network** (other) and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, IoT Core, IoT SiteWise, Kinesis Data Firehose, Managed Service for Apache Flink, S3, SageMaker AI, Lookout for Equipment, Lambda, DynamoDB, Athena, SNS, SiteWise Monitor, QuickSight |
| Slots | **Industrial assets and OT data sources**, **Edge anomaly detection**, **Batch inference result analysis**, **OT anomaly alert delivery**, **Equipment performance dashboards**, and **Anomaly and fleet performance analysis** systems; **OT team** user |
| Databases | **Industrial telemetry data lake** on S3; **Cold-path DynamoDB store** on DynamoDB |

No specific third-party service is named. AWS lists ticketing integrations as one possible SNS alert channel, but does not identify a vendor or product; email, text, or ticketing delivery is left for the consuming team to choose.

## Assumptions and unspecified details

The template follows AWS's nine steps and diagram, not a deployment design. AWS does not specify the industrial protocols, connector implementations, edge hardware, telemetry schemas, detection models or thresholds, warm-query details, S3 layout or retention, or which cold-path ML alternative to select. The diagram depicts DynamoDB and Athena in its cold-analysis area, but the accompanying text does not define DynamoDB's table contents or either service's exact data flow; the blueprint does not invent a DynamoDB relationship or table schema. The Athena relationship to the S3 lake represents historical-data analysis, without prescribing query structure.

AWS also does not specify service configuration, network topology, security policies, AWS Region, alert subscriptions, dashboard layouts, or ticketing integration. This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the OT assets, edge analytics, batch-result processing, alert delivery, and dashboard slots to their own systems; select the SageMaker AI or Lookout for Equipment path that fits their use case.
- Identify their edge hardware, industrial protocols, connector implementations, data contracts, model lifecycle, and hot/warm/cold detection logic.
- Define the data-lake organization and retention, DynamoDB's role if used, Athena queries, SNS subscriptions, dashboards, and security/network controls.
- Select and configure any external notification or ticketing integration; none is specified by the reference architecture.
