# Amazon Relational Database Service on AWS Outposts

This template follows the AWS [Amazon RDS on AWS Outposts reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-rds-on-aws-outposts/amazon-rds-on-aws-outposts.html), published January 12, 2021. The linked [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/amazon-rds-on-aws-outposts/amazon-rds-on-aws-outposts.pdf) contains the same diagram. This is an architecture blueprint, not an infrastructure deployment.

## What it is for

Run an Amazon RDS database on AWS Outposts at a customer site while retaining connectivity to the parent AWS Region for management, backups, restore, and metrics.

## How it works

The diagram has an AWS Region and a corporate data center containing AWS Outposts. A VPC includes an application workload in a regional subnet and an Outposts application workload. RDS on Outposts creates an Elastic Network Interface (ENI) in a DB subnet group that includes a subnet associated with the Outpost. Regional and Outposts applications in the VPC connect to the database using its RDS endpoint; on-premises applications reach it through the Outposts Local Gateway's Direct VPC connection.

The source's numbered steps describe:

1. Establish a secure connection between Outposts and its parent Region using AWS Direct Connect or a VPN. The database continues running during a connection interruption, but API calls and management tasks are unavailable until connectivity returns.
2. Create a DB subnet group containing an Outposts-associated subnet. Customer-owned IP addresses are also available.
3. Create a supported RDS on Outposts instance through the AWS Management Console or APIs. RDS creates an ENI in the selected DB subnet group. The source lists MySQL and PostgreSQL engines and `db.m5` and `db.r5` instances.
4. Use automated backups or manual snapshots. Snapshots and transaction logs are stored in the AWS Region. Automatic backups default to seven days; retention can be set from one to 35 days.
5. Connect applications in the same VPC, either in the Region or on Outposts, using the RDS endpoint. On-premises applications use the Outposts Local Gateway Direct VPC connection.
6. Restore the database in the parent Region from a snapshot of the Outposts instance for disaster recovery.
7. Use the CloudWatch metrics supported for AWS Outposts.

## Assumptions and unspecified details

- The diagram shows generic application instances in regional and Outposts subnets and generic on-premises servers. Their products, responsibilities, protocols, and data flows are not specified; the blueprint represents them as system slots.
- The source supports MySQL and PostgreSQL but does not choose an engine, instance class, IP addressing scheme, security configuration, subnet sizing, or database availability topology.
- AWS Direct Connect appears in the diagram; the prose also permits a VPN but does not identify a VPN provider or implementation. The model uses Direct Connect and documents VPN as an alternative rather than inventing a specific VPN service.
- The diagram includes AWS Key Management Service but does not describe an encryption or key flow. It is included without an inferred relationship.
- The source does not define the exact backup schedule beyond the default and allowed retention periods, restore procedure details, monitoring configuration, or behavior of application workloads during a Region disconnection.
- AWS's provisioning text refers to the console and APIs; it does not identify which APIs or command-line tooling. These control-plane options are not modeled as runtime components.
- The source describes no required third-party product or human actor.

## What teams usually customize

- Map the regional, Outposts, and on-premises application slots to the actual systems in the project.
- Select the database engine, instance class, backup retention, and disaster-recovery objectives.
- Choose Direct Connect or a VPN and define the network, IP, routing, security, and availability configuration.
- Specify the key-management, encryption, monitoring, and application-to-database details appropriate to the deployment.
