# Open Banking on AWS

An AWS reference architecture for exposing bank APIs to licensed or accredited third parties. With customer consent, third parties can retrieve account balances, transactions, and statements, or initiate payment submissions. AWS describes use cases including spend analysis, credit decisioning, and ecommerce payments.

Sources:

- [Open Banking on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-banking-on-aws/open-banking-on-aws.html)
- [Overview and ecosystem diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-banking-on-aws/open-banking-overview.html)
- [Networking and security diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-banking-on-aws/open-banking-part1.html)
- [Services and operations diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-banking-on-aws/open-banking-part2.html)
- [Combined architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/open-banking-on-aws/open-banking-on-aws.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The template captures the major participants, AWS services, and interactions in AWS's Open Banking diagrams. It is an architecture blueprint for mapping into an M1Spec project, not an AWS deployment or a complete security, regulatory, or operational design.

## How it works

1. A consumer authorizes a licensed or accredited third-party application to access financial data or submit a payment. A regulator-authorized Trust Service Provider (TSP) issues digital certificates that help establish the authenticity of banks and third parties.
2. The bank connects its data center to AWS using Direct Connect and Site-to-Site VPN, with Transit Gateway as the connectivity hub. AWS recommends two diverse Direct Connect connections for resilience. The core system of record synchronizes data to an AWS-hosted RDS copy in near real time.
3. API Gateway exposes Open Banking and authorization APIs, uses mutual TLS for third-party access, and integrates with AWS WAF. Public client certificates are stored in S3 as a trust store. Private integrations and PrivateLink connect API Gateway to the API services; Route 53 provides DNS and traffic management.
4. Account Information and Payments microservices run in containers on Amazon ECS with AWS Fargate. They use DynamoDB for consents, aggregated data, and API performance metrics; ElastiCache caches customer account information. Payment status webhooks are hosted in this layer. Payment services connect to the bank's payment rails.
5. CloudFront delivers static data with AWS Shield protection. The architecture also shows an outbound VPC and proxy, a third-party developer sandbox with mock APIs, and a separate-account OAuth 2.0 identity provider.
6. GuardDuty detects threats and Security Hub CSPM provides a cross-account security view. The diagrams also show AWS Network Firewall, IAM, KMS, Inspector, Secrets Manager, Certificate Manager, and Macie. CloudWatch, CloudTrail, and X-Ray support monitoring; logs are collected in S3 and analyzed with OpenSearch. Systems Manager, CloudFormation, AWS Code Services, EventBridge, SQS, and SNS support configuration, deployment, and notifications.

## Assumptions and limits

- The diagrams describe logical components and selected data flows, not a deployable topology. Account boundaries, VPCs, endpoints, subnets, network policy, and high-availability details are not fully specified here.
- AWS names Apache Kafka as an example streaming technology and also mentions message-queue mechanisms. Neither the streaming mechanism nor the core banking platform is prescribed.
- ForgeRock, Ping Identity, Keycloak, and a custom option are shown as alternatives for the OAuth 2.0 identity provider. The template does not select one. The TSP is an external participant, but AWS does not name a provider.
- AWS does not specify the RDS engine or schema, API contracts, consent lifecycle, payment-rail implementation, proxy product, identity-provider configuration, or retention and security policies. These must be designed for the consuming bank and its regulatory obligations.
- Service names and descriptions follow the AWS reference pages; use of a service in this blueprint does not imply a particular configuration or deployment.

## What teams usually customize

- Map the consumer, third-party application, and bank core systems to project systems and users; keep or omit slots that do not apply.
- Select the bank's API specifications, consent model, payment-rail integration, and identity provider, including how certificates are issued, rotated, and validated.
- Define account and VPC boundaries, Direct Connect and VPN resilience, PrivateLink endpoints, routing, proxy behavior, and the threat model.
- Choose storage schemas, synchronization guarantees, cache behavior, log retention, monitoring, and security controls for the bank's compliance requirements.
- Decide which of the pictured security, developer, and operations services are in scope, and document their actual integrations and ownership.
