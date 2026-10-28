# Payor Strategic Focus Areas

An M1Spec template based on AWS's [Payor Strategic Focus Areas](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/healthcare-payor-strategic-focus-areas/healthcare-payor-strategic-focus-areas.html), published May 22, 2024. The source includes three architectures:

1. [Modernize Core Payor Functions diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/healthcare-payor-strategic-focus-areas/images/1-modernize-core-functions.png)
2. [Advanced Analytics to Drive Business Value diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/healthcare-payor-strategic-focus-areas/images/2-advanced-analytics.png)
3. [Improve the Customer Experience diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/healthcare-payor-strategic-focus-areas/images/3-improved-customer-experience.png)

The [AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/healthcare-payor-strategic-focus-areas/healthcare-payor-strategic-focus-areas.pdf) contains the same diagrams and numbered flows. See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The architecture shows how payors can modernize core payor and provider data, standardize healthcare information, enable analytics and machine learning, and improve customer and care-management workflows. It is a reference blueprint, not deployable AWS infrastructure.

## How it works

### Modernize core payor functions

1. On-premises or cloud data sources, including claims, provider, and EMR data, enter AWS through **AWS DataSync** for near real-time transfer or **AWS Database Migration Service** for database migration. Ingestion requires secure connectivity and encryption in transit and at rest.
2. Raw source-format data lands in **Amazon S3**.
3. **AWS Lambda** can run shorter curation and referential-integrity jobs and initiate **AWS Glue** Spark ETL jobs.
4. Data-quality rules standardize and curate data into **Amazon Redshift**. Curated and atomic levels use Redshift; **Amazon S3** stores associated documents.
5. AWS Glue crawlers populate the **AWS Glue Data Catalog** with metadata and lineage. **AWS Lake Formation** centralizes data access control and governance.
6. Purpose-built stores include **AWS HealthLake** for FHIR data, **Amazon RDS** for relational and transactional data, **Amazon Redshift** for structured and semi-structured data, and **Amazon S3** for other data types.
7. **Amazon Athena** queries structured claims and supports preparation and reconciliation. **Amazon QuickSight** builds dashboards, and **Amazon SageMaker AI** builds, trains, and deploys models. Consumers include business users, researchers, data scientists, and technical users.
8. **AWS IAM**, **AWS Key Management Service**, **Amazon CloudWatch**, and **AWS CloudTrail** provide the solution-level security, encryption, monitoring, and API-access auditing described by AWS.

### Advanced analytics to drive business value

1. Clinical, claims, provider, and EMR data can arrive in streaming, near-real-time, or batch flows. The source mentions HL7v2, FHIR, CCDA, X12, and semi-structured formats.
2. **Amazon Comprehend Medical**, **Amazon Textract**, and **AWS Lambda** can support parsing and semantic harmonization. **Amazon Bedrock** can optionally support enrichment or conversion into FHIR R4 before loading **AWS HealthLake**.
3. HealthLake can be hydrated from common data models and purpose-built stores, including **Amazon Neptune**, **Amazon DynamoDB**, and **Amazon S3**.
4. Providers can use HealthLake data through **Amazon Athena** and **Amazon Redshift**; **Amazon SageMaker AI** supports machine-learning insights, **Amazon Bedrock** can translate English requests into SQL FHIR queries, and **Amazon DataZone** can publish data products.
5. **Amazon QuickSight**, optionally integrated with **Amazon Q**, supports dashboards; **AWS Amplify** supports enhanced applications such as a longitudinal patient view.

### Improve the customer experience

1. Callers use phone or other channels to interact with a call-center application. Calls may be streamed or handled near real time; offline communications may be batch.
2. **Amazon Connect** routes calls and uses **Amazon Lex** for conversation. **AWS Amplify** supports agent applications, **Amazon Cognito** provides security, and **Amazon API Gateway** provides API access for call-log analysis.
3. **AWS Lambda** sends call logs through **Amazon Data Firehose** into **Amazon S3**. **Amazon SageMaker AI** analyzes stored logs and determines next steps. IAM, KMS, CloudWatch, and CloudTrail provide the stated security and monitoring capabilities.
4. Purpose-built AWS services connect to care-management systems for member information; **Amazon Pinpoint** supports targeted multi-channel customer communications.
5. Member and provider profiles are enriched from **AWS HealthLake** and S3 data lakes, then passed to a care-management system to decide the next action during member calls.

## Assumptions and limits

- AWS does not identify a vendor, product, or interface for the data-quality rules engine. It is represented as a system slot rather than attributed to an AWS service.
- AWS says partner solutions can implement ingestion and that consumers can bring their own identity and terminology services (such as an EMPI). These are optional integration slots; no specific third-party provider is named or required by the source.
- The source does not specify the network topology, deployment regions/accounts, security configuration, retention policies, data-quality rules, data-store schemas, or integration protocols between the depicted services and existing payor systems.
- The source does not identify which integration service transfers curated data into each downstream purpose-built store; the blueprint represents the documented data destinations without prescribing a separate connector.
- The diagram's relational database engine, model implementations, FHIR conversion mechanism, call-center application, and care-management system are not specified. The corresponding system/data-store placeholders do not prescribe a product.
- S3, Redshift, HealthLake, RDS, Neptune, and DynamoDB are modeled as database-hosting platforms with database slots to represent the data stores shown. The blueprint does not choose service configurations or imply that every optional store must be used.
- Cross-cutting security and monitoring relationships describe AWS's solution-level guidance, not a fully specified service-by-service policy or deployment.

## What teams usually customize

- Map the source-data, care-management, analytics, and call-center system slots and the user slots to the project's own systems and people.
- Select the actual ingestion connectors, healthcare data standards, FHIR harmonization pipeline, data-quality rules, EMPI, and terminology services.
- Decide which purpose-built stores, data products, models, dashboards, and customer communication channels the use case needs.
- Define actual AWS accounts, networking, data access, encryption, monitoring, retention, and service configuration in the project's infrastructure design.
