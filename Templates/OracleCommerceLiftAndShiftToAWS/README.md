# Oracle Commerce Lift-and-Shift to AWS

A high-availability lift-and-shift blueprint for Oracle Commerce in one AWS Region and VPC across multiple Availability Zones. It preserves the partner-supported Oracle RAC production database boundary and does not replace it with an AWS-managed database.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-commerce-lift-shift/oracle-commerce-lift-shift.html), which redirects to the [Oracle Commerce Lift-and-Shift chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-commerce-lift-shift/oracle-commerce-lift-shift-chapter.html).
- The chapter's [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/oracle-commerce-lift-shift/images/oracle-commerce-lift-shift.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/oracle-commerce-lift-shift/oracle-commerce-lift-shift.pdf#oracle-commerce-lift-shift-chapter).
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).
- AWS's [further reading on running Oracle RAC on Amazon EC2 using FlashGrid](https://www.flashgrid.io/oracle-rac-on-aws/). AWS does not state that FlashGrid is the selected partner solution in this architecture.

## What it is for

The reference describes moving an existing Oracle Commerce ecommerce workload from on-premises to AWS as a first step toward modernization. It uses multiple Availability Zones for production resilience, availability, and performance.

## How it works

1. The deployment occupies one AWS Region and one VPC. The diagram depicts two Availability Zones, public and private subnets, NAT gateways, bastion hosts, and an internet gateway.
2. An AWS Partner solution runs the production workload on Oracle RAC. The diagram also shows an Oracle Endeca cluster; AWS does not describe its role or interactions in the numbered flow.
3. Elastic Load Balancing distributes network traffic across Availability Zones to the Oracle Commerce cluster.
4. Amazon CloudFront provides a secure, programmable CDN; AWS WAF protects the ecommerce website, and Amazon Route 53 provides DNS.
5. Amazon ElastiCache for Redis provides application caching. Amazon EFS provides shared file storage mounted by every Oracle Commerce instance.
6. Amazon CloudWatch provides application logging, monitoring, and alarms.

The blueprint depicts the website, edge services, load balancing, application and Endeca clusters, RAC database, cache, shared file storage, and CloudWatch relationships. The VPC, subnets, Availability Zones, NAT gateways, and bastion hosts are deployment/network details; the schema has no corresponding subnet or host element. NAT gateways are retained as a platform entry, but their egress consumers are not inferred.

## Assumptions and details not specified

- The source prose says “multiple” Availability Zones; the diagram depicts two. The blueprint groups them in one logical AWS zone because the template schema has no Availability Zone element.
- AWS specifies a partner-supported Oracle RAC database and links FlashGrid as further reading. It does not name the partner or confirm that FlashGrid is deployed. Oracle RAC is modeled as a third-party production database on compute, not as RDS; FlashGrid is cataloged only as cited further reading.
- AWS does not specify instance sizes, cluster counts, Oracle Commerce or Endeca versions, RAC storage/configuration, failover procedures, cache contents or policy, network routes, bastion access, or security rules.
- The diagram labels an Oracle Endeca cluster and shows it connected to the Oracle Commerce cluster and RAC database, but the prose does not explain the exact function or data flow. The relationships are therefore labeled only as connections.
- CloudWatch's logging, monitoring, and alarm functions are documented, but AWS does not identify all telemetry sources or alarm definitions.
- The blueprint is an architecture template, not deployable AWS infrastructure. It does not provision VPC resources, partner software, Oracle licenses, or database configuration.

## What teams usually customize

- Map the Oracle Commerce and shopper slots to the project's own system and user.
- Select the AWS Partner and Oracle RAC implementation, then specify the RAC storage, licensing, availability, and recovery design.
- Define the VPC, subnet and routing layout, NAT egress, bastion access, security controls, and number of Availability Zones.
- Confirm whether Oracle Endeca is part of the target workload and document its actual integration with Oracle Commerce and RAC.
- Set CloudFront, WAF, DNS, ElastiCache, EFS, and CloudWatch configuration and operating policies.
