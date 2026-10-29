# LUMINAI Refinery Advisor on AWS

A reference architecture for Beyond Limits’ LUMINAI Refinery Advisor on AWS, based on AWS’s [architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/luminai-refinery-advisor-on-aws/luminai-refinery-advisor-on-aws.html) and its [linked architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/luminai-refinery-advisor-on-aws/images/luminai-refinery-advisor-on-aws.png).

This is an M1Spec architecture template, not an AWS deployment plan.

## Use case

Bring operational data from multiple refinery sites into LUMINAI Refinery Advisor for real-time decision support. The system combines streaming ingestion and ETL with business services that provide timely recommendations and a consolidated view of refinery operations.

## Architecture and data flow

1. **Refinery data enters AWS.** Operations data from refinery processes, assets, data historians, and data streams is directed through a public-subnet Application Load Balancer to the private sensor processing pipeline. The source does not specify source protocols or payload formats.
2. **Streams are processed.** Data ingestion workloads on **Amazon ECS** send streams to **Amazon MSK**, which feeds the depicted ECS sensor processing pipeline. AWS’s numbered description also says MSK directs data to ETL jobs on **Amazon EMR**. The source does not detail the division of processing between those depicted workloads.
3. **ETL results are stored and queued.** EMR jobs store their results in **Amazon Aurora PostgreSQL** and place messages on **Amazon MQ**.
4. **LUMINAI services process messages.** The **Orchestrator** and **Reasoner** run on Amazon ECS and process Amazon MQ messages using LUMINAI’s AI-driven algorithms. Processed data is stored in Aurora PostgreSQL.
5. **Data is made available.** LUMINAI’s web UI, APIs, and reporting APIs make refinery information available from Aurora. Long-term data is stored in **Amazon S3**. Users access the web UI or APIs in a browser; authorized clients can use BI tools through the reporting endpoint.

## Assumptions and limits

- The source diagram shows a web ALB, a refinery-data ALB, and a reporting-data ALB. Their placement and exact network configuration are not specified beyond the data ALB being in a public subnet and the sensor pipeline being in a private subnet.
- The source refers to multiple availability zones (A, B, and C), a VPC, subnets, and security groups. These network and security constructs are not represented because the template specification has no corresponding element kinds.
- The architecture page describes EMR ETL jobs, while the diagram depicts an ECS sensor processing pipeline. Both are represented, but the boundary and interaction between those workloads are not detailed by AWS.
- AWS does not specify stream protocols, ETL implementation, message formats, Aurora schema, S3 organization or retention, deployment sizing, or how the individual LUMINAI services divide responsibilities.
- The source names Beyond Limits’ LUMINAI Refinery Advisor as the third-party software system. It does not name specific BI products or the browser clients, so those remain generic project slots.
- The source does not describe AWS account setup, regions, infrastructure provisioning, operational procedures, or service configuration. None are inferred here.

## What consumers usually customize

- Map the refinery sites, LUMINAI Refinery Advisor, BI tools, refinery users, and authorized clients to the project’s own systems and users.
- Choose ingestion and sensor processing responsibilities, the EMR job implementation, and the message and data contracts.
- Refine the web, data, and reporting entry points to match the actual network design, endpoints, and security requirements.
- Define Aurora and S3 data models, retention, access control, and reporting integrations based on the refinery’s operating requirements.
