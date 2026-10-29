# Couchbase on AWS Local Zones for Low Latency Edge Use Case

An M1Spec architecture template for deploying Couchbase Server and Couchbase Sync Gateway in an AWS parent Region and multiple Local Zones, with Couchbase Lite clients synchronizing with nearby edge clusters.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/couchbase-local-zones/couchbase-local-zones.html)
- [Architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/couchbase-local-zones/images/couchbase-local-zones.png)
- [Architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/couchbase-local-zones/couchbase-local-zones.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

The page and diagram were first published December 25, 2021. The numbered component descriptions on the AWS page are reflected in the data flow below.

## Use case

Place Couchbase Server and Sync Gateway in Local Zones close to mobile, desktop, and embedded clients to support low-latency data synchronization. The parent Region provides a highly available Couchbase deployment and Sync Gateway service, with replication to edge clusters in Local Zones.

## Architecture and data flow

1. Amazon VPC extends from the parent Region into multiple Local Zones.
2. Couchbase metrics and logs go to Amazon CloudWatch for centralized log management and alerts.
3. Amazon Route 53 uses geolocation-based routing to direct clients to the nearest Local Zone or the parent Region.
4. Couchbase Server backups are stored directly in an Amazon S3 bucket.
5. The parent Region Couchbase Server deployment spans multiple Availability Zones for high availability and automatic failover. Its private-subnet deployment uses a NAT Gateway for internet access.
6. A bastion host in a public subnet provides access to Couchbase Server from an external network.
7. VPC endpoints provide private connections between the VPC and AWS services without internet access; the particular endpoint services are not identified.
8. The parent Region Sync Gateway deployment spans multiple Availability Zones behind an Application Load Balancer for high availability and automatic failover.
9. Each Local Zone edge cluster contains Couchbase Server and Couchbase Sync Gateway.
10. Inter-Sync Gateway replication connects the parent Region cluster and Local Zone edge clusters over private IP addresses within the VPC.
11. Couchbase Lite clients (mobile, desktop, and embedded devices) use an embedded NoSQL database and synchronize with the edge Sync Gateway over the internet. The diagram depicts SSL on the client connection, but does not specify certificate management or TLS termination.

## Assumptions and unspecified details

The source is a reference diagram, not a deployment specification. It does not provide VPC address ranges, subnet sizing, instance types or counts, Auto Scaling policies, exact AWS service endpoint targets, security group rules, authentication configuration, backup schedules or retention, CloudWatch metric/log details, or the exact replication and client synchronization settings. These are intentionally not invented here. The displayed Local Zone names are reproduced from the diagram and may need to be changed for the target Region.

The blueprint models the parent Region and each Local Zone as platforms within the extended VPC. System elements, including client and service endpoints, are slots for the applying project's systems; they are not prescriptions for application boundaries or deployment resources. The diagram shows Internet Gateways for the parent Region and Local Zones, but the page does not describe their route tables or traffic paths, so the template does not infer those details. VPC endpoint targets are likewise left unconnected because AWS does not name them.

## What consumers usually customize

- **Location and network.** Select the actual parent Region and Local Zones and define VPC CIDRs, subnet layouts, route tables, and VPC endpoint services.
- **Compute and availability.** Choose instance sizes, Couchbase node counts, Auto Scaling behavior, and capacity/failover settings.
- **Security and operations.** Define bastion access, authentication, certificates, monitoring alerts, backup cadence, and retention.
- **Couchbase topology.** Set up buckets, Sync Gateway configurations, replication filters, and Couchbase Lite client behavior for the workload.
