# Lodging Data Platform

An AWS data platform for lodging operations and analytics, based on AWS's [Lodging Data Platform reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/lodging-data-platform/lodging-data-platform.html) (published October 7, 2022). See the [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/lodging-data-platform/images/lodging-data-platform.png), the [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/lodging-data-platform/lodging-data-platform.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The architecture supports both operational and analytical needs for lodging companies. It separates storage from compute, uses purpose-built operational data stores and event-driven services, and makes data available to operational applications, analysts, and machine-learning workloads.

## How it works

1. Lodging systems of record—such as property management, reservations, point-of-sale, loyalty, booking, and survey systems—supply operational events and batch data. External demographic and address data is also ingested. The source does not identify the providers or the integration protocols.
2. Amazon Kinesis Data Streams ingests events. AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow are shown as batch-ingestion paths into Amazon S3 staging. AWS Lambda and AWS Step Functions support operational microservices and customer event processing; API clients enter through Amazon API Gateway, and customer events are published to property systems and other subscribers.
3. Amazon DynamoDB provides the operational data store. Amazon S3 separates data storage from compute and holds raw/staged, curated, and reportable datasets. The diagram shows real-time and batch staging, Parquet data, and reporting data for customer segmentation, lifetime value, revenue, service index, and shopping insights.
4. AWS Glue and Amazon EMR process data lake datasets. The AWS Glue Data Catalog supports discovery; Amazon Athena analyzes the lake for one-time requirements. Amazon Redshift holds enterprise warehouse schemas and data marts for known usage patterns.
5. Amazon SageMaker AI supports standard and custom models, including customer segmentation and lifetime value. Amazon QuickSight provides customer analytics to dashboard users.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, DynamoDB, Kinesis Data Streams, Transfer Family, Data Exchange, AppFlow, API Gateway, Lambda, Step Functions, Fargate, Glue, EMR, Glue Data Catalog, Redshift, Athena, SageMaker AI, and QuickSight |
| Slots | Lodging systems of record, external data, API client applications, property-system event subscribers, lodging analytics experience, and dashboard users |
| Databases | Lodging operational data on DynamoDB; lodging data warehouse and marts on Redshift |

The external systems and users are slots to map to the adopting project's own domain. The diagram lists examples of systems of record and API clients but does not name their products. The analytics experience slot represents the project's dashboard system; AWS's diagram identifies dashboard users and QuickSight customer analytics, not a specific dashboard application.

## Assumptions and boundaries

- The blueprint models the AWS services and data flows depicted in the reference; it is not deployment code or a complete infrastructure design.
- The source calls out properties, reservations, stays, and loyalty as key data domains, but does not define database tables, warehouse schemas, API contracts, event formats, security controls, network topology, or service configuration.
- External demographics and address data, lodging systems, and event subscribers are integration categories, not named vendors or products. Select the actual systems, protocols, and transfer mechanisms for the project.
- The source describes operational data as shared with the data lake and shows the operational store, streaming, and S3 ingestion flows. Exact replication and synchronization mechanics are unspecified.
- AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow are retained as the diagram's ingestion options; which options are used depends on the project's data providers.

## What teams usually change

- Map the lodging-system and user slots to the project's actual systems and roles; remove integrations that do not apply.
- Choose ingestion mechanisms and define event, file, and data-sharing contracts for the actual providers and subscribers.
- Define the DynamoDB data model, S3 lake zones and formats, Glue catalog, Redshift schemas, and retention/governance requirements.
- Select the required transformation, analytics, and machine-learning workloads, including which data is exposed to dashboards.
- Add the security, networking, availability, and operational details needed for a deployable design.
