# AMOS Implementation on AWS

An AWS reference architecture for running the Aircraft Maintenance and Engineering Operating System (AMOS) for airline maintenance, repair, and overhaul (MRO) workloads. This template follows AWS's [AMOS Implementation on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amos-implementation/amos-implementation.html), published April 19, 2022. The page links to the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amos-implementation/images/aws-reference-architecture-migration-airlines-amos-ra.png).

## What it is for

The design moves AMOS from on-premises infrastructure to a resilient AWS deployment, with production and failover application and database instances in separate Availability Zones. It is an architecture template, not deployable AWS infrastructure.

## How it works

1. An Amazon VPC contains private subnets in two Availability Zones. The production AMOS application and database run in the first; their failover instances run in the second.
2. The AMOS application and database each replicate to their standby instance. AWS says to use AMOS's native application solution and the selected database engine's native replication tools. AMOS is not designed for load-balanced environments. During application failover, the primary Elastic Network Interface is remapped to the standby EC2 instance.
3. Remote users and administrators get HTML5 browser access through Amazon AppStream 2.0. AWS Directory Service provides user authentication, and Amazon Route 53 provides DNS translation. If direct access is required, users connect through a secure channel using AWS Client VPN with AWS Direct Connect.
4. Amazon S3 stores AMOS application binaries, database devices, web drivers, and backups. Amazon CloudWatch monitors servers and the ecosystem, and AWS Systems Manager manages EC2 operating system patches.

## Assumptions and unspecified details

- AWS names SAP Adaptive Server Enterprise (ASE), Oracle Database Standard Edition and Enterprise Edition, and PostgreSQL as AMOS-supported database options, but does not select an engine for this architecture. The template therefore models databases without choosing an engine.
- AWS does not identify the AMOS software vendor or release, nor specify the database replication configuration, application replication mechanism beyond the AMOS-native solution, or the Elastic Network Interface remapping procedure.
- The source does not specify instance sizes, subnet CIDRs, VPC routing, security groups, Availability Zone names, AppStream fleet configuration, Directory Service type, Route 53 records, Client VPN authentication settings, Direct Connect topology, S3 bucket layout or retention, monitoring alarms, or patch baselines. These are intentionally not modeled.
- The blueprint separates EC2 application and database instances to match the diagram. The primary-to-standby and application-to-database relationships represent the documented deployment roles, not a prescribed protocol or configuration.
- AWS says to use Client VPN with Direct Connect but does not detail their network topology. Their relationship in the blueprint represents this stated pairing, not a detailed connectivity design.

## What teams usually customize

- Select one of the AMOS-supported database engines and document its version, replication mode, and recovery procedures.
- Map the primary and standby AMOS system slots and the user slots to the project's own domain systems and users.
- Specify the VPC, subnets, instance sizing, routing and security controls, AppStream configuration, authentication and DNS details, and Direct Connect/Client VPN topology.
- Define backup retention and recovery, CloudWatch metrics and alarms, and Systems Manager patch baselines to meet operational requirements.
