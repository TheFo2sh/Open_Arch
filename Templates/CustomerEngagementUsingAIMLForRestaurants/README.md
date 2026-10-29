# Customer Engagement Using AI/ML for Restaurants

An AWS reference architecture for personalizing restaurant guest interactions and improving contact center response times, based on AWS's [Customer Engagement Using AI/ML for Restaurants](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-ai-ml-restaurants/customer-engagement-ai-ml-restaurants.html) architecture.

Sources: [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-ai-ml-restaurants/customer-engagement-ai-ml-restaurants.html), [linked diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/customer-engagement-ai-ml-restaurants/images/customer-engagement-ai-ml-restaurants-ra.png), [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/customer-engagement-ai-ml-restaurants/customer-engagement-ai-ml-restaurants.pdf#customer-engagement-ai-ml-restaurants), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The page and diagram are dated 2020.

## What it is for

Restaurant companies can use cloud contact center capabilities, conversational chatbots, and a Guest 360° data platform to recognize guests, personalize interactions, reduce call times, and improve customer service across channels.

## How it works

The diagram places customer engagement services alongside a broader Guest 360 data platform:

- Restaurant systems of record include order management and POS, loyalty, case management, franchise and location relationship management, delivery management, and surveys. External demographic and address data is also shown. AWS Transfer Family handles batch loyalty data.
- Amazon S3 holds staging data and the depicted JSON and Parquet datasets. AWS Glue Data Catalog, AWS Glue, and Amazon EMR appear in the data processing path. Amazon Redshift customer data marts, Athena, SageMaker customer analytics, QuickSight, and Personalize support analytics and personalized interactions.
- Kinesis Data Streams, Data Firehose, Step Functions, Lambda, DynamoDB Customer 360 data, and API Gateway form the event-processing and microservices portion of the diagram. Amazon Pinpoint is shown with customer notifications and interaction data.

The page's six numbered steps describe the engagement use cases:

1. **Amazon Connect** provides cloud call center capabilities, skill-based call routing, and workflows. AWS Lambda functions work with the operational data platform to improve guest interactions.
2. **Amazon Lex** provides conversational chatbots for automated interactions.
3. The Amazon Connect Contact Control Panel (CCP) integrates with order management, loyalty, and case management systems to help agents handle complex scenarios.
4. **Amazon Transcribe** and **Amazon Comprehend** support sentiment analysis and identification of frequent customer intents.
5. **Amazon Connect Contact Lens** analyzes conversation sentiment, trends, and compliance to support agent training and identify company or product feedback.
6. Integrating a **Master Data Management (MDM)** system is optional.

## What applying it brings

- An AWS zone containing the named AWS managed services and data platforms.
- Slots for the restaurant's customer channels, contact center portal, order management/POS, loyalty and case management systems, other systems of record, external demographic/address sources, and the optional MDM system.
- Guest and service-agent user slots.
- Database elements for the S3 datasets, Redshift customer data marts, and DynamoDB Customer 360 data.

This is an architecture template, not an AWS infrastructure deployment.

## Assumptions and unspecified details

- The page calls the contact center product “Connect Customer”; the diagram labels it Amazon Connect, so this template uses the current Amazon Connect name.
- The source does not identify vendors or products for the restaurant systems of record, demographic/address data sources, contact center portal, or MDM system. These remain generic system slots, not invented technology catalog entries.
- The diagram's buckets and data marts are represented by the repository's `database` element kind. This is a modeling fit for the available M1Spec kinds; it does not imply that the S3 buckets are relational databases.
- AWS does not specify dataset schemas, data retention, detailed ingestion or transformation jobs, API contracts, Lambda implementation, model design, or the exact integrations among these systems. The blueprint captures the diagram's named services and stated purposes without prescribing those implementation details.
- MDM integration is optional in the source. The template includes the system slot and event path to make the depicted option visible; omit it if the project does not use MDM.

## What teams usually customize

- Map the guest, service-agent, customer channel, and restaurant system slots to the project's own users and systems.
- Replace generic system slots with the actual POS, loyalty, case-management, data-source, and MDM products and define their integration contracts.
- Specify data schemas, ingestion and transformation pipelines, event handling, analytics, chatbot content, and contact center workflows.
- Decide whether to use the optional MDM integration and which customer channels and notification mechanisms apply.
- Add the network, security, availability, capacity, and deployment details required by the AWS environment.
