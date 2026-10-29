# Telecom Charging (OCS/CHF) on AWS Outposts

An M1Spec architecture template based on AWS's [Telecom Charging (OCS/CHF) on AWS Outposts reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/telecom-charging-ocs-chf-on-aws-outposts/telecom-charging-ocs-chf-on-aws-outposts.html), published December 15, 2022.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/telecom-charging-ocs-chf-on-aws-outposts/telecom-charging-ocs-chf-on-aws-outposts.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/telecom-charging-ocs-chf-on-aws-outposts/images/telecom-charging-ocs-chf-on-aws-outposts.png)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/telecom-charging-ocs-chf-on-aws-outposts/telecom-charging-ocs-chf-on-aws-outposts.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The pattern places an Online Charging System (OCS) / Charging Function (CHF) close to a telecom operator's core network on AWS Outposts. AWS identifies low-latency requirements and data residency regulations as example drivers; this template does not assert regulatory compliance or a specific latency guarantee.

## How it works

1. 4G/5G devices reach the operator's data centers through the Radio Access Network (RAN), where the core network connects to charging through the Outposts Local Gateway.
2. Two physically isolated data-center sites each have an AWS Outposts rack and a local charging path.
3. The two Outposts racks are homed to different Availability Zones in their parent AWS Region.
4. An Outposts service link carries Outposts management and Region-to-Outposts VPC traffic. The customer can use an existing internet connection or AWS Direct Connect.
5. Online charging can run on Amazon EKS and Amazon EC2 on Outposts, with an active-active deployment across the two sites.
6. Vendor-supported databases run on EC2 and replicate near real time to support high availability.
7. Outposts applications can securely integrate with regional applications such as the Business Support System (BSS), and use regional services including Amazon CloudWatch and AWS CodeCommit. The diagram also shows Amazon S3, but AWS does not describe its role in the charging flow.

## What applying it brings

| | |
|---|---|
| Zones | CSP network; two CSP data-center sites; AWS Region |
| Platforms | AWS Outposts, Outposts Local Gateway, Amazon EKS, Amazon EC2, Amazon VPC, AWS Direct Connect, Amazon CloudWatch, AWS CodeCommit, Amazon S3 |
| Slots | 4G/5G network devices, RAN, each data center's 5G Core, the regional BSS, and OCS/CHF workload placements |
| Databases | Vendor-supported charging database on EC2 at each site |

## Assumptions and details AWS does not specify

- This is a logical architecture template, not an AWS deployment, network configuration, or compliance assertion.
- Site 1 and site 2 are labels for the two physically isolated sites in the diagram. Their actual locations, Region, Availability Zones, VPC/subnet configuration, and network addresses are not prescribed.
- The source allows charging workloads on EKS and EC2 but does not assign specific OCS/CHF functions to either runtime or state whether both run concurrently. The workload slots describe deployment contexts, not four separate charging products; map or consolidate them to the project's actual system(s).
- AWS does not identify the database vendor, database engine, replication mechanism, direction, consistency guarantees, or failover behavior. The blueprint shows one database per site and a replication relationship without asserting its topology.
- The diagram includes local routers and customer gateways, but AWS does not specify their vendors, configuration, routing, or security policies. Internet and Direct Connect are alternative service-link transports, not requirements to deploy both.
- AWS does not describe the BSS product or the applications' specific CloudWatch and CodeCommit workflows. Amazon S3 is visible in the diagram, but its charging-system use is not explained.
- The architecture is intended for workloads close to the operator core when low latency or data residency is needed. Actual latency, data location, and any regulatory requirements must be assessed separately.

## What teams usually customize

- Map the RAN, 5G Core, BSS, devices, and charging workload slots to the project's real systems; choose how its charging software is split between EKS and EC2.
- Select the Outposts sites, parent Region and Availability Zones, VPC/subnets, service-link transport, local-gateway routing, and customer network equipment.
- Choose and configure the vendor-supported database, replication and failover strategy, and the required consistency and recovery objectives.
- Define the regional BSS integration, CloudWatch observability, CodeCommit use, security controls, and any role for Amazon S3.
