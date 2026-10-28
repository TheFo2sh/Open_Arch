# PTC Creo on Amazon WorkSpaces Applications – EC2-based File Share for Users

This template models AWS's [PTC Creo on Amazon WorkSpaces Applications – EC2-based File Share for Users](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ptc-creo-deployment-options-on-aws/ptc-creo-deployment-options-on-aws.html) reference architecture. The source page was published March 24, 2022 and calls the streaming service Amazon AppStream 2.0 in the diagram; the current product name is Amazon WorkSpaces Applications.

## What it is for

Provide users with streamed PTC Creo design sessions. Users keep personal settings and files in per-user Amazon S3 folders, collaborate on CADs using a common SMB share hosted on Amazon EC2 and backed by Amazon EBS, then commit finalized CADs to PTC Windchill PLM.

## How it works

The source page's numbered flow describes:

1. Administrators use a Windows bastion host on EC2 to log on to instances in a private subnet.
2. An image-builder AMI is provisioned in a private subnet for generating the WorkSpaces Applications fleet image.
3. Global Creo License Manager instances on EC2 provide licenses as fleet instances are created; licenses are released when those instances are deprecated.
4. The WorkSpaces Applications fleet runs in private subnets in two Availability Zones. Users can connect to it on an on-demand or always-on basis.
5. Users connect to fleet instances using a web browser or the WorkSpaces Applications Windows Client.
6. An EC2-based file share backed by EBS provides a common SMB share for CAD collaboration before finalized designs are committed to the Windchill file vault.
7. The WorkSpaces Applications stack can use an Amazon S3 folder as each user's private folder for application settings, user data, and files.

The diagram also shows a VPC with a public and private subnet in Availability Zone 1, a private subnet in Availability Zone 2, an internet gateway, and a NAT gateway. The Windows bastion, image builder, license manager, and file share appear in Availability Zone 1; fleet instances span both Availability Zones.

## What the sources do not specify

- The operating system, Creo version, AMI contents, fleet sizing, instance types, or exact image-building procedure.
- The license-server configuration, license protocol, availability design, or number of license manager instances.
- The file server operating system and software, SMB authentication, share permissions, EBS volume layout, backups, or retention.
- The users' identity provider, authentication flow, network routes, NAT traffic, and security-group rules.
- How finalized CADs are moved from collaboration into Windchill, or the Windchill endpoint, protocol, authentication, and deployment.

The linked [PTC Windchill PLM on AWS PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/ptc-windchill-plm-on-aws.pdf?mfgr_ed3) describes a separate Windchill deployment. Its web servers, method servers, database, Solr index, monitoring, and network details are not part of this file-share diagram and are not modeled here.

## What teams usually customize

- **Windchill.** Map the external Windchill system slot to the project's PLM system, or leave it out if the project handles finalized CADs differently.
- **Compute and licensing.** Choose the operating system, instance sizes, fleet scaling and availability, Creo release, and license-manager design.
- **File sharing.** Specify the SMB server software, identity integration, access controls, storage layout, backup, and retention.
- **Network and identity.** Add the project's actual subnet, routing, security, and identity-provider design; the source only shows the high-level VPC layout and gateways.
- **User persistence.** Confirm which settings and files belong in S3 home folders and how they are retained.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ptc-creo-deployment-options-on-aws/ptc-creo-deployment-options-on-aws.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ptc-creo-deployment-options-on-aws/images/ptc-creo-deployment-options-on-aws.png)
- [Related, separate PTC Windchill PLM on AWS PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/ptc-windchill-plm-on-aws.pdf?mfgr_ed3)
