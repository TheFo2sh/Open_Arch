# AVEVA Unified Engineering Deployment on AWS

This M1Spec architecture template models [AWS's AVEVA Unified Engineering Deployment on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aveva-unified-engineering/aveva-unified-engineering.html), published April 5, 2022. The source assets are the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aveva-unified-engineering/images/aveva-unified-engineering-deployment-ra.png), the [architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aveva-unified-engineering/aveva-unified-engineering.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The architecture gives engineers secure virtual desktop access to AVEVA's Windows applications for process simulation and 1D, 2D, and 3D engineering and design. It combines multi-AZ Amazon WorkSpaces with EC2-hosted AVEVA server roles, Microsoft SQL Server, shared FSx storage, directory access control, and AWS Backup.

## How it works

The steps below follow the numbered flow in AWS's source page:

1. **AWS Directory Service** provides managed domain access control for engineers accessing the AVEVA applications through WorkSpaces.
2. Engineers use **Amazon WorkSpaces** virtual desktops.
3. Operations administrators log on to the private-subnet **Admin server** through a public-subnet **bastion host**.
4. **GPU-powered and CPU-based WorkSpaces** provide access to the Unified Engineering applications across two Availability Zones.
5. The **Integration server** hosts AVEVA middleware. **Elastic Load Balancing** distributes traffic across EC2 instances for resilience.
6. AVEVA stores data in **Microsoft SQL Server on Amazon EC2**; the diagram shows primary and secondary SQL Server deployments in separate Availability Zones.
7. **Amazon FSx for Windows File Server** replicates between two Availability Zones and stores AVEVA Dabacon databases and project files, accessed through SMB.
8. The bastion host lets administrators reach private-subnet servers for Active Directory administration, SQL administration, and service configuration.
9. **AWS Backup** backs up the AIS, Admin, and SQL Server EC2 instances, as well as Amazon EBS and Amazon FSx.

The diagram also shows a VPC, public and private subnets, an internet gateway, and NAT gateways. These are deployment context rather than application elements in this blueprint. The source does not define application-level request paths beyond the relationships described above.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon WorkSpaces, AWS Directory Service, Elastic Load Balancing, Amazon EC2, Amazon FSx for Windows File Server, Amazon EBS, AWS Backup |
| Slots | **AVEVA Unified Engineering**, mapped to the project's engineering system; **Unified Engineering users** and **Operations administrators**, mapped to project users |
| Containers | **Engineering desktop applications** (AVEVA Unified Engineering and Microsoft Windows); **Bastion host**, **Admin server**, **Integration server** (AVEVA middleware), and **AIS server** |
| Databases | **Engineering directory** on AWS Directory Service; **Primary SQL Server** and **Secondary SQL Server** on EC2; **AVEVA Dabacon databases and project files** on FSx |

## Assumptions and limits

- The source calls out GPU-powered and CPU-based WorkSpaces but does not specify their bundles, instance sizes, application assignment, or licensing.
- AWS does not specify the directory type or configuration, the Windows edition, the SQL Server version or edition, database replication/failover details, or the meaning of “AIS.”
- The source does not specify the integration middleware components, EC2 sizing, load balancer type, FSx deployment configuration, or backup schedule and retention.
- The diagram depicts network boundaries and gateways but does not supply CIDRs, routes, security-group rules, or detailed traffic paths. These remain deployment choices.
- The blueprint records the source's primary/secondary SQL Server and cross-AZ FSx replication without inferring their implementation details.
- This is an architecture template, not an AWS infrastructure deployment or a complete AVEVA installation guide.

## What teams usually customize

- **WorkSpaces and identity:** Choose desktop capacity, GPU/CPU configurations, Windows version, user assignment, and directory configuration.
- **Backend and data:** Confirm the AVEVA middleware and AIS components, choose SQL Server sizing and resilience settings, and configure FSx capacity and access.
- **Networking and operations:** Set VPC, subnet, routing, security, and load-balancer settings for the environment.
- **Protection:** Define AWS Backup selection, schedule, retention, and recovery requirements.
