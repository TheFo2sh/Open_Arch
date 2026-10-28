# Connected Restaurants using IoT and AI/ML

An AWS reference architecture for connected restaurants that use IoT and AI/ML to maintain food quality and safety, preserve cold storage, manage queues, and monitor foot and vehicle traffic.

Source: [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-restaurants-iot-ai-ml/connected-restaurants-iot-ai-ml.html) and its [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-restaurants-iot-ai-ml/connected-restaurants-iot-ai-ml.pdf#connected-restaurants-iot-ai-ml). The diagram was first published December 21, 2022.

## How it works

1. Restaurant IoT devices communicate with AWS IoT Greengrass Core over MQTT. The source names FreeRTOS and other device operating systems but does not identify particular devices or sensors.
2. AWS IoT Core connects and manages devices, maintains device shadows, supports over-the-air updates, and secures devices. Device events feed the serverless operational services.
3. The operational services store events and operational data in Amazon DynamoDB. AWS AppSync supports a near-real-time operational dashboard, and Amazon Pinpoint delivers alerts through multiple channels.
4. Amazon S3 stores raw data and curated datasets. AWS Glue crawlers and its Data Catalog discover data; AWS Lake Formation governs it; Amazon Macie detects sensitive data; AWS Glue jobs and Amazon EMR transform or enrich it.
5. Amazon Athena and Amazon Redshift support analytics, with Amazon QuickSight. Redshift data marts are optional; Athena or Redshift Spectrum can query the data lake directly for one-time analysis.
6. Amazon SageMaker AI builds, trains, and deploys inference models. Deploying models to Greengrass Core is optional. Amazon EventBridge integrates with third-party providers.

## What applying it brings

- **Zones:** AWS services and a restaurant-edge zone for IoT devices and Greengrass Core.
- **Platforms:** IoT Core, DynamoDB, AppSync, Pinpoint, EventBridge, S3, Glue, EMR, Lake Formation, Macie, Redshift, Athena, QuickSight, and SageMaker AI.
- **Slots:** Restaurant IoT device fleet, restaurant operations, dashboard operator, and an unspecified third-party provider. Systems and users are slots for mapping to a project's own systems and users.
- **Databases:** Operational data store on DynamoDB, data lake on S3, and an optional analytics data mart on Redshift.
- **Device technologies:** FreeRTOS and MQTT are included as named technologies; AWS also allows other device operating systems.

This is an architecture template, not an AWS deployment. It does not prescribe a network, infrastructure configuration, or service sizing.

## Assumptions and unspecified details

- AWS describes a serverless architecture and microservices but does not name their implementation services, deployment, or API boundaries; they are represented by the Restaurant operations slot.
- AWS does not name the dashboard user, third-party providers, device models, sensor types, data schema, event routing rules, alert channels, analytics queries, or model details. The operator persona is an explicit modeling assumption; the provider remains a generic slot.
- The source describes a data lake and its processing and analytics services but does not specify the exact ingestion or transformation pipelines or SageMaker's model data source. The relationships show the documented purposes, not a prescribed implementation.
- Facilitate Social Distancing and Queue Depth Management are cited as optional AWS solutions; their solution-specific components are not modeled.
- Edge inference, Redshift data marts, and Redshift Spectrum are optional in the source.

## What teams usually customize

- Map the device fleet, restaurant operations, and operator slots to their own systems and users.
- Select the actual devices, operating systems, sensors, third-party providers, and alert channels.
- Define the event schemas, ingestion and transformation pipelines, dashboard APIs, model lifecycle, and security/governance policies.
- Decide whether to deploy inference at the edge, build Redshift data marts, or query S3 directly with Athena or Redshift Spectrum.
- Add the networking, availability, capacity, and deployment details required by their AWS environment.
