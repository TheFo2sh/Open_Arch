# Connected Mobility Data Lake

A serverless AWS data mesh for creating connected-mobility data products and making governed data discoverable to consumers, based on AWS's [Connected Mobility Data Lake reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-mobility-data-lake/connected-mobility-data-lake.html). AWS publishes the diagram as a [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-mobility-data-lake/connected-mobility-data-lake.pdf#connected-mobility-data-lake) in its [Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The design brings vehicle telemetry, factory data, and CRM data into AWS, prepares datasets as products, and lets data owners govern discovery and cross-account access. OEM teams and partners can query approved data; OEMs can also expose data through APIs.

## How it works

1. Vehicles send data through a third-party network provider to **AWS IoT Core**. IoT rules forward messages to **AWS Lambda**, which processes them and writes vehicle attributes and status to **Amazon DynamoDB** and raw data to **Amazon S3**.
2. Factory data enters through **AWS Direct Connect** and **Amazon Kinesis Data Streams**. **AWS DataSync** copies CRM data from its source database to S3.
3. An S3 event invokes Lambda for processing; Lambda starts an **AWS Fargate** batch job to prepare data. Data producers publish prepared datasets to S3 and are responsible for their quality and format.
4. An **AWS Glue** crawler creates producer-account catalog entities. **AWS Lake Formation** governs the catalog and permissions, while metadata is replicated to a central governance account to make data discoverable.
5. The data owner grants consumer accounts access in response to requests, using direct entity sharing or tag-based access controls. Call-center applications can access sources across accounts. OEMs and partners query approved data with **Amazon Athena**, **Amazon SageMaker AI Data Wrangler**, or **Amazon Redshift Spectrum**.
6. OEMs can expose data to end-user applications and businesses through **Amazon API Gateway** and monetize those APIs.

## Assumptions and limits

The blueprint models the documented service and data flows, not a deployable infrastructure design. Producer, central-governance, and consumer accounts are represented by their services and catalog roles inside one AWS zone; the template schema has no account-boundary element. The S3 databases are logical data roles, not a claim about the number or layout of buckets.

AWS does not name the vehicle network provider or CRM product, nor specify connectivity protocols, schemas, bucket organization, job implementation, encryption or retention, catalog replication mechanics, exact roles, or API authentication and monetization. The template leaves these implementation choices open rather than supplying them.

## What teams usually customize

- Map the call-center, OEM/partner, and end-user application slots to the project's own systems, and map the human user slots to its users.
- Choose the network provider and CRM integration, vehicle and factory formats, and how source datasets are partitioned into S3 buckets.
- Define producer and consumer accounts, catalog replication and schema-change behavior, Lake Formation roles and tag policies, and operational security controls.
- Implement the Lambda functions, Fargate preparation job, query access patterns, API backends, authentication, and any API monetization.
