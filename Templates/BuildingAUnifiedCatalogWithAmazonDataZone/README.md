# Building a Unified Catalog with Amazon DataZone

An AWS reference architecture for bringing data assets from multiple sources together in a unified catalog for discovery, sharing, and governance.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/unified-catalog-datazone/unified-catalog-datazone.html)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [Diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/unified-catalog-datazone/unified-catalog-datazone.pdf)

## What it is for

Use Amazon DataZone as a central catalog for data stored across AWS data lakes, data warehouses, and purpose-built databases. DataZone supports self-service discovery, cataloging, sharing, and governance. Data projects, domain units, business glossaries, metadata forms, and custom asset types organize and enrich the catalog.

## How it works

1. Data can come from SQL/NoSQL and on-premises databases, streaming sources, media, flat files, logs, and SaaS applications. AWS lists Amazon AppFlow, AWS Glue, Amazon Kinesis, Amazon MSK, and AWS Database Migration Service as ingestion choices.
2. Depending on the use case, data is stored in Amazon S3, Amazon Redshift, Amazon Aurora, Amazon DynamoDB, or third-party databases and data warehouses. S3 data lakes can hold structured, semi-structured, and unstructured data.
3. AWS Glue Crawlers discover structured and semi-structured S3 data and write metadata to the AWS Glue Data Catalog. AWS Glue Data Quality can check catalog tables; JDBC sources can also be crawled and cataloged.
4. The AWS Glue Data Catalog data source onboards existing lake and database assets to the Amazon DataZone domain. DataZone can also import technical table and view metadata from Redshift. Unstructured S3 assets can be cataloged as custom asset types.
5. DataZone's inventory can be enriched with business context, lineage, and data quality information to improve discoverability. Its projects provide spaces for members to onboard assets; its portal supports self-service discovery and sharing.

## Assumptions and scope

- The diagram presents alternative ingestion and storage choices; it does not prescribe that every service be used together. The blueprint shows representative paths, not a deployable topology.
- AWS does not name third-party database, warehouse, or SaaS providers, nor specify their connectors or configurations. They are left as a source-system slot rather than modeled as invented products.
- The source does not specify networking, account boundaries, access policies, encryption settings, availability targets, or detailed ingestion schedules. Those are intentionally not inferred here.
- The template describes architecture only; it does not deploy AWS resources. User and system elements are project slots to map or omit when applying the template.

## What teams usually customize

- Select the data sources, ingestion services, and AWS or third-party storage targets that fit the use case; remove unused alternatives.
- Map the source-system, data-producer, data-consumer, and catalog-workflow slots to the project's actual systems and user roles.
- Define the DataZone domain, projects, domain units, permissions, metadata forms, business glossaries, asset types, and data-quality rules.
- Add the actual third-party providers, connectors, networking, security controls, regions, and operational details once they are known.
