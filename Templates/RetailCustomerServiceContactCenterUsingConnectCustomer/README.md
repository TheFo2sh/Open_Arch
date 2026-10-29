# Retail Customer Service Contact Center Using Amazon Connect

An AWS retail customer service contact center with personalized IVR, skills-based call routing, CRM customer profiles, agent assistance, and contact analytics.

**Sources:** AWS [Retail Customer Service Contact Center Using Amazon Connect](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/retail-customer-service-contact-center/retail-customer-service-contact-center.html), including the [linked architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/retail-customer-service-contact-center/images/retail-customer-service-contact-center.png), published December 9, 2021.

## What it is for

The reference design helps retailers answer customer calls with natural-language IVR, personalize interactions with customer data, route enquiries to agents by skill, and analyze contact outcomes.

## How it works

1. A customer calls the retailer's service number. Amazon Connect answers with IVR and retrieves customer information for personalized greetings.
2. Amazon Connect routes calls through contact flows and skills-based queues. Agents, including remote agents, use its Contact Control Panel and softphone; calls can transfer to an agent when self-service is not appropriate.
3. Amazon AppFlow integrates the CRM with Amazon Connect to retrieve customer profiles such as names, membership status, and loyalty points. The diagram shows Salesforce CRM as an example.
4. Contact flows use AWS Lambda and Amazon API Gateway to access retailer capabilities. The diagram names order status, product status, customer information, and store FAQ lookups, with Amazon DynamoDB used for low-latency FAQ data.
5. Amazon Connect Contact Lens gives agents real-time sentiment insights, transcripts, and contact analytics.
6. Contact metadata, including call length, wait time, abandonment, and agent activity, streams through Amazon Kinesis Data Streams for near-real-time processing. The diagram also shows a generic Call Metrics destination.
7. Amazon S3 stores call recordings and other data linked to contact trace records. Data is ingested into Amazon Redshift and visualized in Amazon QuickSight dashboards. Supervisors monitor live conversations and review recordings.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Managed services | Amazon Connect, Contact Lens, AppFlow, Kinesis Data Streams, S3, Redshift, QuickSight, API Gateway, Lambda, and DynamoDB |
| User slots | **Retail customer**, **Customer service agent**, **Remote agent**, and **Contact center supervisor** |
| System slots | Retail contact center, CRM, order management, inventory, data lake/customer data platform, call metrics, and Lambda-backed retailer integrations |
| Databases | Contact recordings and data on S3, analytics data on Redshift, and store FAQ on DynamoDB |
| Third-party technology | Salesforce CRM, shown by AWS as an example CRM rather than a required provider |

## Assumptions and unspecified details

- The source requires CRM integration but says Salesforce is an example. The blueprint keeps the CRM as a system slot; teams can use Salesforce or another provider.
- Order management, inventory, and data lake/customer data platform systems are generic retailer systems. The diagram places customer systems on AWS or on-premises and does not specify their vendors or interfaces.
- The diagram labels a Call Metrics destination, but the page does not identify its product or implementation. It is represented as a generic system slot, not assigned an AWS service.
- The source does not define API contracts, CRM mappings, database schemas, call-flow configuration, Lambda implementation, data retention, security controls, network topology, or AWS region. None are inferred here.
- The diagram associates stored S3 data with contact trace records but does not specify the linking mechanism, bucket layout, or ingestion implementation.

## What teams usually customize

- Choose the CRM and map its customer, membership, and loyalty data to the agent experience.
- Connect order, inventory, customer data, and FAQ sources; define the API and Lambda lookup behavior.
- Tailor IVR prompts, contact flows, skills-based routing, and rules for handing calls to agents.
- Define Contact Lens settings, metrics, S3 retention, Redshift analytics, dashboards, and security/deployment details for the target environment.

This is an M1Spec architecture template, not an AWS deployment. It models the documented services and flows without prescribing infrastructure.
