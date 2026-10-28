# Guidance for Driver-based Demand Planning with o9

This template captures the AWS reference architecture for exchanging data between AWS customer accounts and the o9 SaaS demand-planning solution. It is an architecture blueprint for M1Spec, not an AWS deployment package.

## Source

- [AWS Guidance for Driver-based Demand Planning with o9](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/driver-based-demand-planning-o9/driver-based-demand-planning-o9.html)
- [Linked architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/driver-based-demand-planning-o9/driver-based-demand-planning-o9.pdf#driver-based-demand-planning-o9)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Use case and data flow

The design offers source-dependent paths for bringing planning data into AWS: AWS Database Migration Service for SQL and NoSQL systems, Amazon AppFlow for ERP, CRM, and SaaS applications, AWS DataSync for file shares, and Amazon Kinesis, Amazon MSK, or AWS IoT Core for streaming sources. AWS Data Exchange can provide third-party data. The AWS account stores ingested data in Amazon S3.

The o9 SaaS solution can receive data through its native APIs and SFTP. Streaming data can be sent to o9 through o9 REST APIs, or stored in Amazon S3 through Kinesis Data Streams using the AWS SDK or AWS Lambda. AWS Glue can batch-ingest Amazon S3 data into o9 through the AWS SDK or AWS Lambda. o9 data and AWS account data can be shared through o9 APIs and optionally Lambda; outbound o9 data can be collected in Amazon S3 through S3 APIs or Lambda.

Amazon Forecast and Amazon SageMaker AI can build, train, and deploy models that complement o9. Amazon EMR and Amazon Redshift support big-data processing and warehousing. The data-lake view combines Amazon S3, AWS Glue, IAM, and AWS Lake Formation; the diagram also shows the AWS Glue Data Catalog, crawler, permissions, and archive.

## Architecture and assumptions

The blueprint keeps the o9 SaaS solution and customer source systems outside the AWS customer-account zone. Source categories and o9 are system slots that consumers map to their own systems. The two S3 databases are logical stores for the diagram's ingested and curated/analytics data, not prescribed bucket names or schemas. AWS Data Exchange providers are represented by a slot; TransUnion, IMDb, and Reuters are examples in the source.

AWS does not prescribe a specific source system, data format, API contract, SFTP endpoint, AWS Region, network path, authentication design, refresh schedule, retention policy, or detailed S3/Lake Formation configuration in this guidance. These are intentionally left unspecified. Relationships summarize the documented options and do not imply that every source or optional integration is deployed together. The source does not identify human user roles, so no user slot is added.

## What consumers usually customize

- Map the source-system and o9 slots to the systems in the project, and omit source categories that do not apply.
- Select the actual ingestion and streaming services for the available source types and required data flows.
- Define the AWS account boundaries, S3 organization and data lifecycle, IAM/Lake Formation permissions, and the details of o9 API or SFTP connectivity.
- Add project-specific data transformations, interfaces, security controls, regions, and operational requirements once those decisions are known.
