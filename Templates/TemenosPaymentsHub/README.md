# Temenos Payments Hub

An M1Spec template based on AWS's [Temenos Payments Hub reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-payments-hub/temenos-payments-hub.html) in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS publishes a [service architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-payments-hub/temenos-payments-hub-service.html) with a [service diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/temenos-payments-hub/images/temenos-payments-hub-service.png), an [availability architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-payments-hub/temenos-payments-hub-availability.html) with an [Availability Zones diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-payments-hub/images/temenos-payments-hub-availability.png), and a [PDF containing the diagrams](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/temenos-payments-hub/temenos-payments-hub.pdf). Both diagrams and the numbered service flow were reviewed for this model.

## What it is for

The architecture shows Temenos Payments Hub on AWS for payment initiation and distribution, with private API access, lightweight Lambda microservices, and scalable ECS container processing.

## How it works

1. Users reach a private API Gateway endpoint through AWS Client VPN. AWS also names AWS Direct Connect as an on-premises access option.
2. Amazon API Gateway manages and monitors API access. The service diagram shows a Lambda path for lightweight microservices and a load-balanced ECS path for online transaction processing.
3. Lambda microservices use Amazon DynamoDB as an optimized data store. Amazon Kinesis is shown alongside this path, but AWS does not explain its specific role.
4. Elastic Load Balancing distributes requests to ECS front-end containers. Amazon MQ connects the front-end and back-end container tiers, and the back-end tier handles online transaction processing with a relational database.
5. The application VPC uses endpoints/PrivateLink to access AWS services including Amazon S3 and Amazon ECR. The diagram also shows Amazon MQ, AWS Secrets Manager, and Amazon CloudWatch on this private service path.
6. AWS's availability diagram describes ECS on AWS Fargate, with ECS on Amazon EC2 as another option; active/standby Amazon MQ; optional broker networks; automatic scaling of container services; and Amazon RDS Multi-AZ. It also shows an API Gateway HTTP API connected to an Application Load Balancer through a VPC Link and describes extending the design to three Availability Zones.

## External products and assumptions

Temenos Payments Hub is the third-party application represented by the **Temenos Payments Hub** system slot. AWS does not document the product's internal services, payment protocols, APIs, container contents, or exact integration behavior in these diagrams. The template does not invent those details. AWS's diagram labels users at the VPN boundary but does not identify a client application; **Payment access client** is a generic system slot used to express that access path while following M1Spec's user-to-system relationship rule.

The service page names Amazon RDS for Oracle, Amazon Aurora, and NuoDB as relational database options; it does not identify which option the generic Amazon RDS icon represents. NuoDB is cataloged as a third-party option but is not placed in the AWS diagram. The service diagram shows Amazon Kinesis but does not state its purpose or data flow. AWS does not specify the DynamoDB schema, API contracts, endpoint configuration, broker topology beyond the availability options, scaling thresholds, or detailed network layout.

This is an architecture template, not deployable AWS infrastructure or a deployment plan.

## What teams usually customize

- Map the Temenos Payments Hub system slot and payment user slot to the project's actual systems and users.
- Select the database engine and define its schema, replication, and data-retention requirements.
- Specify API contracts, payment protocols, Lambda and ECS service boundaries, and the role of Kinesis.
- Choose ECS capacity (Fargate, EC2, or both), Availability Zone count, scaling policies, and Amazon MQ topology.
- Detail endpoint policies, network connectivity, security controls, and the use of S3, ECR, Secrets Manager, and CloudWatch.
