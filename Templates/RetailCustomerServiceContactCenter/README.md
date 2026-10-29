# Retail Customer Service Contact Center

An AWS retail customer service contact center using natural-language IVR, skills-based call routing, customer profiles, agent assistance, and contact analytics.

**Sources:** AWS [Retail Customer Service Contact Center](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/retail-contact-center/retail-contact-center.html), its [linked architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/retail-contact-center/images/retail-contact-center.png), the [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/retail-contact-center/retail-contact-center.pdf#retail-contact-center), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The reference was published December 9, 2021.

## What it is for

The reference design helps physical and ecommerce retailers answer customer enquiries across voice, text, and chat with Amazon Connect, natural-language IVR, automation, and agent-assisted service.

## How it works

1. A customer contacts the retailer's service number. Amazon Connect answers and greets the customer with a natural-language interactive voice response (IVR).
2. Amazon AppFlow retrieves customer data from a CRM, such as a customer's name, membership status, and loyalty points. AWS names Salesforce as an example CRM; it does not require that provider.
3. Amazon Connect uses contact flows and skills-based routing to select automation or transfer enquiries to agents.
4. Agents use the Amazon Connect Contact Control Panel (CCP) and internet softphone to answer calls from any location.
5. Managers monitor live conversations and review recordings. Amazon Connect saves completed-call recordings to Amazon S3.
6. Contact Lens, an Amazon Connect feature, provides real-time insights such as sentiment analysis, transcripts, and detailed analytics.
7. Amazon Connect streams call metadata, including call lengths, wait times, and agent activity, through Amazon Kinesis for near-real-time processing.
8. Data stored in Amazon S3 is ingested into Amazon Redshift and visualized in Amazon QuickSight dashboards.
9. Amazon Connect integrates with retailer data lakes, customer platforms, and order management systems for common enquiries. Amazon API Gateway exposes reusable backend and microservice APIs; AWS Lambda runs business logic and lookups, while Amazon DynamoDB provides low-latency lookups directly from API Gateway.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Managed services | Amazon Connect, Contact Lens, AppFlow, Kinesis, S3, Redshift, QuickSight, API Gateway, Lambda, and DynamoDB |
| User slots | **Retail customer**, **Customer service agent**, and **Contact center manager** |
| System slots | Retail customer contact center, CRM, order management, customer data platform, data lake, near-real-time contact metrics, and retailer lookup logic |
| Databases | Call recordings on S3, analytics data on Redshift, and unspecified direct API lookup data on DynamoDB |
| Third-party technology | Salesforce CRM, shown by AWS as an example CRM rather than a required provider |

## Assumptions and details not specified

- Salesforce is an example CRM, not a required product. CRM, order management, customer data platform, and data lake are represented as generic system slots because AWS does not require or identify their providers.
- AWS describes near-real-time processing of Kinesis contact metadata but does not name its destination or implementation. The blueprint represents that destination as a generic system slot.
- AWS does not specify the service-number provider, API contracts, CRM mappings, contact-flow configuration, Lambda implementation, database schemas, data retention, security controls, network topology, or AWS Region. These details are left to consumers rather than inferred.
- The source says Amazon S3 data is ingested into Redshift without specifying the S3 data layout, ingestion mechanism, or analytics schema.
- DynamoDB is identified for low-latency lookups directly from API Gateway; the source does not specify the lookup data or schema.

## What teams usually customize

- Select a CRM and map its customer, membership, and loyalty data to the agent experience.
- Connect order management, customer platform, and data lake systems; define APIs and Lambda lookup behavior.
- Tailor IVR prompts, contact flows, automation, skills-based routing, and agent handoff rules.
- Define Contact Lens settings, metrics, S3 retention, Redshift analytics, dashboards, and the security and deployment details for the target environment.

This is an M1Spec architecture template, not an AWS deployment. It models the documented services and flows without prescribing infrastructure.
