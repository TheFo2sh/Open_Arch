# Automated Archival for Amazon Redshift

An M1Spec architecture template based on AWS's [Automated Archival for Amazon Redshift](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/automated-archival-redshift/automated-archival-redshift.html) reference architecture ([AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)).

## What it is for

Periodically offloads selected Redshift table data to Amazon S3, moves cold objects to the S3 Glacier storage class, and prepares inventory manifests for restore workflows. The cold data remains queryable with Amazon Redshift Spectrum and can be joined with datasets in the Redshift cluster.

## How it works

1. Data is ingested into Amazon Redshift at varying frequencies.
2. After each ingestion load, table and period metadata is queued in an Amazon RDS table. Data engineers may also create queue entries manually. The diagram lists the metadata fields as table name, cluster, region, processed date, period start, period end, archived status, and archival date.
3. Amazon EventBridge schedules an AWS Lambda function daily, weekly, or monthly. The function reads the RDS queue and creates an Amazon SQS message for each period due for archival.
4. A proxy Lambda dequeues each SQS message and invokes AWS Step Functions for that message.
5. Step Functions unloads the selected Redshift table-period data to a partitioned Amazon S3 bucket and updates the RDS archival status. The diagram also shows a data-deletion action against Redshift; AWS does not specify its exact ordering or safety conditions.
6. After 90 days, the S3 Lifecycle configuration transitions the cold data from S3 Standard to the S3 Glacier storage class.
7. Amazon S3 Inventory generates daily manifests for the cold-data bucket and stores them in a manifest bucket.
8. An S3 event notification invokes a Lambda function when an inventory manifest is created.
9. The Lambda function normalizes the manifest and writes it to an S3 bucket for normalized manifests, supporting restore consumption.
10. Amazon Redshift Spectrum queries the cold S3 data alongside existing datasets in the Redshift cluster.

## Assumptions and unspecified details

- The **Data ingestion workflow** is a project-system slot for the process that loads Redshift and records metadata. AWS does not name its software, source systems, or exact ingestion schedule.
- AWS identifies Amazon RDS but does not specify its database engine, schema beyond the diagram's metadata fields, or deployment configuration.
- The Lambda code, Step Functions state-machine internals, retries, failure handling, access controls, and the exact eligibility or ordering conditions for deleting Redshift data are not supplied. The deletion action is included because it is shown in the source diagram.
- The S3 Glacier database is a logical view of the same cold-data objects after lifecycle transition, not an additional bucket.
- The source does not identify a third-party service or a specific restore implementation. No external provider or restore workflow is assumed.
- The source names S3 Inventory and S3 event notifications as features of Amazon S3; they are represented as behaviors of the S3 platform rather than additional providers.

## What teams usually customize

- Map the ingestion workflow slot to the project's system and define how it populates the metadata queue, including the table schema and manual operations.
- Set archival schedules, period selection, retention, safe deletion criteria, and restore procedures.
- Choose S3 bucket names, prefixes and partitioning, inventory destinations, lifecycle rules, and security settings.
- Define the Redshift UNLOAD and Spectrum query details, including any required table or catalog configuration, which AWS does not prescribe in this diagram.
