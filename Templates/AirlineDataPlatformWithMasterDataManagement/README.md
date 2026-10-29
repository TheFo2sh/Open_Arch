# Airline Data Platform with Master Data Management

An AWS airline data platform augmented with customer master data management (MDM), based on AWS's [Airline Data Platform with Master Data Management reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airlines-data-platform-mdm/airlines-data-platform-mdm.html) and its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/airlines-data-platform-mdm/airlines-data-platform-mdm.pdf). The MDM design builds on AWS's [Airlines Data Platform](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airlines-data-platform/airlines-data-platform.html).

## What it is for

Airlines with fragmented passenger, loyalty, baggage, and operational records can use this pattern to identify unique travelers, deduplicate loyalty membership records, and provide a customer-centric view for service, analytics, and personalization. It is an architecture template, not deployable infrastructure.

## How it works

1. Airline systems of record publish real-time operational and customer events through **Amazon Kinesis**. Batch files enter through **AWS Transfer Family**; external data can arrive through **AWS Data Exchange** and **Amazon AppFlow**.
2. **Amazon S3** holds real-time and batch staging data, converted Parquet data, and reportable datasets. **Amazon EMR** and **AWS Glue** transform and catalog the lake data.
3. An MDM tool uses **AWS Glue ML transforms** to identify duplicate loyalty members and travelers, including customers without loyalty signups. Matched customer data enriches the **Amazon DynamoDB** Customer 360 store. DynamoDB change events feed **AWS Step Functions** customer event processing.
4. Customer-facing applications reach customer-centric microservices through **Amazon API Gateway** and **AWS Step Functions**. Step Functions also coordinates event processing with **AWS Lambda** and **AWS Fargate**, publishing customer events to downstream subscribers, including **WorldTracer NetTracer**.
5. Data teams add customer-centric schemas and marts in **Amazon Redshift**. **Amazon Athena** queries the lake, **Amazon SageMaker AI** supports customer segmentation and lifetime-value analysis, and **Amazon QuickSight** provides customer analytics.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Kinesis, S3, Transfer Family, Data Exchange, AppFlow, EMR, Glue, DynamoDB, Step Functions, Lambda, Fargate, API Gateway, Redshift, SageMaker AI, Athena, and QuickSight |
| Slots | Airline systems of record, external data sources, a third-party MDM service, airline API clients, analytics consumers, customer event subscribers, WorldTracer NetTracer, and a dashboard user |
| Databases | Airline data lake and Glue Data Catalog on AWS Glue/S3; Customer 360 profiles on DynamoDB; customer data marts on Redshift |
| Compute-hosted systems | Data transformation jobs on EMR; customer event functions on Lambda; customer event tasks on Fargate; customer analysis models on SageMaker AI |

## Assumptions and unspecified details

- AWS describes using an MDM tool but does not name its product, vendor, hosting model, licensing, or interfaces. The blueprint therefore uses a vendor-neutral MDM system slot; it does not prescribe or deploy an MDM product.
- AWS names WorldTracer NetTracer as a baggage reconciliation event consumer but does not specify its provider, API, event contract, or connectivity. These details remain for the adopter to confirm.
- The reference does not prescribe record-matching rules, golden-record survivorship, data schemas, event formats, retention, identity resolution policy, security controls, network topology, regions, or sizing. None are inferred here.
- The AWS diagram and prose identify the service roles and principal data flows, not a complete implementation or resource configuration. The model omits account structure, VPCs, IAM, encryption, monitoring, and service-specific deployment settings.

## What teams usually customize

- Select and integrate an MDM provider, then define match/merge rules, source priorities, golden-record ownership, and customer consent handling.
- Map the source-system and consumer slots to the airline's actual applications; decide which external datasets and ingestion paths are needed.
- Specify data schemas, event contracts, batch schedules, transformations, data quality controls, and downstream customer-event subscribers.
- Tailor the lake, Customer 360 store, warehouse, analytics, security, governance, and operational design to workload, regulatory, and regional requirements.
