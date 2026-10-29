# Guest 360 Data Platform for Restaurants

This template represents AWS's architecture for identifying known and unknown restaurant guests across channels, then using guest activity for personalized offers, campaigns, and customer acquisition.

## Source

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/guest-360-data-platform-restaurants/guest-360-data-platform-restaurants.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/guest-360-data-platform-restaurants/images/guest-360-data-platform-restaurants.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/guest-360-data-platform-restaurants/guest-360-data-platform-restaurants.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Use case and data flow

The blueprint follows the source's numbered flow:

1. Restaurant order, loyalty, and location domains provide purchase and registration attributes.
2. A vendor-neutral master data management (MDM) capability matches those attributes into unified guest profiles and identifies loyalty members.
3. Customer data platform (CDP) tag management and first-party cookies collect web and mobile behavior. The source describes third-party cookies and mobile device IDs as optional identifiers. First-party loyalty and unified profile data help identify known and anonymous guests.
4. Amazon S3, AWS Glue, and Amazon EMR form an open-standards data lake for purchase, loyalty, marketing, and digital interaction data.
5. Amazon DynamoDB backs the operational guest 360 data store; serverless microservices and business events use operational guest data to personalize offers. This operational store is distinct from the analytics lake.
6. Amazon Pinpoint and Amazon Personalize support outbound campaigns; Amazon Personalize also personalizes inbound web and mobile experiences.
7. The CDP integrates with demand-side platforms (DSPs) and advertising exchanges to activate customer acquisition campaigns and measure results.

## Assumptions and boundaries

The source names MDM, CDP, DSP, and advertising-exchange roles but does not identify vendors or products. They are represented as vendor-neutral third-party slots. The source also does not specify the serverless runtime, integration protocols, APIs, event schemas, ingestion mechanisms, data formats, campaign channels, or deployment topology; the blueprint does not select them. Optional third-party cookies and device IDs are not required for the flow.

This is an architecture template, not a deployment. It does not prescribe privacy or consent policy, identity-resolution rules, data retention, security controls, regions, or infrastructure configuration.

## What consumers usually customize

Map the restaurant data, web and mobile, and guest slots to existing project systems. Select MDM/CDP/DSP and advertising-exchange providers, define identity and consent policies, and specify ingestion, event, and data contracts. Teams also adapt the lake and operational-store schemas, campaign channels, and measurement strategy to their requirements.
