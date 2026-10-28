# Architecture for Airline Crew Management Systems

An M1Spec architecture template based on AWS's [Architecture for Airline Crew Management Systems](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/crew-management-systems/crew-management-systems.html), published June 11, 2021. The source page links to the [architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/crew-management-systems/crew-management-systems.pdf) and [diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/crew-management-systems/images/crew-management-systems-aws-ra.png).

## What it is for

Airlines managing crew applications and related operational data across two Availability Zones, with secure corporate connectivity, high-availability data storage, and analytics for crew planning, training statistics, and crew utilization.

## How it works

1. Crew members use mobile apps or a browser. Corporate users and systems connect from the corporate data center through AWS Direct Connect as the primary link and AWS Site-to-Site VPN as the secondary link, via AWS Transit Gateway and AWS Global Accelerator.
2. Amazon Route 53 resolves crew application domains. AWS WAF protects the public resources; Amazon CloudFront serves static pages and assets from Amazon S3. Amazon Cognito provides authentication and access control, and Amazon API Gateway provides application API access.
3. API Gateway and the private Application Load Balancer route requests to crew management microservices orchestrated by Amazon EKS across two Availability Zones. The source diagram names Training, Hotel & Transport, Logistics, and Fatigue Risk Management.
4. Amazon Aurora PostgreSQL-Compatible Edition stores crew data with Aurora Replicas across multiple Availability Zones. The source also depicts Amazon S3 and Amazon S3 Glacier as the data lake for crew data, with Amazon QuickSight for reporting, visualization, and advanced analytics.
5. AWS KMS, AWS Secrets Manager, and AWS Certificate Manager appear in the security group. Amazon CloudWatch, AWS CloudTrail, and AWS Personal Health Dashboard appear in logging and monitoring; the page calls out operational-health monitoring and at-rest/end-to-end encryption, and protection of credentials and private keys.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Direct Connect, Site-to-Site VPN, Transit Gateway, Global Accelerator, Route 53, WAF, CloudFront, Cognito, API Gateway, S3, S3 Glacier, Elastic Load Balancing, EKS, Aurora PostgreSQL-Compatible Edition, KMS, Secrets Manager, Certificate Manager, CloudWatch, CloudTrail, Personal Health Dashboard, and QuickSight |
| Slots | **Crew member**, **Corporate user**, **Corporate systems**, and **Crew management applications** |
| Containers | Training, Hotel and transport, Logistics, and Fatigue risk management |
| Databases | Website assets, raw crew data, computed crew data, archived crew data, and crew operational data |

## Assumptions and unspecified details

- The source page identifies Amazon EKS for container orchestration; its diagram also shows an Auto Scaling Group icon in the application tier. This template models the application tier on EKS as stated in the page text and does not infer a separate node-scaling configuration.
- AWS names the data-lake services and analytics use case, but does not specify the ingestion, transformation, archival, or QuickSight data-access mechanisms. The data-flow labels here describe only the depicted purpose, not a particular implementation.
- AWS describes encryption and credential/key protection at a high level. The exact service-to-resource mapping, cryptographic configuration, and certificate usage are not specified.
- The source does not identify a third-party provider or a particular corporate system. Corporate users and systems are represented as slots; connect or map them to the project's own systems as appropriate.
- The diagram is an architecture reference, not a deployment plan. It does not specify account layout, network ranges, detailed IAM policies, sizing, or application implementation.

## What teams usually customize

- Map the crew member, corporate user, corporate systems, and crew management application slots to the project's systems and users; omit slots that do not apply.
- Adapt the corporate connectivity and public entry path to the team's network, identity, and API requirements.
- Reconcile the EKS application tier with the infrastructure team’s chosen cluster and compute scaling design.
- Define how operational data is ingested, transformed, archived, and exposed to analytics, and specify the required security controls and observability.
