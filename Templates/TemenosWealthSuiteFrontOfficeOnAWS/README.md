# Temenos WealthSuite Front Office on AWS

An M1Spec architecture template based on AWS's [Temenos WealthSuite Front Office on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-wealthsuite-front-office/temenos-wealthsuite-overview.html) reference architecture. The source also provides a [VPC and networking design](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-wealthsuite-front-office/temenos-wealthsuite-vpc-networking.html), both diagrams in the [AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/temenos-wealthsuite-front-office/temenos-wealthsuite-front-office.pdf), and the [reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). This template describes an architecture; it does not deploy AWS infrastructure.

## What it is for

The design deploys Temenos WealthSuite Front Office for wealth managers and private bankers. Amazon EKS hosts its containerized application layers; Amazon API Gateway manages external interfaces; Amazon RDS for Oracle provides the relational database. AWS's integration design also names Amazon MQ and Amazon S3 as data sources or targets.

## How it works

1. The User Experience Platform (UXP), including its IDE-based UI and UX designer, runs on EKS.
2. The API layer on EKS is the entry point for external interfaces and contains application business logic.
3. API processing initiates work in Finance Services (FIN), a scalable set of calculation engines on EKS.
4. The Integration Layer (INT) on EKS imports, extracts, routes, and transforms data in batch or near-real-time modes. AWS lists SFTP, HTTPS, Amazon MQ, Apache Kafka, and an enterprise service bus as transport mechanisms.
5. Amazon MQ and Amazon S3 appear as AWS sources or targets for integration data. The networking design shows VPC endpoints for private AWS-service access.
6. Amazon RDS for Oracle hosts the relational database. The overview diagram shows primary and secondary instances; the networking design identifies Multi-AZ as an availability option.

For internet usage, the networking design shows CloudFront with AWS WAF and AWS Shield. For on-premises access, it describes API Gateway private endpoints through a VPN or AWS Direct Connect, with the VPC reachable only through the API Gateway VPC Link and load balancer. EKS containers can use AWS Fargate, Amazon EC2, or both. The networking page also describes extending to three Availability Zones and accessing AWS services through VPC endpoints without internet access.

## What applying it brings

| | |
|---|---|
| Zone | AWS |
| Platforms | Amazon VPC, EKS, API Gateway, API Gateway VPC Link, Application Load Balancer, RDS for Oracle, VPC endpoints, CloudFront, WAF, Shield, Certificate Manager, Direct Connect, Secrets Manager, ECR, CloudWatch, Amazon MQ, and Amazon S3 |
| Slots | **Temenos WealthSuite Front Office**, the adopting project's wealth management system; **Internet users**, **Branch users**, **External API consumers**, and **External systems** |
| Containers | **UXP**, **API layer**, **Finance Services (FIN)**, and **Integration Layer (INT)** within the WealthSuite system |
| Database | **WealthSuite database** on Amazon RDS for Oracle |

## Source limits and assumptions

- The overview image depicts two Availability Zones; the networking page describes three as an optional extension. The template does not turn the extension into a required deployment.
- The source does not identify a Kafka distribution, ESB product or provider, VPN implementation, database schema, API contracts, or the exact data exchanged with each integration target. These details are left to the adopting team.
- AWS shows Secrets Manager, Amazon ECR, and CloudWatch in the overview diagram but does not explain their specific roles in the numbered flow. They are included without inferring application behavior.
- The template represents the RDS database as one logical database rather than inventing schemas or deployment settings. API, network, and integration relationships are limited to the documented paths and responsibilities.

## What teams usually customize

- Map the WealthSuite system and user slots to the project's own systems and users; map external systems and API consumers to the project's actual integrations.
- Choose internet-facing, private, or combined access and decide whether to use Direct Connect or a VPN.
- Select EKS compute (Fargate, EC2, or both), Availability Zone count, and RDS availability configuration.
- Specify the actual API contracts, data formats, Kafka/ESB products, data sources and targets, and security configuration; AWS's reference does not prescribe them.
