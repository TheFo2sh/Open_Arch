# AWS Distributed Perforce Architecture

An importable M1Spec blueprint based on AWS's [AWS Distributed Perforce Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-distributed-perforce-architecture/aws-distributed-perforce-architecture.html) reference diagram ([PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aws-distributed-perforce-architecture/aws-distributed-perforce-architecture.pdf)). AWS describes a hybrid, multi-Region deployment of the third-party Perforce Helix Core service.

## What it is for

Distributing Perforce Helix Core close to developers while keeping a primary commit service, a standby in a separate Availability Zone, and Edge Servers in the primary and secondary AWS Regions. The diagram also shows an on-premises Edge Server, remote-user access, and optional AWS virtual workstations.

## How it works

1. The corporate data center connects to the primary AWS Region using AWS Direct Connect or AWS Site-to-Site VPN. AWS Transit Gateway provides hub-and-spoke connectivity between VPCs and on-premises networks.
2. Perforce uses a commit-edge topology. The primary commit server and standby run in separate Availability Zones; Edge Servers serve local operations and synchronize with the commit service, including from the secondary Region.
3. Remote users can connect with AWS Client VPN or work from virtual workstations on AWS. NAT gateways let private-subnet instances initiate connections to services outside their VPC; those external services cannot initiate connections back to the instances.
4. For depots smaller than 16 TB, AWS recommends Amazon EBS gp3. For depots larger than 16 TB, it recommends Amazon EFS, with EFS Standard-Infrequent Access as a cost optimization. AWS Backup handles EFS backups; EBS snapshots are the standard backup mechanism when using EBS only.
5. Perforce Edge Server high availability depends on recovery point and recovery time objectives. AWS notes that restoring from an EBS snapshot is slower but more cost-effective.

## What applying it brings

| | |
|---|---|
| Zones | Primary and secondary AWS Regions, plus a corporate data center zone |
| Platforms | Amazon VPC, EC2, NAT Gateway, Transit Gateway, Direct Connect, Site-to-Site VPN, Client VPN, EBS gp3, EFS and AWS Backup |
| Slots | In-office developer, remote developer, and Perforce server roles in the corporate data center and AWS Regions |
| Containers | Perforce Helix Core commit, standby, Edge Server and client roles |
| Databases | Perforce server state on EBS and an alternative EFS-hosted depot for depots larger than 16 TB |

## Assumptions and details not specified by AWS

- The blueprint names the primary and secondary Regions and two Availability Zones in each, but AWS does not specify Region names, VPC/subnet CIDRs, instance types, server sizing, or detailed routing and security-group rules.
- The source diagram labels root, metadata and logs on server storage and shows a depot on EFS Infrequent Access. AWS's accompanying text describes EBS gp3 for depots below 16 TB and EFS above 16 TB. The blueprint models these as storage choices, not as simultaneous requirements; choose one for the depot based on its size.
- AWS does not identify the corporate data center's compute or storage products, the Perforce license/edition, replication settings, or recovery objectives. These are deliberately left unspecified.
- AWS presents Direct Connect and Site-to-Site VPN as alternative corporate connections and Client VPN and virtual workstations as remote-access options. The blueprint includes both choices without assuming they must be deployed together.
- The template describes an architecture only; it does not deploy or configure AWS infrastructure.

## What teams usually customize

- Select AWS Regions, Availability Zones, network layout, connectivity, instance sizing and access controls.
- Choose EBS gp3 or EFS for the depot based on depot size, and define backup, restore, RPO and RTO policies.
- Decide which commit and Edge Server roles to deploy, whether Edge Server HA is required, and how Perforce licensing, replication and client access are configured.
