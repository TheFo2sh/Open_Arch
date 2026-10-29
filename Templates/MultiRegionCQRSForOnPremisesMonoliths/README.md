# Multi-Region CQRS for On-Premises Monoliths

A read-local, write-global architecture for extending an on-premises transactional monolith to multiple AWS Regions, based on the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/multi-region-cqrs-monoliths/multi-region-cqrs-monoliths.html) and its [diagram PNG](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/multi-region-cqrs-monoliths/images/multi-region-cqrs-monoliths.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/multi-region-cqrs-monoliths/multi-region-cqrs-monoliths.pdf#multi-region-cqrs-monoliths). See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The pattern serves queries from a nearby regional copy of denormalized data while sending commands to the existing on-premises monolith, preserving its local transactional isolation and atomicity. It reduces read latency for users in multiple Regions without making the monolith's transactional database a globally writable database.

## How it works

1. **Hybrid connectivity.** AWS Direct Connect connects the on-premises installation to the primary AWS Region.
2. **Change capture.** AWS Database Migration Service captures changes from the monolith's relational database and streams them to Amazon Kinesis Data Streams.
3. **Read projection.** An AWS Lambda CDC handler denormalizes stream events and writes them to an Amazon DynamoDB Global Table. Regional replicas provide local query data.
4. **Primary queries.** The primary regional API serves queries by reading its local DynamoDB projection.
5. **Primary commands.** The primary Lambda dispatcher sends commands from the primary API to the on-premises monolith, preserving its transactional isolation and atomicity.
6. **Secondary APIs.** Each secondary API reads its local DynamoDB replica and its Lambda dispatcher forwards commands to the primary dispatcher.
7. **Health monitoring.** Amazon Route 53 monitors the Regions from us-east-1 and sends health alarms to Amazon Simple Notification Service (SNS).
8. **Availability state.** An AWS Lambda regional health information handler processes alarms and stores regional API state and location in a separate DynamoDB Global Table.
9. **Circuit breakers.** Regional API dispatchers use the availability information to determine whether a Region is available for command dispatch.

## Architecture and assumptions

- The source calls for a primary Region and one or more secondary Regions but does not name them. The blueprint uses generic primary/secondary labels and names only the health-monitoring Region, us-east-1.
- The source specifies an on-premises relational database but does not identify its product, engine, or schema. The template uses a generic database platform and does not imply a particular product.
- The source does not name an API gateway product or describe the API implementation. The blueprint models regional API endpoints as system slots and includes the Lambda dispatchers shown in the diagram; it does not add API Gateway.
- The source describes DynamoDB Global Tables for denormalized reads and a separate table for API state and locations. Global Table replication is asynchronous/eventually consistent; it does not provide global atomic writes. Commands remain authoritative in the on-premises monolith, and this template does not imply distributed transactions.
- The architecture does not specify CDC event schemas, denormalization logic, API contracts, circuit-breaker thresholds, health-check configuration, failover procedures, network topology, or security controls. Those are deployment and application decisions, not assumed here.
- AWS does not identify another third-party provider or service in this architecture. The on-premises monolith and its database are represented as the existing system and data store, not as invented vendor products.
- This is an M1Spec architecture template, not deployable AWS infrastructure. Systems and users are slots to map to a project's own; no accounts, VPCs, endpoints, or code are created.

## What teams usually customize

- Map the monolith, regional APIs, and client slots to the project's systems and users; choose the number and names of AWS Regions.
- Define the API implementation, authorization, CDC mappings, denormalized read model, and acceptable replication lag.
- Choose the on-premises database product and Direct Connect/network topology, and decide the health checks, circuit-breaker behavior, and regional failover procedures.
