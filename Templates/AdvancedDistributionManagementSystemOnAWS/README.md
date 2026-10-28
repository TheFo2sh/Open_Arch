# Advanced Distribution Management System on AWS

A reference architecture for a resilient, low-latency Advanced Distribution Management System (ADMS) deployed on AWS Outposts and connected to AWS Regional services. This template follows AWS's [reference architecture page and diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/advanced-distribution-management-system/advanced-distribution-management-system.html) and its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/advanced-distribution-management-system/advanced-distribution-management-system.pdf#advanced-distribution-management-system).

## What it is for

Utilities that need local processing, low latency, and data residency can run ADMS workloads in their data centers on Outposts. Two racks at physically isolated sites, homed to different Availability Zones, provide the documented resilient topology. This is an architecture template, not an infrastructure deployment.

## How it works

1. ADMS applications run on Amazon EC2 instances on AWS Outposts at both sites. AWS says to use a purpose-built AWS database or a vendor-supported database on EC2; it does not name a database product or engine.
2. The ADMS integrates with customer applications in the OT network and field devices such as sensors and actuators. The Outposts local gateway provides the low-latency local network path.
3. Each Outpost connects to its home AWS Region through a service link for Outposts management and intra-VPC traffic. AWS says to use an existing internet connection or AWS Direct Connect.
4. Applications on Outposts can connect securely to regional applications such as a Distributed Energy Resource Management System (DERMS). The architecture also shows Amazon S3, Amazon Athena, Amazon QuickSight, and Amazon SageMaker AI for regional data analytics and machine learning.

## Assumptions and unspecified details

- AWS does not identify an ADMS vendor/product, database engine, database topology, or data replication behavior. The two database nodes reflect the diagram; they do not assert that the databases replicate or fail over.
- The DERMS is an example, not a required AWS service. Its vendor, hosting, interface, and data exchange are not specified.
- The diagram includes a PI server and corporate IT in the customer data centers, but AWS does not describe their roles or integrations; these are shown as unmapped system slots.
- The page does not specify network addressing, security controls, protocols, data schemas, service sizing, availability targets, or detailed analytics/ML data flows.
- The architecture does not specify human actors, so it defines no user slot.

## What teams usually customize

- Map the two ADMS system slots, OT applications, field devices, PI server, corporate IT, and any regional DERMS to the corresponding systems in the project's architecture.
- Choose whether the database is a purpose-built AWS database or a vendor-supported database on EC2, then document the actual engine, availability, and replication design.
- Select the Outposts connectivity option, local network topology, security controls, and the regional analytics/ML services and data flows required by the utility.
- Adjust the site count, Availability Zone placement, and regional application topology to match the deployment's resilience and data residency requirements.
