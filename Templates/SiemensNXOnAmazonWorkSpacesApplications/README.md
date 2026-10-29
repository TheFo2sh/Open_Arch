# Siemens NX on Amazon WorkSpaces Applications

An AWS reference architecture for streaming Siemens NX, based on AWS's [Siemens NX on Amazon WorkSpaces Applications](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/siemens-nx-appstream.html) architecture diagrams, [two-page PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/siemens-nx-appstream/siemens-nx-appstream.pdf), and [reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS documents three deployment options: [EBS shared folders](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/snxa-ebs-shared-folders.html) ([diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/images/siemens-nx-architecture-diagram-ra-1.png)), [Siemens Teamcenter with FSx](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/snxa-teamcenter-fsx.html) ([diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/images/siemens-nx-architecture-diagram-ra-2.png)), and [multi-Region storage replication](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/snxa-multi-region.html) ([diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-nx-appstream/images/siemens-nx-architecture-diagram-ra-3.png)).

## What it is for

This template captures AWS's options for delivering Siemens NX as a streamed application. The blueprint shows all three source architectures as alternatives, not as components intended to be deployed together.

## How it works

### Amazon EBS shared folders

1. An image builder can select an Amazon S3 folder as the user's home folder to persist application settings, user data, and files.
2. An EC2 instance hosts an Amazon EBS volume and serves it to WorkSpaces Applications users as an SMB shared folder.
3. A Windows RDP instance in a public subnet acts as a jump server to reach the EC2 file server in a private subnet. The diagram also shows an internet gateway, a NAT gateway, and private WorkSpaces Applications subnets across two Availability Zones; AWS does not describe additional traffic flows for those network resources.
4. Users connect to their streaming instances through a web browser or the WorkSpaces Applications Windows client.

### Siemens Teamcenter with Amazon FSx

1. AWS Directory Service for Microsoft Active Directory manages users, computers, and storage as Amazon FSx. WorkSpaces Applications joins the configured domain, and authorized directory users can access sessions.
2. Amazon FSx replicates across multiple Availability Zones and is available in a streaming session. Active Directory Group Policy can configure user and shared folders.
3. Active Directory SAML 2.0 federation with Auth0 provides single sign-on.
4. Siemens NX communicates with Siemens Teamcenter in another VPC through VPC peering.

### Multi-Region deployment

1. Each Region has two Amazon EC2-hosted Microsoft Active Directory instances in separate Availability Zones. Active Directory replicates across Availability Zones and Regions through Active Directory sites.
2. Each Region has two single-Availability-Zone Amazon FSx file systems. Data replicates bidirectionally using Microsoft Distributed File System Replication.
3. WorkSpaces Applications image builders are shared across Regions. Administrators tune each image to use its closest Active Directory and Amazon FSx resources.

## Assumptions and limits

- The source does not identify AWS Regions, account layout, VPC ranges, subnet sizing, security-group rules, IAM permissions, EC2 instance types, WorkSpaces Applications fleet sizes, Siemens NX version or licensing, storage capacity/performance, or backup and recovery policies. This template does not invent them.
- In the Teamcenter option, AWS does not specify the compute platform, deployment details, or version for Siemens Teamcenter. It is shown as a system slot connected through the documented separate VPC; the VPC peer's configuration is also unspecified.
- AWS identifies Auth0 and SAML 2.0 for federation but does not provide tenant settings, trust metadata, or identity lifecycle details.
- In the multi-Region option, the source names Microsoft Distributed File System Replication but does not specify where its software runs or the file-system configuration. The blueprint describes the replication relationship without assigning a host.
- The source diagrams include file storage, not databases; the template intentionally does not create database elements for EBS or FSx.
- Systems and the user are M1Spec slots to map onto a project's own systems and users. Services in different zones are mutually exclusive architecture alternatives in the source.
- This is an architecture template, not an AWS infrastructure deployment.

## What teams usually customize

- Select the deployment option and AWS Regions, then define the VPCs, subnets, routes, security policies, and peering configuration for the environment.
- Choose WorkSpaces Applications fleet, image-builder, capacity, and client settings; install and license the required Siemens NX version.
- Set up S3 home folders or EBS-backed SMB shares, or configure FSx and Active Directory access policies to suit the organization's storage needs.
- For Teamcenter, identify the existing Teamcenter deployment and configure VPC peering and Auth0/Active Directory federation.
- For multi-Region use, choose replication, failover, data-residency, and recovery policies; AWS's diagram does not define them.
