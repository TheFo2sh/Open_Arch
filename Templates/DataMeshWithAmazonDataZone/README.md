# Data Mesh Reference Architecture with Amazon DataZone

An AWS data mesh for producers to publish governed data products and consumers to discover and use approved data for analytics and AI/ML. This template follows AWS's [Data Mesh Reference Architecture with Amazon DataZone](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-mesh-datazone/data-mesh-datazone.html), its [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/data-mesh-datazone/data-mesh-datazone.pdf#data-mesh-datazone), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Organizations that want data producers to own and publish data products while consumers discover them through a shared catalog, request subscriptions, and use approved assets in their own accounts.

## How it works

1. Enterprise sources—including databases, file shares, edge devices, logs, social networks, SaaS applications, and streaming media—supply raw data through Amazon AppFlow, AWS Database Migration Service, Amazon Kinesis, AWS IoT Core, or Amazon Managed Streaming for Apache Kafka.
2. In producer accounts, AWS Glue transforms the raw data. AWS Glue Data Catalog stores technical metadata, and AWS Glue Data Quality measures data quality. Producer data can be stored in Amazon S3, Amazon Redshift, Amazon RDS, or third-party sources.
3. DataZone data source jobs register producer assets in the central Amazon DataZone catalog. The central governance account hosts the DataZone domain and portal, associates producer and consumer accounts, and organizes projects under domain units.
4. Users access the portal with IAM credentials or single sign-on through AWS IAM Identity Center. They search and review assets, including business, technical, and data-quality metadata. Consumers request subscriptions; asset owners approve or reject them.
5. After a subscription is granted and fulfilled, consumers use the asset in their own accounts for AI/ML development with Amazon SageMaker AI, or analytics and reporting with Amazon Athena, Amazon Redshift, and Amazon QuickSight.

The DataZone catalog contains asset metadata; the data remains in its producer or consumer data stores. A subscription governs access to an asset and does not imply that DataZone copies the underlying data.

## What applying it brings

| | |
|---|---|
| Zones | Central governance AWS account, producer AWS account(s), and consumer AWS account(s) |
| Central governance | Amazon DataZone domain, data portal, asset catalog, IAM, and IAM Identity Center |
| Producer services | AppFlow, Database Migration Service, Kinesis, IoT Core, MSK, Glue, Glue Data Catalog, Glue Data Quality, S3, Redshift, and RDS |
| Consumer services | SageMaker AI, Athena, Redshift, and QuickSight |
| Slots | Data producers, data consumers, enterprise and third-party source systems, producer data preparation, consumer analytics/reporting, and AI/ML model development |
| Data stores | Producer technical metadata catalog, S3 assets, Redshift assets, and RDS assets |

## Assumptions and boundaries

- The account zones show the central, producer, and consumer roles in the source; they do not prescribe an account count, account association setup, or deployment topology.
- AWS lists third-party sources but does not name a provider or integration. The source-system slot is intentionally generic; no vendor or connection mechanism is assumed.
- The reference does not specify network design, service configuration, transformation logic, data-quality rules, approval policy, exact dataset-to-consumer-service mappings, or the details of how a granted subscription is fulfilled. Those are left to the implementing team.
- This is an architecture template, not deployable AWS infrastructure. It does not create accounts, data stores, IAM policies, or DataZone resources.

## What teams usually customize

- **Account and domain structure.** Map producer/consumer account roles and DataZone domain units and projects to the organization's governance boundaries.
- **Sources and ingestion.** Replace the generic source slot with actual systems, then select and configure the applicable ingestion services and schedules.
- **Data products.** Choose the actual producer stores, transformations, metadata, quality rules, and subscription approval process.
- **Consumer workloads.** Keep or replace the listed analytics and AI/ML services, and document which approved assets each workload uses.
- **Identity and access.** Configure IAM or SSO, portal access, producer/consumer account associations, and subscription fulfillment for the organization's policies.
