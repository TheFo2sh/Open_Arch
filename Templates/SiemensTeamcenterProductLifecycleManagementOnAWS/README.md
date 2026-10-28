# Siemens Teamcenter Product Lifecycle Management on AWS

An AWS reference architecture for deploying Siemens Teamcenter with separate test and production environments, Active Workspace, visualization, and high availability.

**Sources**

- [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-teamcenter-plm/siemens-teamcenter-plm.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-teamcenter-plm/images/siemens-teamcenter-ra.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/siemens-teamcenter-plm/siemens-teamcenter-plm.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The design places Teamcenter on Amazon EC2 for high availability. Separate test and production URLs resolve through Amazon Route 53 to Application Load Balancers and the Teamcenter web tiers. A production stack spans Availability Zones and has a standby stack. Customer data-center users can reach the environments over Direct Connect, VPN, or HTTPS.

## How it works

1. End users connect to the test or production Teamcenter URL over HTTPS. Amazon Route 53 resolves each URL.
2. The corresponding Application Load Balancer routes requests to the Teamcenter web tier on Amazon EC2.
3. The web tier forwards requests to the Teamcenter Enterprise tier, which interacts with other Teamcenter servers and the PLM database.
4. Amazon RDS stores structured PLM data. AWS names Oracle and Microsoft SQL Server as alternatives, without selecting an engine.
5. The Teamcenter File Management System stores and retrieves files from Amazon EBS, Amazon EFS, or Amazon FSx for NetApp ONTAP. The diagram labels EBS as non-HA.
6. Teamcenter services include Active Workspace, Apache Solr, and Deployment Center. The diagram also shows a visualization server, Dispatcher, and Application Integration server.
7. Teamcenter license server instances provide high availability. The page's prose specifies three Availability Zones; the diagram depicts active and standby license-server groups across two illustrated Availability Zones.
8. Customer data-center users access the environments through Direct Connect, VPN, or HTTPS. The diagram also shows customer-side FMS client cache, CAD licensing, and a third-party license server.
9. IT teams access the environment through VPN using RDP, Amazon WorkSpaces Applications, or AWS Systems Manager. The diagram shows an RDP server/jumpbox and a separate managed-plane VPC connected by VPC peering.
10. AWS Directory Service, hosted on AWS or on premises, provides administrator authentication.
11. A monitoring server on Amazon EC2 monitors systems, networks, and infrastructure.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Route 53, VPCs and VPC Peering, Internet and VPN gateways, Elastic Load Balancing, EC2, RDS, EBS, EFS, FSx for NetApp ONTAP, Direct Connect, Site-to-Site VPN, Directory Service, Systems Manager, WorkSpaces Applications |
| System slots | **Teamcenter Product Lifecycle Management**, **Siemens license service**, **Operations management**, and **Customer data-center services** |
| User slots | Test and production users, data-center users, and IT support |
| Teamcenter services | Test, production, and standby environments with web, enterprise, FMS, Active Workspace, Solr, Deployment Center, visualization, Dispatcher, and Application Integration |
| Databases | Test, production, and standby PLM databases on Amazon RDS |

## Assumptions and details not specified by AWS

- The page does not choose Oracle versus SQL Server, identify exact versions or sizing, or describe the database replication/failover configuration. The three database elements denote the test, production, and standby environments shown in the diagram, not a prescribed RDS topology.
- AWS names EBS, EFS, and FSx for NetApp ONTAP as storage options; the consuming team chooses the appropriate option and configures its availability and recovery. No database engine or file-storage choice is implied.
- The prose says license servers span three Availability Zones, while the diagram shows two illustrated Availability Zones with active and standby groups. The template retains both statements rather than inferring a third-zone layout.
- The source does not identify the CAD or third-party license-server products, Teamcenter component versions, server counts, instance sizes, or detailed network/security settings. Those customer-owned services are described as unspecified slots, not assigned invented vendors or products.
- The exact on-premises directory implementation is not specified; the blueprint models the AWS Directory Service option. The source also permits an on-premises directory.
- VPC boundaries, VPC peering, the internet gateway, and the virtual private gateway are represented, but subnet placement, security groups, NAT gateways, IP ranges, VPN routing, and the precise access/authentication policies remain infrastructure and deployment decisions.

## What teams usually customize

- Map the system and user slots to the project's existing Teamcenter, operations, customer data-center systems, and user groups—or leave unused slots out.
- Choose Oracle or SQL Server for RDS and select EBS, EFS, or FSx for NetApp ONTAP for file management.
- Set Availability Zone count, database and license-server failover, backup/restore, capacity, and production/test isolation to the required service levels.
- Select the customer directory and license-server implementations, network connectivity, administrator access method, monitoring product, and security policies.
- Add the infrastructure details omitted from this logical template, such as VPC/subnet layouts, security groups, routing, and instance configuration.
