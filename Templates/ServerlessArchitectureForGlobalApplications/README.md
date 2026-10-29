# Serverless Architecture for Global Applications

This template follows AWS's [Serverless Architecture for Global Applications](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-global-applications/serverless-global-applications.html), published in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). Sources: the [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-global-applications/images/serverless-global-applications.png) and its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/serverless-global-applications/serverless-global-applications.pdf).

## What it is for

A multi-Region serverless application pattern that combines path-based API migration, latency-based routing, CQRS, event-driven workflows, and Region-specific data stores. It is intended to improve customer experience for global services while supporting different read and write patterns.

## How it works

1. **Amazon CloudFront** routes requests by path so legacy API operations can be migrated incrementally. **Amazon Route 53** selects the lowest-latency Region for regional API requests.
2. **Amazon API Gateway** exposes the API in each Region. Query requests read from the data layer, synchronous commands invoke application logic, and asynchronous commands are sent to **Amazon EventBridge**. External systems can also publish events to the bus.
3. **AWS Lambda** handles transactional and event-driven logic. **Amazon ECS on AWS Fargate** runs long-running container work. **AWS Step Functions** orchestrates saga workflows for distributed transactions and eventual consistency.
4. The data layer uses **Amazon DynamoDB** for key-value access, **Amazon Aurora** for relational queries, and **Amazon S3** for data-lake analytics and machine-learning access. The diagram additionally shows **DynamoDB Accelerator (DAX)**, **Amazon RDS Proxy**, **AWS Lake Formation**, and **Amazon S3 Access Points**.
5. The diagram also shows an external file system sending changes through **AWS Storage Gateway** to S3, and external database changes captured by **AWS Database Migration Service** and **Amazon Kinesis** before reaching S3.
6. Logic events and canonical-data changes are published to EventBridge; external-system events can enter the same event bus. The diagram includes **Amazon Augmented AI (Amazon A2I)** but does not detail its workflow.
7. Regional data is replicated using **DynamoDB Global Tables**, **Amazon S3 Cross-Region Replication**, and **Amazon Aurora Global Database**.
8. For read-heavy deployments, queries can use local regional replicas while writes go to the primary Region. A design optimized for fast global writes can instead replicate event and command logic across Regions.

## What applying it brings

| | |
|---|---|
| Zones | AWS global edge, a primary AWS Region, and a secondary AWS Region |
| User slot | **Users**, mapped to the project's users |
| System slots | **Legacy API operations**, **Existing file system**, **Existing database system of record**, **External event sources**, **External systems of record**, and regional application/query logic |
| AWS services | CloudFront, Route 53, API Gateway, EventBridge, Lambda, ECS on Fargate, Step Functions, A2I, DynamoDB, DAX, Aurora Global Database, RDS Proxy, S3, Lake Formation, S3 Access Points, Storage Gateway, DMS, and Kinesis |
| Databases | Ingestion data, the DynamoDB single view and cache, Aurora report database, S3 data lake, and their regional replicas |

AWS identifies external systems of record and external event sources but does not name third-party products. The template represents them as system slots and does not add a vendor-specific third-party service.

## Assumptions and unspecified details

- The source uses generic Regions. The blueprint calls them primary and secondary; it does not prescribe Region names or the total number of Regions.
- The blueprint depicts the read-focused profile: queries can use secondary regional data and writes are routed to the primary Region. Fast global writes are an alternative described by AWS, not a simultaneous deployment assumption in this blueprint.
- DynamoDB Global Tables support multi-Region writes. Aurora Global Database has a primary writer cluster and replicated secondary clusters; it is not modeled as a general multi-writer database. S3 Cross-Region Replication is modeled from the primary data lake to the secondary; AWS does not specify bucket configuration or replication rules.
- AWS does not identify which data store owns the canonical data model, nor define event schemas, routing rules, saga steps, Lambda runtimes, container contents, API operations, database engines or schemas, or the A2I workflow.
- Storage Gateway, DMS, Kinesis, DAX, RDS Proxy, Lake Formation, and S3 Access Points appear in the diagram; the source does not detail their configuration or guarantees. The diagram does not identify which Amazon Kinesis product is used. The blueprint shows only their stated architectural roles.
- The source does not identify the legacy API implementation or the external systems of record and event sources. These remain slots to map to project systems.
- This is an architecture template, not deployable AWS infrastructure. It does not prescribe account structure, VPCs, security policies, sizing, operations, or failover procedures.

## What teams usually customize

- Map the user and system slots to the project's systems and users; identify the actual legacy API and external systems of record.
- Choose the number and names of Regions, the read/write profile, and the Aurora primary/replica topology.
- Define API routes, command and query handlers, EventBridge rules, event schemas, saga workflows, and the implementation of long-running container work.
- Select the data model, Aurora engine, DynamoDB keys, S3 layout, replication settings, and the roles of DAX, RDS Proxy, Lake Formation, S3 Access Points, and A2I.
- Add the networking, security, reliability, deployment, and operational details required by the workload.
