# Lodging Data Platform with Master Data Management

An AWS lodging data platform enhanced with master data management (MDM), based on AWS's [Lodging Data Platform with Master Data Management reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/lodging-data-platform-mdm/lodging-data-platform-mdm.html). See the [linked diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/lodging-data-platform-mdm/images/lodging-data-platform-mdm.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/lodging-data-platform-mdm/lodging-data-platform-mdm.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Lodging organizations with guest records spread across property, reservation, loyalty, and other operational systems can use this pattern to identify duplicate records, include guests outside loyalty programs, and make unified customer data available to operational and analytical consumers. This is an M1Spec architecture template, not deployable AWS infrastructure.

## How it works

The flow follows AWS's numbered architecture description:

1. A third-party MDM tool enriches the customer-data-as-a-service view and creates unified guest records. AWS Glue ML Transform identifies duplicate loyalty records and customers who have not joined a loyalty program.
2. Operational stores, the data lake, and analytics consume the new customer feeds through versioned customer-centric microservices and events. AWS Step Functions and AWS Lambda orchestrate services that consume and publish the data; the diagram also shows AWS Fargate in event processing.
3. The Amazon S3 data lake adds a customer-centered view for lifetime value, revenue index, and service index alongside existing lodging datasets.
4. Amazon DynamoDB provides the operational customer 360 store. Customer changes trigger event processing, which publishes customer-centric events to property systems and other subscribers. API clients reach customer-centric microservices through Amazon API Gateway.
5. Amazon Redshift extends the enterprise data warehouse with customer-domain schemas and data marts.
6. Amazon SageMaker AI builds models from existing raw and curated data plus new customer records. Amazon Athena and Amazon QuickSight support customer analytics for dashboard users.

The blueprint also retains the reference diagram's lodging data ingestion and processing paths, including Amazon Kinesis Data Streams, AWS Transfer Family, AWS Data Exchange, Amazon AppFlow, AWS Glue, and Amazon EMR.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Kinesis Data Streams, S3, Transfer Family, Data Exchange, AppFlow, EMR, Glue, DynamoDB, Step Functions, Lambda, Fargate, API Gateway, Redshift, SageMaker AI, Athena, and QuickSight |
| Slots | Lodging systems of record, external demographic and address data, a third-party MDM service, API client applications, property systems and other event subscribers, lodging analytics experience, and dashboard users |
| Databases | Customer-centric data lake on S3, Glue Data Catalog, unified guest profiles on DynamoDB, and customer data marts on Redshift |
| Compute-hosted systems | Data lake transformation jobs on EMR, customer-centric microservices and events on Lambda, event-processing tasks on Fargate, and customer analysis models on SageMaker AI |

## Assumptions and unspecified details

- AWS requires an MDM tool but does not name its product, provider, hosting model, interfaces, or licensing. The MDM system is therefore a vendor-neutral slot; the template does not select or deploy an MDM product.
- AWS does not define the MDM enrichment rules, identity-matching thresholds, duplicate resolution, golden-record ownership, source priorities, or customer consent policy.
- The source does not specify data schemas, event contracts, microservice versioning strategy, API design, data freshness, retention, or how the data lake and operational store are synchronized. The relationships show the documented flows, not a prescribed implementation.
- Lodging systems, external data providers, API clients, and downstream subscribers are categories rather than named products. Select the actual systems, integration protocols, and providers for the adopting project.
- The reference is an architecture blueprint, not a deployment design. It does not prescribe account structure, regions, networking, security controls, availability settings, monitoring, sizing, or service configuration.

## What teams usually customize

- Choose an MDM provider and define matching, merge, survivorship, consent, and data-quality policies.
- Map the lodging-system, API-client, event-subscriber, analytics, and dashboard-user slots to the project's actual systems and roles.
- Define customer-centric service versions, event and API contracts, ingestion schedules, and data synchronization behavior.
- Design the lake datasets, DynamoDB guest profile model, Redshift schemas and marts, and SageMaker model inputs for the project's data.
- Add the networking, security, governance, availability, and operational details required for a deployable solution.
