# o9 Demand Planning for CPG

This template models AWS's [o9 Demand Planning for CPG reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/o9-demand-planning-cpg/o9-demand-planning-cpg.html). It is an M1Spec architecture blueprint, not a deployment package.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/o9-demand-planning-cpg/o9-demand-planning-cpg.html)
- [Linked architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/o9-demand-planning-cpg/images/o9-demand-planning-cpg.png)
- [Linked architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/o9-demand-planning-cpg/o9-demand-planning-cpg.pdf#o9-demand-planning-cpg)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Use case and data flow

The architecture supports CPG demand planning by exchanging sales, catalog, enterprise, and operational data with the o9 SaaS solution. The AWS page specifically identifies Amazon.com Selling Partner API data for vendor sales orders and product catalogs.

1. SQL/NoSQL, ERP/CRM, SaaS, file shares, and streaming sources feed demand planning. Amazon.com Selling Partner API provides vendor sales orders and product catalogs.
2. Data can enter o9 through native APIs and SFTP, or enter AWS. The diagram shows Database Migration Service for SQL/NoSQL, AppFlow for ERP/CRM/SaaS, DataSync for file shares, and Kinesis, MSK, or IoT Core for streams.
3. Amazon S3 stores the data ingested into AWS.
4. Streaming data can go to o9 through native REST APIs, or to S3 through Kinesis Data Streams using an AWS SDK or Lambda.
5. Third-party data, such as TransUnion or Reuters datasets, can be imported through AWS Data Exchange.
6. AWS Glue can batch-ingest data from S3 into o9 through an AWS SDK or Lambda.
7. Native o9 APIs and optional Lambda share data between the o9 SaaS solution and the AWS account.
8. Outbound o9 data is collected in S3 for analytics and AI/ML workloads.
9. Amazon Forecast and Amazon SageMaker AI build, train, and deploy models that complement o9's ML capabilities.
10. Amazon EMR and Amazon Redshift provide big data processing and warehousing.
11. AWS Lake Formation governs an AWS data lake with Amazon S3, AWS Glue Data Catalog, and IAM permissions. The diagram also depicts a crawler.

## Architecture and assumptions

The o9 SaaS solution, source categories, Selling Partner API, and third-party data providers are system slots for consumers to map to their own systems. The two S3 databases are logical groupings for ingested and outbound/analytics data; AWS does not prescribe bucket names or schemas. The CPG-specific Selling Partner API source is called out separately from the similar [Guidance for Driver-based Demand Planning with o9](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/driver-based-demand-planning-o9/driver-based-demand-planning-o9.html) template.

The diagram presents alternative source-dependent ingestion paths, not a requirement to deploy every option together. AWS does not specify the Selling Partner API integration method, API contracts, SFTP endpoints, data formats, regions, network paths, authentication, refresh schedules, retention policies, or detailed S3/Lake Formation configuration. The architecture leaves those choices open. It does not identify a human user role.

## What consumers usually customize

- Map source categories, o9 SaaS, and provider slots to the project's actual systems; omit sources that do not apply.
- Choose ingestion and streaming options for available sources, including whether data goes directly to o9 or through AWS.
- Define API/SFTP connectivity, AWS account boundaries, S3 organization and lifecycle, and Lake Formation/IAM permissions.
- Add project-specific data formats, transformations, security, and operational details once they are known.
