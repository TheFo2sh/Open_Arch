# Personalization Using AI/ML for Lodging

An AWS reference architecture for personalizing lodging guest communications and offers with a data lake, customer profiles, and AI/ML. It follows AWS's [Personalization Using AI/ML for Lodging architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/personalization-ai-ml-lodging/personalization-ai-ml-lodging.html) (published August 25, 2022), its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/personalization-ai-ml-lodging/images/personalization-ai-ml-lodging.png), the [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/personalization-ai-ml-lodging/personalization-ai-ml-lodging.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). This is an architecture template, not deployable infrastructure.

## What it is for

Lodging companies can combine reservation, property, loyalty, and guest data to improve service communications, target offers, and build customer analytics. The reference combines Amazon Personalize, Amazon Pinpoint, and Amazon SageMaker AI with AWS data-ingestion, processing, and analytics services.

## How it works

The flow below follows AWS's five numbered steps and the services shown in the diagram:

1. **Operational communications.** AWS Step Functions coordinates customer event processing and customer microservices, using AWS Lambda and AWS Fargate. Customer-facing applications enter through Amazon API Gateway. Amazon Pinpoint sends operational communications over channels such as email, SMS, push, voice, and in-app messaging, accounts for channel preferences, and records delivery status and interactions.
2. **Personalized offers.** Amazon Personalize uses data lake content to create guest segmentations, target lists, and offers. Amazon Pinpoint delivers offers through guest channels, and campaign and interaction data is recorded for future recommendations.
3. **Guest identity.** A third-party master data management (MDM) integration unifies guest profiles across systems of record. Customer 360 data is held in Amazon DynamoDB; its change stream feeds customer event processing, which can publish events to property systems and other subscribers.
4. **Operational data platform.** Amazon S3 is the data lake foundation. Real-time events arrive through Amazon Kinesis Data Streams; batch and connected-source data can arrive through AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow. AWS Glue and Amazon EMR process and transform raw and curated lake data, with AWS Glue Data Catalog cataloging datasets.
5. **Custom AI/ML and analytics.** Amazon SageMaker AI uses raw and curated lake data to build models for customer lifetime value, segmentation, and specialized offers. Amazon Redshift customer data marts, Amazon Athena, and Amazon QuickSight support customer analytics. Point-of-sale and survey domains are optional extensions in AWS's description.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Amazon S3, Kinesis Data Streams, Transfer Family, Data Exchange, AppFlow, Glue, Glue Data Catalog, EMR, Personalize, Pinpoint, DynamoDB, API Gateway, Step Functions, Lambda, Fargate, Redshift, Athena, SageMaker AI, and QuickSight |
| Slots | Lodging systems of record, external data sources, a third-party MDM integration, customer applications, property systems and subscribers, guest communication channels, an analytics dashboard, a lodging guest, and a dashboard user |
| Databases | Lodging data lake on S3, data lake catalog on Glue Data Catalog, Customer 360 data on DynamoDB, and customer data marts on Redshift |
| Compute-hosted systems | Data lake transformation jobs on EMR, customer event functions on Lambda, customer event tasks on Fargate, and customer analysis models on SageMaker AI |

## Assumptions and unspecified details

- AWS requires MDM integration but does not name its product, vendor, hosting model, interfaces, or data-matching rules. The blueprint therefore includes a vendor-neutral system slot, not a fictional product or provider.
- AWS refers to systems of record, property systems, external data, subscribers, and guest channels generically. The slots describe their roles; actual products, integrations, event contracts, and channel providers are left to adopters.
- AWS's prose describes customer preferences, interactions, and data lake content without specifying schemas, retention, consent rules, synchronization timing, or how data reaches each service. The relationships show the documented high-level flow without inventing those implementation details.
- The source does not specify accounts, regions, network topology, security controls, service sizing, or deployment configuration. These are outside this architecture template.
- Amazon Pinpoint is the service named in this August 2022 source. Verify its current service lifecycle and available capabilities before adopting the source design.

## What teams usually customize

- Select and integrate the MDM provider, define guest identity resolution and source-of-truth rules, and align data sharing with consent requirements.
- Map the systems-of-record, external-data, customer-application, subscriber, and dashboard slots to actual systems; decide whether optional point-of-sale and survey domains apply.
- Choose ingestion schedules and event contracts, data schemas, lake transformations, profile updates, recommendation inputs, and analytics outputs.
- Confirm channel capabilities and the current lifecycle of communications services, then adapt security, privacy, governance, and operational requirements.
