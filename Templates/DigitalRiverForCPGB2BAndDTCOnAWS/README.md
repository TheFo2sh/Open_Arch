# Digital River for CPG, B2B, and DTC on AWS

An M1Spec architecture template based on AWS's [Digital River for CPG, B2B, and DTC on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/digital-river-cpg/digital-river-cpg.html) reference architecture. The linked [AWS architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/digital-river-cpg/digital-river-cpg.pdf) is the source for the service and technology labels.

## What it is for

The architecture supports consumer packaged goods businesses selling through B2B and direct-to-consumer channels. A storefront and shared headless ecommerce layer integrate with Digital River's multi-tenant commerce SaaS, fulfillment partners, and existing corporate applications to support order-to-cash processes.

## How it works

1. **Storefront and edge.** Amazon CloudFront delivers static content through edge locations. Lambda@Edge provides edge compute for dynamic content; AWS Shield and AWS WAF provide website security. The B2B/DTC frontend includes end-user and management portals and is shown with EC2 Auto Scaling, Lambda, React.js, Node.js, GraphQL, and AWS Amplify.
2. **Headless application and data.** API Gateway, Lambda, AppSync, Aurora, and DynamoDB appear in the shared application and data layer. The layer interacts with storefronts, fulfillment partners, and Digital River.
3. **Digital River SaaS.** Digital River provides multi-tenant core commerce functionality. AWS names Amazon RDS, ECS, Elastic Load Balancing, OpenSearch Service, Kinesis Data Streams, and Route 53 in this layer.
4. **Partners and corporate systems.** Fulfillment partners exchange fulfillment requests, order status updates, and returns with the headless layer. Business users and existing SAP, BI, ERP, and other enterprise applications support day-to-day operations and integrate with the application layer.
5. **Connectivity and stores.** AWS identifies Direct Connect or Site-to-Site VPN as alternative options for securing data in transit. Outposts adds AWS compute and storage at stores in 1U and 2U form factors.

## Assumptions and limits

- The blueprint preserves AWS's service, system, and relationship boundaries without turning the template into deployable infrastructure.
- AWS does not specify Aurora's engine, database schemas or ownership, API contracts, exact request routing, which layer owns particular data, service regions, or account and network topology. Database slots therefore use generic names and descriptions.
- The diagram lists Astra DB for Cassandra, relational databases, Oracle DB, Apache Kafka, Apache Mesos on Marathon, and ChaosSearch among corporate applications and databases. It does not explain their ownership, placement details, or data flows; the template records them in the corporate network without connecting them to specific commerce data stores.
- The source does not identify workloads deployed to Outposts or choose between Direct Connect and Site-to-Site VPN. Both connectivity options are represented as alternatives, not as a requirement to deploy both.
- The AWS documentation describes the Digital River service layer at a high level. The template does not infer a payment provider, fulfillment implementation, particular CMS, or internal Digital River data flows.

## What teams usually customize

- Map the shopper, business-user, and fulfillment-partner slots and the storefront, headless application, and existing-business-system slots to the project's actual users and systems.
- Choose the connectivity option, storefront implementation, and AWS services that match the deployment.
- Replace generic database slots with known engines, ownership, schemas, and data flows once those details are available.
- Remove optional technologies or corporate-system examples that do not apply, and add project-specific integrations and operational details.
