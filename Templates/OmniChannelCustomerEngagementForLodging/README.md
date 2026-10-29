# Omni-channel Customer Engagement for Lodging

A serverless AWS reference architecture for personalized customer engagement at travel and hospitality companies, based on AWS's [Omni-channel Customer Engagement for Lodging](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/omni-channel-customer-engagement-lodging/omni-channel-customer-engagement-lodging.html).

Sources: [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/), [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/omni-channel-customer-engagement-lodging/images/omni-channel-customer-engagement-lodging.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/omni-channel-customer-engagement-lodging/omni-channel-customer-engagement-lodging.pdf). The source page was published August 15, 2022.

## What it is for

The architecture provides a unified interface for customer-service teams at travel and hospitality companies to deliver personalized service across channels and throughout the guest journey. Amazon Lex supports chatbot interactions, Amazon OpenSearch Service searches available products, and Amazon Pinpoint schedules recommendations for guests.

## How it works

1. Amazon S3 stores website and configuration files; Amazon CloudFront serves the unified interface.
2. The interface uses Amazon API Gateway for application APIs. Amazon Cognito controls API access, and AWS Lambda functions provide personalized recommendations.
3. Amazon DynamoDB collects guest 360-degree data from data-processing workloads and systems of record.
4. Amazon Lex powers a chatbot that collects guest input and supports automated personalized interactions and recommendations.
5. A search Lambda function uses Amazon OpenSearch Service to find available products in the data bank index.
6. Amazon Pinpoint schedules recommendations for delivery to guests. AWS describes email and mobile push notifications; the diagram also depicts text notifications.

The diagram additionally shows Amazon Personalize and Amazon S3 datasets in an AI/ML area, plus separate core, search, and recommendations Lambda functions. Their exact data flow and model behavior are not specified.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, CloudFront, Cognito, API Gateway, Lambda, DynamoDB, Lex, OpenSearch Service, Personalize, and Pinpoint |
| Slots | **Customer service team**, **Guest**, **Omni-channel user interface**, **Guest chatbot experience**, **Lodging systems of record**, and **Guest notification channels** |
| Lambda-hosted systems | **Core function**, **Search function**, and **Recommendations function** |
| Databases | **Guest 360 data store** on DynamoDB and **Available-products index** on OpenSearch Service |

The lodging diagram lists external systems of record: property-owner relationship management, central reservation, property management, property point-of-sale (POS), loyalty, booking engine, survey, and machine-learning output systems. AWS does not identify their products, owners, or integration mechanisms. They are represented by a generic system slot, not invented technology catalog entries.

## Assumptions and unspecified details

- Amazon Personalize and datasets appear in the diagram but are not explained in the numbered description. Their exact inputs, model, and relationship to the recommendations function are left open.
- AWS does not describe the guest 360-degree schema, data ingestion or synchronization, API contract, Cognito configuration, chatbot implementation, search-index population, or operational and security settings.
- The source describes Pinpoint notifications and shows email, text, and push destinations, but does not name an additional email or mobile delivery provider. The generic notification-channel slot represents destinations, not a presumed vendor.
- The source does not specify the underlying compute, network, deployment, or availability design; this template does not infer those infrastructure details.

## What teams usually customize

- Map the customer-service and guest slots to the project's people and systems, and connect the lodging systems-of-record slot to actual upstream applications.
- Define data ingestion, the guest 360-degree model, the API and authentication setup, chatbot experience, and product-index population.
- Confirm how Amazon Personalize participates in the recommendation flow and select the actual guest notification channels and providers.
- Set project-specific security, operations, availability, and deployment requirements.

This is an architecture template, not an AWS infrastructure deployment.
