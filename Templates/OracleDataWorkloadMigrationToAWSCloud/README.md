# Oracle Data Workload Migration to AWS Cloud

An M1Spec template for the [AWS Oracle Data Workload Migration to AWS Cloud reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-data-workload-migration/oracle-data-workload-migration.html). It keeps the operational and historical migration paths distinct and includes Snowflake as a required third-party warehouse.

## What it is for

Use this architecture as a starting point for migrating Oracle data workloads to AWS while preserving an operational data path into Aurora and an analytical/historical path into Snowflake.

## How it works

1. On-premises Oracle and non-Oracle backend systems load transactional data into an Oracle enterprise data warehouse.
2. AWS Schema Conversion Tool extracts Oracle DDL scripts and schema. It publishes DDL scripts to Aurora and sends the schema to Snowflake.
3. AWS Database Migration Service extracts OLTP and OLAP data from Oracle tables, loading OLTP directly into Aurora and storing OLAP extracts as CSV in Amazon S3.
4. On-premises legacy systems also land data in S3. AWS Glue transforms that data and loads it into Aurora.
5. AWS Glue transforms Aurora data back into S3, where it is staged for Snowflake OLAP loading.
6. Cloud ETL platforms extract from warehouse systems that remain unmigrated and load Snowflake.
7. Amazon QuickSight, Tableau, and other cloud BI tools receive analysis data. On-premises Oracle Business Intelligence Suite, Tableau, and other applications can query Snowflake directly for historical reporting and Aurora for operational reporting.

## What applying it brings

| | |
|---|---|
| Zones | AWS, on-premises systems, and third-party cloud services |
| AWS platforms | AWS Schema Conversion Tool, AWS DMS, Amazon Aurora, Amazon S3, AWS Glue, Amazon QuickSight |
| External platforms | Oracle Database and the required Snowflake Data Warehouse |
| Slots | Oracle and non-Oracle backend systems; legacy systems; unmigrated warehouse systems; cloud ETL; Tableau and other cloud BI tools; and on-premises Oracle BI and other applications |
| Databases | Oracle Enterprise Data Warehouse, Aurora operational database, S3 OLAP/legacy/transformed-data buckets, and Snowflake warehouse |
| Tool | AWS Schema Conversion Tool |

## Assumptions and limits

- The diagram places the Oracle warehouse, Oracle and non-Oracle backend systems, and legacy systems on premises. Their connectivity and detailed deployment are not specified.
- AWS does not identify the legacy source systems, unmigrated warehouse systems, cloud ETL vendor, or most BI products. They remain generic system slots; Tableau, Oracle Business Intelligence Suite, and Amazon QuickSight are the named BI products.
- AWS Schema Conversion Tool is shown inside the AWS Cloud boundary. Its runtime and configuration are not detailed.
- The source does not specify database engines/versions for Aurora, schemas or table selection, migration task configuration, CSV dialect, S3 bucket names or account layout, Glue job logic, Snowflake loading mechanism, security, scheduling, sizing, or high availability. This template does not invent these details.
- S3 is object storage, represented by the schema's `database` element because there is no separate persisted-object-store kind.
- This is an architecture template, not deployable AWS infrastructure. It does not configure VPCs, IAM, endpoints, replication tasks, Glue jobs, or Snowflake accounts.

## What teams usually customize

- Identify the actual Oracle source databases, backend applications, legacy systems, and unmigrated warehouses.
- Specify Aurora and Snowflake schemas, data mappings, conversion exceptions, S3 layout, CSV settings, and ETL/load behavior.
- Choose the cloud ETL and BI products, access paths, schedules, security controls, and operational responsibilities.
- Decide which reporting consumers use the historical Snowflake path, operational Aurora path, or both.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-data-workload-migration/oracle-data-workload-migration.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-data-workload-migration/images/oracle-data-workload-migration-to-aws-ra.png)
- [AWS architecture diagram PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/oracle-data-workload-migration-to-aws-ra.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
