# Temenos T24 Transact

An M1Spec architecture template for the [Temenos T24 Transact service architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-t24-transact/temenos-t24-service.html), published by AWS on November 12, 2021. This describes an architecture to apply to a project; it does not deploy AWS infrastructure.

## What it is for

The template models the AWS reference for a Temenos T24 core banking workload: API-controlled access, containerized online transaction processing (OLTP), a read-only query path, and event ingestion from Amazon Kinesis Data Streams.

## How it works

1. **Perimeter.** AWS WAF and AWS Shield are shown protecting the service perimeter in front of Amazon CloudFront.
2. **Access.** CloudFront forwards requests to Amazon API Gateway, which controls and monitors access to T24.
3. **Read-only queries.** API Gateway directs read-only queries to AWS Lambda, which uses query-optimized Amazon DynamoDB storage.
4. **OLTP.** API Gateway directs OLTP traffic through Elastic Load Balancing to the T24 application containers running on Amazon ECS. The diagram shows Amazon MQ between two generically labeled ECS application-container groups and a relational database.
5. **Event ingestion.** AWS Lambda ingests events from selected Amazon Kinesis Data Streams topics into DynamoDB tables.
6. **Relational database.** The source leaves the relational database choice open: Amazon Aurora, Amazon RDS for Oracle, Amazon RDS for SQL Server, or NuoDB.

The diagram also includes Amazon Route 53, Amazon Elastic Container Registry, AWS Secrets Manager, and Amazon CloudWatch. AWS does not describe their connections or configuration in the service-architecture text, so the blueprint includes them without inventing flows.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | WAF, Shield, CloudFront, Route 53, API Gateway, Elastic Load Balancing, ECS, ECR, Secrets Manager, CloudWatch, Amazon MQ, Lambda, Kinesis Data Streams, DynamoDB, and Aurora |
| Slots | **T24 user** and **Temenos T24 Transact**; two additional slots represent the Lambda query and event-ingestion workloads |
| Containers | Two ECS application-container groups as drawn, plus the read-only query and event-ingestion Lambda functions |
| Databases | Query and event data on DynamoDB; a relational database on Aurora in this blueprint |

AWS labels both ECS groups simply “Amazon ECS Application Containers”; the A/B labels in the blueprint distinguish their positions around Amazon MQ, not documented business roles. Aurora is selected as one of AWS's documented relational database options for a concrete blueprint. Teams can replace it with RDS for Oracle, RDS for SQL Server, or NuoDB; the source does not specify the NuoDB deployment or how the database choice maps to the two ECS groups.

## What teams usually change

- **Relational database.** Choose the engine and deployment that fit the project; the source lists Aurora, RDS for Oracle, RDS for SQL Server, and NuoDB without selecting one.
- **T24 workloads.** Map the T24 system and user slots to the project's existing system and users. Adjust the two ECS groups only when the project's design provides more detail than the generic source diagram.
- **Read and event data.** Confirm the DynamoDB table boundaries, query patterns, Kinesis topics, and event-processing behavior for the project; AWS does not specify these details.
- **Supporting services.** Add only the Route 53, ECR, Secrets Manager, and CloudWatch relationships and configuration that the project confirms.

## Sources

- [Temenos T24 Transact: Service architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-t24-transact/temenos-t24-service.html)
- [AWS service architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/temenos-t24-transact/images/temenos-t24-service.png)
- [Temenos T24 Transact architecture diagrams (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/temenos-t24-transact/temenos-t24-transact.pdf#temenos-t24-service)
- [AWS Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
