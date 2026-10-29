# Customer Engagement Using AI/ML for Lodging

An AWS architecture for personalized lodging customer interactions and faster service, based on AWS's [Customer Engagement Using AI/ML for Lodging reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-ai-ml-lodging/customer-engagement-ai-ml-lodging.html), its [linked diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-ai-ml-lodging/images/customer-engagement-ai-ml-lodging.png), the [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/customer-engagement-ai-ml-lodging/customer-engagement-ai-ml-lodging.pdf#customer-engagement-ai-ml-lodging), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Lodging companies can use the pattern to recognize guest needs and intents, personalize interactions, and improve response times and brand loyalty. The architecture brings together contact-center workflows, a guest chatbot, real-time personalization, an operational data platform, and customer analytics. It is a template, not an AWS infrastructure deployment.

## How it works

1. **Customer engagement and service.** Amazon Connect provides cloud contact-center routing and workflows. AWS Lambda and AWS Step Functions access operational data to support faster interactions. Customer and service applications reach APIs through Amazon API Gateway.
2. **Conversational automation.** Amazon Lex powers a guest-facing chatbot that automates user interactions.
3. **Personalization.** Amazon Personalize creates real-time personalized user experiences. The diagram shows customer insights and a customer 360 data store alongside the personalization flow.
4. **Agent context and notifications.** The Amazon Connect Contact Control Panel (CCP) integrates with customer-service, loyalty-membership, and reservations systems. AWS Step Functions and Amazon Pinpoint support complex event processing and customer notifications.
5. **Interaction analysis.** AWS describes Amazon Transcribe and Amazon Comprehend for sentiment analysis and identifying frequent customer intents, which can inform call-center operations and automation. These services are named in the page text but are not drawn in the linked diagram.
6. **Optional MDM.** An MDM system can be integrated to improve customer interactions. The diagram shows MDM events entering the data platform.

The diagram also shows customer events entering through Amazon Kinesis Data Streams, batch and connected-source ingestion through AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow, and data lake processing with Amazon S3, Amazon EMR, and AWS Glue. Amazon Redshift, Amazon SageMaker, Amazon Athena, and Amazon QuickSight support customer data marts and analytics.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Connect, Lambda, Step Functions, Fargate, API Gateway, Lex, Personalize, Transcribe, Comprehend, Pinpoint, Kinesis Data Streams, S3, Transfer Family, Data Exchange, AppFlow, EMR, Glue, DynamoDB, Redshift, SageMaker, Athena, and QuickSight |
| User slots | **Guest or customer**, **Customer service agent**, **Dashboard user**, and **MDM user** |
| System slots | Customer and service applications, lodging systems of record, external demographic/address data sources, optional MDM system, contact-center portal, customer channels, chatbot experience, and event subscribers |
| Databases | Operational data lake on S3, customer 360 data on DynamoDB, Glue Data Catalog on Glue, and customer data marts on Redshift |

## Assumptions and unspecified details

- AWS does not name lodging-system vendors, the MDM product, customer-service or loyalty applications, or separate messaging-channel providers. They remain generic system slots; the MDM integration is optional.
- The source diagram and prose describe service roles and broad flows, not API contracts, schemas, data transformations, event formats, retention, or deployment configuration. These implementation details are not inferred.
- The diagram's S3 data lake is represented as one database slot. Its JSON, staging, Parquet, reportable-data, and interaction areas are described rather than modeled as independently specified buckets.
- The AWS page identifies Transcribe and Comprehend for sentiment and intent analysis but does not detail their integration or processing sequence. Their blueprint relationships indicate those functions, not a prescribed pipeline.
- AWS does not specify how personalization is invoked by each customer channel, nor the detailed flow between all customer 360, event-processing, and analytics services.

## What teams usually customize

- Map customer, agent, dashboard, and MDM user slots and external lodging systems to the project's actual systems and users.
- Choose whether to use an MDM integration and identify its provider, data contracts, and event path.
- Define contact-center workflows, service and loyalty integrations, API contracts, chatbot behavior, notification channels, and personalization invocation.
- Specify customer 360 and data lake schemas, source ingestion, transformation and analytics workloads, and event handling.
- Add the security, governance, availability, network, and deployment design required for the target environment.
