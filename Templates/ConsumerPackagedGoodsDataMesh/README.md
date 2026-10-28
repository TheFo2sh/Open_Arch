# Consumer Packaged Goods Data Mesh

This template follows AWS's [Consumer Packaged Goods Data Mesh reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cpg-data-mesh/cpg-data-mesh.html) and its [linked diagram PNG](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cpg-data-mesh/images/cpg-data-mesh.png), listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The page says the diagram was first published on May 11, 2021 and links an image, not a PDF.

## What it is for

A consumer packaged goods organization where business domains own and publish data while consumers discover and analyze governed data. AWS Lake Formation provides centralized governance, and AWS Glue provides data cataloging.

## Architecture and data flow

1. **Bring data in.** The source describes batch processing, real-time streams, and Secure File Transfer Protocol (SFTP). Its diagram illustrates transactions, ERP, web logs and cookies, connected devices, social media, GPS location, and mobile sources. It does not name ingestion products or integrations.
2. **Keep ownership with domains.** Business domains own their data sources. Producers and consumers use organization-level blueprints for security, governance, IAM roles, and standards. AWS CloudFormation appears in the producer and consumer domains.
3. **Manage metadata.** AWS Glue catalogs datasets, Amazon Neptune stores lineage, and Amazon DynamoDB stores data contracts.
4. **Discover data.** Consumers search for data using contract properties.
5. **Govern and prepare.** AWS Lake Formation centrally manages fine-grained permissions and supports automatic schema discovery and conversion to a required format.
6. **Analyze.** The source names Amazon Athena, Amazon OpenSearch Service, and Amazon SageMaker AI for analytics and machine learning. The diagram also shows AWS Glue DataBrew beside “ML Transforms,” but does not explain its role or data flow.

The diagram shows Amazon S3 in producer domains, consumer domains, and the central analytics area. It also labels a generic “AI Services” element in the analytics area. AWS does not identify a provider, product, or integration for that label; it is represented only as a placeholder system, not as a required third-party dependency.

## What applying it brings

| | |
|---|---|
| Zone | AWS |
| Users | **Data producer** and **Data consumer**, slots mapped to the project's users |
| Systems | **Producer domain**, **Consumer domain**, and a generic **AI services** diagram-label placeholder |
| AWS services | CloudFormation, Lake Formation, Glue and Glue Data Catalog, Glue DataBrew, S3, Neptune, DynamoDB, Athena, OpenSearch Service, and SageMaker AI |
| Data stores | Domain and shared S3 data, Glue metadata catalog, Neptune lineage, DynamoDB contracts, and an OpenSearch analytics index |

Database elements represent data stores on platforms that host them; S3's database elements represent object storage, not relational databases. This is an architecture template, not deployable AWS infrastructure.

## Assumptions and details AWS does not specify

- The reference page's history lists the initial May 2021 publication. Service labels are retained as shown; confirm current service availability and names before using this as a current design.
- AWS names no third-party vendor or required external service. Batch, streaming, and SFTP are generic ingestion modes, not specific providers. The diagram's “AI Services” label is too generic to identify an integration.
- The source does not specify account or network boundaries, ingestion endpoints, protocols beyond the listed modes, data formats, schemas, transformation logic, orchestration, or detailed service-to-service paths.
- Producer and consumer domains are shown as examples, not a prescribed number or business structure. Bucket boundaries, data ownership rules, data contracts, permissions, and consumers' use of each analytics service are left to the implementing organization.
- The source mentions IAM roles as part of organization-level blueprints but does not depict a separate IAM service. It shows AWS Glue DataBrew beside ML transforms without explaining the specific transformations.

## What teams usually customize

- Map producer and consumer domain system and user slots to the project's actual domains, systems, and roles.
- Replace the illustrative source list with actual upstream systems and select the ingestion services, SFTP endpoints, schedules, and formats.
- Define producer data products, S3 boundaries, catalog metadata, lineage, contracts, governance policies, and how consumers request or receive access.
- Specify transformation logic and which datasets each analytics or machine-learning workload consumes.
- Identify any concrete AI service provider needed by the project; the source does not choose one. Confirm the current availability and intended role of diagram-only services before adoption.
- Add the implementation's account, network, identity, security, and operational details; they are outside the source blueprint.
