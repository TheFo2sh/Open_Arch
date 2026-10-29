# Managing Inserts and Upserts in a Serverless Data Lake

This template follows AWS's [Managing Inserts and Upserts in a Serverless Data Lake](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-data-lake-inserts-upserts/serverless-data-lake-inserts-upserts.html) reference architecture, published June 15, 2021. The source page links the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-data-lake-inserts-upserts/images/serverless-data-lake-inserts-upserts.png) and the [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/serverless-data-lake-inserts-upserts/serverless-data-lake-inserts-upserts.pdf).

## What it is for

Use Apache Hudi on Amazon EMR to process inserts and updates to data in Amazon S3. The architecture separates raw staging, processed Parquet, and reportable datasets, and provides on-demand query, warehouse, and data-science consumption.

## How it works

The flow follows the seven steps in AWS's source:

1. Source systems send batch, change data capture (CDC), or streaming data into raw Amazon S3 storage. AWS's diagram shows SFTP and AWS Database Migration Service (DMS) among the ingestion options; it does not identify an SFTP product.
2. An AWS Glue crawler discovers persisted raw data and populates the AWS Glue Data Catalog.
3. Amazon EMR reads raw data with Hive and Spark for cleaning and transformation.
4. Apache Hudi runs on EMR, reads data through Spark APIs, and performs inserts and upserts on required datasets.
5. Cleaned and transformed data is persisted to Amazon S3 processed Parquet and reportable data sets.
6. Amazon Athena queries reportable data on demand, or it is loaded into Amazon Redshift. The diagram also shows Amazon SageMaker consuming reportable data, Amazon QuickSight consuming Redshift data, and SQL Client, Jupyter Notebooks, and Application SDK consumers.
7. Amazon Managed Workflows for Apache Airflow (MWAA) orchestrates data movement, on-demand EMR clusters for batch processing, and data loading.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform or the project's AWS zone |
| Platforms | AWS DMS, Amazon S3, AWS Glue, Amazon EMR, Amazon MWAA, Amazon Athena, Amazon Redshift, Amazon SageMaker, and Amazon QuickSight |
| Slots | **Source systems**, **Data lake processing**, **Data lake workflows**, **Consumer tools and resources**, and **Data consumer** |
| Processing | Hive, Spark, and Apache Hudi jobs on EMR; Apache Airflow workflows on MWAA |
| Data | Batch staging, real-time staging, Parquet datasets, reportable data sets, the Glue Data Catalog, and an enterprise data warehouse |

## Assumptions and limits

- The source lists example systems of record (Flight Ops, PSS, DCS, Loyalty, Baggage Sortation, Booking Engine, and Surveys System) and demographic/address data, but does not identify their products or where they run. They are grouped in a project-owned source-system slot.
- SFTP is shown as a generic ingestion option. Its server, provider, configuration, and relationship to the other ingestion options are not specified; the template does not assume AWS Transfer Family or a particular SFTP implementation.
- AWS describes batch, CDC, and streaming ingestion but does not name a streaming service or detail the transport for each source. AWS DMS is shown as an ingestion option, not as the required path for all data.
- The diagram's batch staging, real-time staging, Parquet, and reportable data sets are represented as databases on Amazon S3 because the custom architecture schema has no separate object-store element. These are logical data layers, not a claim about exact bucket counts or names.
- AWS does not specify the Hudi table type, record keys, partitioning, transformation logic, schema evolution, file sizes, source-to-output mapping, or exact crawler configuration. The template does not invent these details.
- MWAA's schedule, DAG definitions, EMR cluster configuration, and which movement or load operations it coordinates are not detailed. The workflow slot is illustrative of the documented orchestration responsibility.
- The source does not specify a Redshift schema, load method, Amazon SageMaker setup, user identities, client products, network topology, security controls, retention, or service sizing. SQL Client, Jupyter Notebooks, and Application SDK are generic consumer examples, not assumed deployments.
- The AWS reference diagram names the services and data-layer examples but does not make every optional consumer mandatory. Teams should retain only the analytics and consumer services they need.
- This is an architecture template, not deployable AWS infrastructure. It does not configure VPCs, IAM, security groups, buckets, workflows, EMR clusters, or service settings.

## What teams usually customize

- Map the source-system and data-consumer slots to the actual systems and users in the project.
- Select the required ingestion paths and identify their actual source endpoints, transfer mechanism, event format, and CDC/streaming services.
- Define Hudi keys, table types, transformations, data quality, partitioning, file formats, and retention.
- Configure the crawler/catalog, EMR clusters, MWAA schedules and DAGs, Redshift load and schema, and access controls.
- Decide which of Athena, Redshift, SageMaker, QuickSight, SQL clients, notebooks, and application integrations are in scope.
