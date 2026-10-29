# Open edX on AWS

A high-availability Open edX reference deployment on AWS, based on AWS's [Open edX on AWS architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-edx-for-high-availability-on-aws/open-edx-for-high-availability-on-aws.html), published April 14, 2023. This template models the architecture; it does not deploy AWS resources.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-edx-for-high-availability-on-aws/open-edx-for-high-availability-on-aws.html).
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/open-edx-for-high-availability-on-aws/images/open-edx-for-high-availability-on-aws.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/open-edx-for-high-availability-on-aws/open-edx-for-high-availability-on-aws.pdf#open-edx-for-high-availability-on-aws).
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The architecture supports an Open edX learning platform with independently scalable user-facing and API backend tiers, multi-AZ data services, static mobile frontend delivery, and email to students.

## How it works

The numbered flow follows the AWS page and diagram:

1. **Route 53** directs students toward nearby **CloudFront** locations for static content.
2. **AWS Certificate Manager** manages certificates for secure communication with public and private resources. The diagram does not specify certificate deployment details.
3. **CloudFront** serves stateless Open edX mobile frontend assets stored in **S3**. The source names instructor reports, learner accounts, and payment/card-access frontends; it does not identify a payment processor.
4. An **Application Load Balancer** scales with student traffic, terminates HTTPS, and routes requests to application target groups.
5. A **bastion host** provides administrator access to platform components. A **NAT gateway** provides a path from private subnets to Open edX code repositories.
6. The user-facing **CMS**, **LMS**, and **Insights** backend applications run on **EC2** and are reached through the Application Load Balancer.
7. The **Notes**, **Forums**, and **Blockstore** API backend services also run on EC2 and are reached through the load balancer.
8. **MongoDB** stores Open edX document data in a replicated cluster with one primary and two secondary nodes. The secondaries provide quorum to select a new primary if the current primary fails.
9. A **Network Load Balancer** selects a target and opens a TCP connection for the MongoDB path.
10. **ProxySQL** provides one MySQL-compatible endpoint, routing writes to the **Aurora** cluster endpoint and reads to its reader endpoint.
11. **ElastiCache for Redis and Memcached** provide managed cache/state services with nodes distributed across Availability Zones.
12. **Aurora MySQL** stores relational workloads for Open edX.
13. **Amazon OpenSearch Service** provides the search service.
14. **S3** stores active learning assets, server logs, and archived material, in addition to the mobile frontend assets.
15. **Amazon SES** sends student email through Open edX's SMTP integration.

## Assumptions and details not specified

- The reference is dated April 2023. It depicts AWS Availability Zones, public/private subnets, Auto Scaling groups, and a separate MongoDB secondary node, but does not define instance sizes, capacity, subnet CIDRs, exact group boundaries, or a deployable network configuration.
- AWS describes each user-facing and API application as eligible for its own Auto Scaling group or shared groups. The blueprint groups the named applications into two tiers and does not prescribe group membership.
- The source does not assign cache keys or application state to Redis versus Memcached, specify Aurora replica counts, or define database backup, retention, or failover settings.
- The source names Open edX code repositories but not their hosting provider. They are represented as an external system without assuming a vendor.
- The diagram's TLS/HTTPS description is not a guarantee of regulatory compliance. Security controls, IAM, certificate configuration, and compliance scope are for the adopting team to determine.

## What teams usually customize

- Choose EC2 sizing, Auto Scaling boundaries, subnet and Availability Zone layout, and bastion access controls.
- Configure MongoDB and Aurora topology, ProxySQL health/failover behavior, and which state belongs in Redis or Memcached.
- Set S3 lifecycle, retention, encryption, and access policies for mobile frontend assets, learning assets, archives, and logs.
- Configure OpenSearch, SES/SMTP, TLS certificates, and any payment or email-provider integrations required by the deployment.
