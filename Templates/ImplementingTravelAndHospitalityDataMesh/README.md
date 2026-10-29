# Implementing Travel and Hospitality Data Mesh

This template follows AWS's [Implementing Travel and Hospitality Data Mesh reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/travel-hospitality-data-mesh/travel-hospitality-data-mesh.html), its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/travel-hospitality-data-mesh/images/travel-hospitality-data-mesh.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/travel-hospitality-data-mesh/travel-hospitality-data-mesh.pdf#travel-hospitality-data-mesh), listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

A travel and hospitality organization where business domains own producer data, publish governed data products, and enable consumer domains to combine data for analytics, reporting, and recommendations. The architecture separates operational producer workloads from analytical consumer workloads while sharing catalog metadata and governance.

## Architecture and data flow

1. **Stage producer data.** Business domains own their data and follow organization-wide governance, security, and open-standard blueprints. Batch, real-time, SFTP, and IoT data is staged in Amazon S3. Raw and curated lake datasets use read-oriented schemas; the source does not identify the upstream systems, formats, or transformation implementation.
2. **Catalog datasets.** AWS Glue crawlers discover S3 datasets and populate the central AWS Glue Data Catalog. Consumers can search and filter the catalog by content, sensitivity, and custom labels.
3. **Support operational workloads.** Producer operational data and serverless microservices/events use Amazon DynamoDB with DAX. Data contracts are also stored in DynamoDB. The source does not identify the serverless compute or event products.
4. **Govern and trace data.** AWS Lake Formation provides fine-grained access governance and auditing. AWS Glue provides catalog metadata, Amazon Neptune stores lineage, and DynamoDB stores contracts.
5. **Serve consumer analytics.** Consumer domains combine producer datasets into Amazon Redshift marts. Amazon Athena supports SQL and ad-hoc queries over S3 report datasets, and Amazon QuickSight provides analytics.
6. **Build models and recommendations.** Amazon SageMaker is used to build models, and Amazon Personalize provides recommendations.

The source describes a multi-account strategy to isolate resources and security, but does not prescribe account boundaries or where individual services are deployed. The blueprint therefore shows one logical AWS zone rather than inventing an account topology.

## What applying it brings

| | |
|---|---|
| Zone | AWS |
| Users | **Data producer** and **Data consumer**, slots mapped to the project's users |
| Systems | **Producer domain** and **Consumer domain**, slots mapped to the project's systems |
| AWS services | S3, Glue and Glue Data Catalog, DynamoDB and DAX, Lake Formation, Neptune, Redshift, Athena, QuickSight, SageMaker AI, and Personalize |
| Data stores | Raw, curated, and report S3 datasets; central Glue catalog; producer operational data and contracts in DynamoDB; Neptune lineage; Redshift consumer marts |

Database elements represent data stores on platforms that host them; S3 datasets represent object storage, not relational databases. This is an architecture template, not deployable AWS infrastructure.

## Assumptions and details AWS does not specify

- The source notes do not identify a required third-party provider or service. SFTP and IoT are represented as generic data paths, not as specific integrations.
- “Serverless microservices/events” is retained as a generic producer workload. No Lambda, event bus, orchestration, or other implementation service is inferred.
- The source does not specify account topology, network design, source systems, transfer mechanisms beyond the named data paths, data formats, schema definitions, transformation jobs, or exact service configurations.
- It does not define the precise process that creates curated datasets, how data contracts are enforced, how lineage is collected, or which consumer workloads use each producer dataset.
- Catalog metadata, lineage, contracts, governance, and operational/analytical data stores are modeled separately to reflect their distinct roles; their deployment boundaries remain unspecified.

## What teams usually customize

- Map producer and consumer domain slots to the project's actual business domains and systems.
- Replace generic ingestion paths with actual sources, transfer mechanisms, schedules, formats, and data products.
- Define S3 raw/curated/report boundaries, read-oriented schemas, catalog labels, contracts, lineage capture, and Lake Formation permissions.
- Choose how operational microservices, events, Redshift marts, Athena queries, QuickSight dashboards, models, and recommendations are implemented and connected.
- Define the AWS account structure, network boundaries, service configuration, monitoring, and security controls. These are implementation decisions, not deployment instructions included in this template.
