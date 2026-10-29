# iMDSoft MetaVision Suite on AWS

This template models AWS's [iMDSoft MetaVision Suite on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/imdsoft-metavision-suite-on-aws/imdsoft-metavision-suite-on-aws.html), including its [diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/imdsoft-metavision-suite-on-aws/images/imdsoft-metavision-suite-on-aws.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/imdsoft-metavision-suite-on-aws/imdsoft-metavision-suite-on-aws.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The AWS reference describes MetaVision ICU for adult, neonatal, and pediatric intensive care and MetaVision OR for anesthesia and operating theatres.

## What it is for

The architecture supports hospital clinicians using MetaVision while integrating bedside medical devices and other hospital systems. It combines redundant AWS Direct Connect connectivity, multi-AZ EC2 application and integration tiers, SQL Server high availability, a reporting replica, and Emergency Data Access (EDA) workstations for local continuity.

## How it works

1. Clinicians use Citrix client workstations to access MetaVision. Bedside devices communicate with the MetaVision Integration Engine (MVIE) through a serial server. EDA workstations provide a local access path if connectivity is lost.
2. Hospital sites connect to AWS using redundant AWS Direct Connect links. The reference specifies TLS encryption for data in transit.
3. MetaVision application servers with Citrix run on Amazon EC2 across multiple Availability Zones.
4. MVIE runs on Windows Server EC2 instances across multiple Availability Zones in a Windows Server Failover Cluster. It integrates bedside devices and hospital clinical and administrative systems.
5. The MetaVision database runs on SQL Server on EC2. SQL Server Always On Failover Cluster Instances provide high availability across Availability Zones.
6. A separate, standalone SQL Server replica on EC2 serves reporting and the EDA data-distribution role. The diagram shows asynchronous replication from the high-availability database to this replica.
7. Amazon FSx for Windows File Server supplies shared SQL Server storage and a file-share witness for the failover cluster.
8. SQL Server transactional replication continuously synchronizes the on-premises EDA workstations.

The AWS diagram depicts the application, MVIE, and clustered database tiers in multiple Availability Zones, with the standalone reporting and EDA replica in a separate Availability Zone. The blueprint keeps the application, integration, primary/standby database, reporting replica, shared SQL storage, and cluster witness as distinct elements.

## Assumptions and details not specified

- The AWS reference is for guidance, not a deployable infrastructure definition. It does not specify an AWS Region, VPC/subnet layout, Direct Connect circuit details, instance sizing, or detailed security configuration.
- The source does not identify Citrix products or versions, Windows Server editions, SQL Server versions or editions, or the exact failover and replication settings. TLS is named without a version.
- The serial-server vendor/model, bedside-device models, and the products behind the hospital clinical and administrative systems are not identified.
- EDA workstations are shown as an on-premises continuity path, but their local data-store design and the exact behavior during a connectivity outage are not described.
- The diagram depicts shared SQL storage and a file-share witness on Amazon FSx for Windows File Server. The blueprint does not infer a storage topology, sizing, or recovery policy beyond those roles.

## What teams usually customize

- Set the AWS network, Region, Availability Zone placement, EC2 sizing, and redundant Direct Connect design for the hospital environment.
- Confirm Citrix and MetaVision versions, the device serial-server implementation, and interfaces to clinical and administrative systems.
- Choose SQL Server editions and configure the FCI, witness, shared storage, asynchronous reporting replication, and transactional EDA synchronization.
- Define TLS versions, endpoint security, permissions, monitoring, backup, and the operational behavior of EDA workstations.
