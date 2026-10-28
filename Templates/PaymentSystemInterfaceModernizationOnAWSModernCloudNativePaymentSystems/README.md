# Payment System Interface Modernization on AWS: Modern Cloud-Native Payment Systems

An M1Spec template based on AWS's [Payment System Interface Modernization on AWS: Modern Cloud-Native Payment Systems](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/payment-system-interface-modernization/payment-system-interface-modernization.html), published April 6, 2022.

AWS's page links to a [PNG diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/payment-system-interface-modernization/images/payment-system-interface-moderization.png) and an [editable PowerPoint ZIP](https://docs.aws.amazon.com/architecture-diagrams/latest/payment-system-interface-modernization/samples/payment-system-interface-modernization.zip); it does not link to a PDF. The page text was available through a public AWS documentation mirror, but the PNG and ZIP could not be retrieved in this environment. This template therefore follows the page's numbered descriptions and does not claim verification of diagram-only labels.

## What it is for

The pattern modernizes a bank payment interface with container-based microservices, API-based request handling, and event-driven communication. It shows internet and bank-data-center request paths, with the bank's own systems remaining external to AWS.

## How it works

1. A payment user can initiate a request through a payment-integrated mobile app or a bank-provided app. The bank app's request reaches a receiver in the bank data center and is routed into AWS over **AWS Direct Connect**. An internet client such as a merchant reaches **AWS WAF**, then **Amazon API Gateway**.
2. API Gateway routes internet requests through a **VPC endpoint** and **Network Load Balancer**. An **Application Load Balancer** and the EKS cluster's ALB ingress controller deliver requests to the payment, balance, VPA, merchant, or account microservice.
3. The **Amazon EKS** microservices perform CRUD operations in an **Amazon RDS** unified payment interface database and maintain sessions in **Amazon ElastiCache (Redis OSS)**. They communicate through topics in **Amazon MSK**.
4. **Amazon OpenSearch Service** and **Amazon CloudWatch** provide observability. **AWS IAM**, **AWS KMS**, and **AWS Secrets Manager** support roles-based access and protection of credentials and data. **Amazon ECR** maintains the microservice container images.
5. Services reach the bank's HSM and core banking systems over Direct Connect. Other bank data-center systems consume near-real-time transaction data from an RDS replica over Direct Connect.

## External dependencies and assumptions

AWS names the bank request receiver, bank HSM, core banking systems, other bank data-center consumers, mobile apps, and merchant/other internet clients, but does not identify their vendors or interfaces. They are represented as generic external system slots, not AWS deployments or catalog products. The architecture does not specify the RDS engine or schema, API contracts, payment protocols, Kafka topic contents, microservice implementations, exact security policies, or replication configuration; those details are intentionally left open. The named microservice examples are modeled as containers without invented implementation technologies.

This is an architecture template, not deployable infrastructure or a deployment plan.

## What teams usually customize

- Map the payment user and external-system slots to the project's actual users and systems, or omit slots that do not apply.
- Replace the generic bank and merchant endpoints with the actual partner systems, protocols, and ownership boundaries.
- Specify the RDS engine/schema, replication behavior, API and event contracts, and microservice decomposition.
- Detail the EKS ingress implementation and the IAM, KMS, and Secrets Manager policies and operational choices for the project.
