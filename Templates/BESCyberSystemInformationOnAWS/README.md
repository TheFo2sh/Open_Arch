# BES Cyber System Information on AWS

A secure extension of a utility Operations Technology (OT) data center into AWS for ingesting and analyzing Bulk Electric System (BES) Cyber System Information (BCSI), based on the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/bes-cyber-system-information/bes-cyber-system-information.html), [diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/bes-cyber-system-information/images/bes-cyber-system-information.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/bes-cyber-system-information/bes-cyber-system-information.pdf#bes-cyber-system-information). AWS published the architecture on May 18, 2022. The broader [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) contains the source.

## What it is for

The design extends an OT environment into an isolated Amazon VPC for BCSI ingestion, contingency analysis, incident response, and advanced analytics. AWS presents it as an example supporting North American Electric Reliability Corporation Critical Infrastructure Protection (NERC CIP) compliance.

## How it works

The numbered steps follow the source page and diagram:

1. Utility generation facilities, substations, data centers, and customer locations supply data from OT systems and field assets. AWS shows operational systems such as OMS, DMS/ADMS, EMS, GIS, asset and meter management, SCADA, and data historians, as well as devices such as RTUs, meters, DERs, relays, IEDs, and cameras.
2. The OT network connects to AWS over VPN. AWS Direct Connect is an option for guaranteed bandwidth, with IEEE 802.1AE (MACsec) encryption.
3. **Management and governance (3A)** shows AWS Control Tower, AWS Config, AWS Organizations, AWS CloudTrail, Amazon CloudWatch, AWS Systems Manager, AWS CloudFormation, and AWS Backup. The page also names AWS Audit Manager. **Security, identity, and compliance (3B)** shows IAM, Directory Service, GuardDuty, KMS, Firewall Manager, Security Hub, and Audit Manager. AWS associates these controls with NERC CIP requirements 4 and 11.
4. The source lists AWS DMS, AWS Storage Gateway (File Gateway), AWS Transfer Family (labeled AWS SFTP in the diagram), and Amazon Kinesis as ingestion options. It says to route data flows to the VPC through VPC endpoints.
5. The VPC contains compute and relational database resources across two Availability Zones. Compute options are Amazon EC2, EKS, EMR, ECS, and Lambda; the page additionally names AWS Fargate for containerized applications. Database options are Amazon RDS and Amazon Aurora. Amazon SageMaker AI is shown for AI/ML analysis and assessment of BCSI. KMS encrypts compute resources and database data; GuardDuty monitors network traffic.
6. Amazon S3 provides the OT data lake, with raw and curated areas shown in the diagram. AWS Glue performs ETL and builds the data catalog. The page says to archive data in Amazon S3 Glacier and restrict access to the VPC using VPC endpoints.

AWS associates connectivity, governance, ingestion, compute, relational databases, and data lake storage with CIP 11.

## Assumptions and limits

- The page lists multiple ingestion, compute, and relational database choices; it does not prescribe that all options be deployed together. The blueprint represents them as choices, not a single required deployment.
- The diagram labels a third-party ML/analytics element but gives no vendor, product, role, or data flow. The blueprint keeps it as an unmapped system slot and does not infer a connection to SageMaker or other services.
- AWS does not specify the OT protocols, transfer formats, ingestion configuration, analytics applications or algorithms, database engines, data schemas, VPC topology, endpoint types, regions, retention periods, or IAM policies. These details are left open.
- AWS says to use Direct Connect with MACsec for guaranteed bandwidth and also describes VPN connectivity; it does not define a customer's redundancy or failover design.
- The blueprint uses `database` elements for S3 data areas, the Glue catalog, relational databases, and archived data because the template format has no separate object-store or dataset element. Compute and user roles are not named by the source, so no additional workload or user slots are invented.
- The diagram's lock icons indicate encryption; the page specifically names KMS for compute resources, relational databases, and data lake data. The blueprint does not add other encryption mechanisms or compliance controls.

## What teams usually customize

- Map the utility OT system slot and third-party ML/analytics slot to the actual systems and providers, or omit the third-party option if it is not used.
- Select the connectivity and ingestion path, including bandwidth, MACsec, VPN, and the appropriate file, database, or streaming mechanism.
- Choose compute and database services, define the analytics workloads, and specify how raw, curated, cataloged, and archived data are structured and retained.
- Define the VPC, subnets, endpoints, regions, access policies, encryption-key policies, monitoring, governance, and NERC CIP evidence requirements for the actual environment.
