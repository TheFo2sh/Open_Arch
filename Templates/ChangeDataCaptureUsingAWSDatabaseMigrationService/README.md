# Change Data Capture Using AWS Database Migration Service

An AWS architecture for one-time database migration, ongoing change data capture and replication, and streaming analytics. It follows AWS's [Change Data Capture Using AWS Database Migration Service](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms.html) reference, including its [Migrate and Replicate](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms-migrate.html) and [Streaming](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms-streaming.html) diagrams. AWS publishes both diagrams in the [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms.pdf).

## What it is for

Use AWS Database Migration Service (AWS DMS) to migrate data and continuously replicate source changes to a database target, or to send change records to streaming services for further processing and analytics.

## How it works

1. A source database can be Oracle, SQL Server, MySQL, PostgreSQL, MongoDB, Amazon Aurora, Amazon DocumentDB or Amazon RDS. The migration diagram also lists Oracle, SQL Server, MySQL, PostgreSQL, MongoDB, Amazon Aurora, Amazon DocumentDB, Amazon RDS and Amazon S3 as targets.
2. AWS Schema Conversion Tool can convert a source schema and most code objects for a heterogeneous migration. AWS DMS captures changes and applies them to a target in a transactionally consistent way.
3. For streaming, AWS DMS sends changes to Amazon Kinesis Data Streams or Amazon MSK. AWS Glue Spark streaming, Amazon EMR and Kinesis Data Analytics for Apache Flink are shown as processing options.
4. The diagram shows processed records going to Amazon DynamoDB, Amazon RDS, Amazon Elasticsearch Service, Amazon S3 and Amazon Redshift; Kinesis Data Firehose delivers streaming data to targets.
5. Amazon SageMaker Notebooks, Amazon QuickSight, Amazon Athena and Amazon Redshift Spectrum are shown as analytics and consumption options.

## What applying it brings

| | |
|---|---|
| Zones | **AWS** and an **External database endpoints** zone |
| AWS service elements | AWS DMS, Aurora, DocumentDB, RDS, Kinesis Data Streams, MSK, Glue, EMR, Kinesis Data Analytics, Kinesis Data Firehose, DynamoDB, Elasticsearch Service, S3, Redshift, SageMaker Notebook, QuickSight, Athena and Redshift Spectrum |
| Endpoints | Database options listed by AWS; the source and target database products are represented as alternatives, not a claim that all are deployed together |
| Workloads | Project-owned slots for Glue Spark, EMR and Flink processing workloads |
| Tool and libraries | AWS Schema Conversion Tool in a project-owned system slot; Apache Spark and Apache Flink for the processing workloads |

## Assumptions and limits

- AWS lists source and target databases as options. The blueprint shows these endpoint choices together to make the alternatives visible; remove or adapt the endpoints that do not apply. It does not assert a particular source-to-target pairing.
- The external endpoint zone groups non-AWS database products from the diagram. Their hosting, location and connectivity are not specified by AWS; `other` is used rather than assuming a data center topology.
- AWS's diagram describes AWS SCT as a schema-conversion tool but does not specify its host or deployment. It is represented as a tool in a project-owned system slot, not as an AWS-hosted runtime.
- The source calls out Amazon Elasticsearch Service, Amazon Kinesis Data Firehose and Amazon SageMaker Notebook. Those names are retained from the diagram; AWS product naming may have changed.
- AWS does not specify networking, endpoint credentials, DMS replication instance sizing, task/table-selection settings, conversion exceptions, event formats, delivery guarantees beyond the stated transactional consistency for database targets, retention, access policies, encryption, or scaling configuration. This template does not invent them.
- Amazon S3 is object storage, not a relational database. It appears as a `database` only because the custom architecture schema has no separate persisted-object-store element.
- This is an architecture template, not deployable AWS infrastructure. It contains no VPC, subnet, IAM, security group, replication task or service configuration.

## What teams usually customize

- Choose the actual source and target database products, and remove endpoint alternatives that are not in scope.
- Select Kinesis Data Streams, MSK, both or neither, then retain only the processing and delivery services needed by the workload.
- Define transformations, schema conversion, endpoint connectivity, identity and access, encryption, storage formats, retention, scaling and operational controls in the target project's design.
- Decide which analytics consumers and data targets are needed; the AWS diagram presents them as choices, not as mandatory services.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms.html)
- [Migrate and Replicate page and diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms-migrate.html)
- [Streaming page and diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms-streaming.html)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/change-data-capture-dms/change-data-capture-dms.pdf)
