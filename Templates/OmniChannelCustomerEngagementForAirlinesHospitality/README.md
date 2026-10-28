# Omni-channel Customer Engagement for Airlines

A serverless AWS reference architecture for personalized customer engagement at airlines and hospitality companies, based on AWS's [Omni-channel Customer Engagement for Airlines](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/omni-channel-customer-engagement-for-airlines/omni-channel-customer-engagement-for-airlines.html) reference architecture.

## What it is for

The architecture provides a unified interface for centralized and on-location customer-service teams to engage with travelers across channels and throughout their journey. A chatbot gathers traveler input; traveler data, product search, and scheduled recommendations support personalized interactions.

## How it works

1. Amazon S3 stores the website and configuration files, and Amazon CloudFront serves the unified interface to customer-service teams.
2. The interface uses Amazon API Gateway for application APIs. Amazon Cognito controls API access, and AWS Lambda functions provide personalized traveler recommendations and generate data.
3. Amazon DynamoDB collects Traveler 360 data from multiple sources, personalization workload outputs, and systems of record.
4. Amazon Lex powers a traveler-facing chatbot that gathers input and automates personalized interactions and recommendations.
5. Amazon OpenSearch Service searches an index of available products to recommend.
6. Amazon Pinpoint schedules recommendations for delivery by mail or mobile push notification.

The AWS description does not specify every integration or an end-to-end request sequence. The blueprint shows the stated service relationships without assuming API details, ingestion mechanisms, or how the product index is populated.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, CloudFront, Cognito, API Gateway, Lambda, DynamoDB, Lex, OpenSearch Service, and Pinpoint |
| Slots | **Customer service agent**, **Traveler**, the project's **Customer engagement application**, and **Traveler chatbot experience** |
| Additional integration slots | Unspecified **Systems of record** and **Mail or mobile push notification service** |
| Databases | **Traveler 360 data store** on DynamoDB and **Available-products index** on OpenSearch Service |

AWS does not name the systems of record or the mail/mobile-push delivery provider. They remain generic system slots rather than invented vendor technologies; the source does not establish whether Pinpoint itself provides delivery or schedules a separate service.

## What teams usually customize

- **Map the slots.** Use the project's customer-engagement application, customer-service users, and traveler domain users; map the generic systems-of-record slot to the real upstream systems.
- **Choose integrations.** Specify the source-data ingestion and synchronization, API contract and Cognito configuration, and how the product index is populated.
- **Select delivery channels.** Confirm whether Pinpoint handles delivery directly or an external mail or mobile-push service is required, then map the generic delivery slot accordingly.
- **Design the data model and operations.** Define the Traveler 360 schema, personalization processing, security, availability, and deployment settings for the business.

This is an architecture template, not an AWS infrastructure deployment.
