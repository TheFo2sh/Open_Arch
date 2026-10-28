# Cloud Point-of-Sale (POS) System on AWS for CPG

This template models AWS's [Cloud Point-of-Sale (POS) System on AWS for CPG](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cloud-pos-cpg/cloud-pos-cpg.html), published in October 2021. AWS provides the [reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) and links the [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/cloud-pos-cpg/cloud-pos-cpg.pdf#cloud-pos-cpg-chapter) and [diagram source bundle](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cloud-pos-cpg/samples/cloud-pos-cpg.zip).

## What it is for

A scalable, maintainable POS for consumer packaged goods companies selling directly to consumers. The four cloud POS capabilities are checkout, order capture, product management, and back office; AWS notes that these capabilities can also be shared with a DTC ecommerce implementation.

## Architecture and data flow

1. Store networks contain a mobile PWA and POS devices. AWS Outposts is an optional way to add AWS compute and storage at stores. Store and corporate networks use either AWS Direct Connect or AWS Site-to-Site VPN to reach AWS; the diagram does not prescribe both at once.
2. Amazon CloudFront and AWS Lambda@Edge provide edge services. Lambda@Edge integrates with external payment gateway and tax calculator providers. AWS does not specify provider names, APIs, or payment/tax data flows.
3. Amazon API Gateway, Amazon EventBridge, and AWS AppSync make up the integration layer. They handle requests and connect the application layer with the data layer and corporate system APIs.
4. AWS Lambda, AWS Step Functions, and AWS Fargate are shown in the serverless application layer. The diagram does not map a particular POS feature to a particular runtime.
5. The purpose-built data layer includes Amazon DynamoDB for key-value data, Amazon Aurora for relational data, Amazon ElastiCache for caching, and Amazon S3 for objects. Amazon Elasticsearch Service appears with the management and analytics services in the 2021 diagram, but AWS does not specify its use. Amazon Athena, IAM, Amazon Personalize, Amazon Fraud Detector, Amazon CloudWatch, and AWS KMS also appear in that layer.
6. Business users and corporate BI tools, enterprise applications/databases (including CRM and ERP), and third-party applications support day-to-day work on the corporate network.

## What applying it brings

| | |
|---|---|
| Zones | Store network, AWS Cloud, corporate network, and external service providers |
| Users | Customer, store user, and business user slots |
| POS system slot | Cloud POS application, with checkout, order capture, product management, and back-office containers |
| AWS services | Outposts, Direct Connect, Site-to-Site VPN, CloudFront, Lambda@Edge, API Gateway, EventBridge, AppSync, Lambda, Step Functions, Fargate, DynamoDB, Aurora, ElastiCache, S3, Elasticsearch Service, Athena, IAM, Personalize, Fraud Detector, CloudWatch, and KMS |
| External systems | Payment gateway and tax calculator placeholders; no provider is selected |

This is an architecture template, not deployable AWS infrastructure. Systems and users are M1Spec slots. Database slots identify data stores without asserting schemas or deployment topology.

## Assumptions and details AWS does not specify

- The diagram was published in 2021. The template retains its Amazon Elasticsearch Service label rather than silently substituting a later product name; confirm current product availability and naming before use.
- The architecture prose names Amazon EC2 Auto Scaling in its integration-layer list, but links that text to AppSync documentation; the linked diagram labels AWS AppSync. This template follows the diagram label and does not add EC2 Auto Scaling.
- AWS names the payment gateway and tax calculator as external service providers but does not name vendors, APIs, protocols, or detailed request/response flows. They are intentionally generic system slots.
- The source lists alternative network connections and serverless technologies, but does not specify the chosen option, which POS feature uses which runtime, or a full network topology.
- AWS does not define the POS data schemas, database sizing, deployment/replication layout, or exact links between the management and analytics services and individual data stores. Those details are not invented here.
- Human roles are not fully described; the user slots are illustrative and can be mapped to the project's own users.

## What teams usually customize

- Map the customer, store-user, business-user, and system slots to the project's actual users and systems.
- Choose whether store Outposts are needed, and select Direct Connect or Site-to-Site VPN for each network connection.
- Select the payment and tax providers and document their APIs, security requirements, and data flows.
- Confirm which integration and runtime services implement each POS feature, then refine database schemas, data ownership, and analytics paths.
- Adjust the corporate systems, edge services, AWS service set, and operational/security controls to the project's current requirements.
