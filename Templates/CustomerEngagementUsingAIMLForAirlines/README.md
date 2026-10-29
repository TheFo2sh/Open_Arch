# Customer Engagement Using AI/ML for Airlines

An AWS airline contact-center and customer data architecture based on the [Customer Engagement Using AI/ML for Airlines reference page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-airlines/customer-engagement-airlines.html), its [linked diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/customer-engagement-airlines/images/customer_engagement_travel_ra.png), and its [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/customer-engagement-airlines/customer-engagement-airlines.pdf#customer-engagement-airlines), listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the page's initial publication to November 14, 2020.

## What it is for

The architecture applies conversational and contact-center services to an airline's Traveler 360 data platform. AWS describes personalizing customer interactions, recognizing customer needs and intents, and improving call-center response times. It combines Amazon Connect, Amazon Lex, Lambda integrations, sentiment and intent analysis, customer analytics, notifications, and an optional master data management (MDM) integration.

This is an M1Spec architecture template, not deployable AWS infrastructure.

## How it works

The AWS page's numbered flow describes:

1. **Amazon Connect** provides the cloud call center. **AWS Lambda** integrates it with the operational data platform, with skills-based routing and workflows.
2. **Amazon Lex** provides conversational chatbots; Lambda provides data-platform access.
3. The **Connect Customer Contact Control Panel** integrates with customer-service, Passenger Service System (PSS), loyalty, and World Tracer user interfaces.
4. **Amazon Transcribe** and **Amazon Comprehend** support sentiment analysis and identifying customer intents so operations can be adjusted.
5. **Optional:** an MDM integration provides a unified traveler profile for more accurate engagement.

The diagram also depicts the supporting Traveler 360 data platform and customer-engagement services:

- Airline systems of record provide batch and event data. SFTP batch input, Kinesis data events, and Data Firehose feed the S3 staging and real-time staging data sets.
- AWS Glue, Glue Data Catalog, and Amazon EMR are shown with S3 Parquet and reportable data sets. The diagram names market-segment revenue, customer lifetime value, customer revenue and service indexes, and shopping insights.
- Amazon DynamoDB holds Customer 360 data, with DynamoDB Streams, Kinesis data events, Step Functions, Lambda, and API Gateway shown around customer-event processing and microservices.
- Redshift customer data marts, Athena, SageMaker customer analytics, QuickSight customer analytics, and Amazon Personalize appear alongside this data platform.
- Amazon Connect conversations, Pinpoint interactions, and campaigns are shown in S3 interaction data. Amazon Pinpoint sends customer notifications through phone, email, and chat channels shown in the diagram.

## Assumptions and unspecified details

- The page links this design to the Traveler 360 Data Platform for Airlines, and the diagram shows its data platform. The blueprint captures the data-platform services and data sets in this diagram; it does not prescribe additional details from other Traveler 360 designs.
- The diagram labels an SFTP batch ingress but does not identify its AWS implementation, provider, protocol configuration, or operational ownership. It is represented as a generic system slot, not as an assumed AWS Transfer Family deployment.
- The diagram identifies airline sources and agent interfaces, but does not name products or vendors for the airline's PSS, DCS, loyalty, booking, flight-operations, baggage, survey, or customer-service systems. Those remain system slots.
- The diagram shows World Tracer and Net Tracer interfaces; AWS does not identify their providers, APIs, or integration protocols. MDM is optional and its product, vendor, and integration are also unspecified.
- AWS does not specify data schemas, batch schedules, event contracts, the precise relationship between each source and data set, model types or training, intent-handling logic, notification-provider configuration, or the API contracts. The blueprint avoids prescribing these.
- Transcribe and Comprehend are named in the page's numbered flow but are not labeled in the diagram image. Their inclusion reflects the page text; their detailed placement and processing sequence are not specified.
- The reference does not prescribe account or network boundaries, regions, security controls, availability, service configuration, or deployment automation.

## What teams usually customize

- Map the airline system-of-record, agent-interface, customer-channel, SFTP, and optional MDM slots to the actual project systems and users.
- Choose ingestion paths, data schemas, event contracts, retention, and the data sets required by the airline.
- Define the airline's Connect and Lex workflows, Lambda integration behavior, Transcribe and Comprehend usage, customer profile model, and API contracts.
- Select analytics and personalization use cases, notification channels, and any third-party providers, then define their integration details.
- Add the security, networking, availability, operational, and deployment design required for the implementation.
