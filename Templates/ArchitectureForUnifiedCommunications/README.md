# Architecture for Unified Communications

An Avaya Aura Unified Communications deployment on AWS, based on AWS's [Architecture for Unified Communications](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/architecture-unified-communications/architecture-unified-communications.html) (published November 1, 2021). The source page links the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/architecture-unified-communications/images/architecture-unified-communications.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/architecture-unified-communications/architecture-unified-communications.pdf).

## What it is for

This template describes hybrid access to an Avaya Aura UC platform hosted on EC2. Corporate users reach it through AWS Direct Connect or AWS Site-to-Site VPN; remote workers connect over the public internet. Avaya Aura roles are distributed across two Availability Zones for high availability.

## How it works

The AWS numbered flow describes:

1. Corporate-network users register UC applications and devices through Direct Connect or Site-to-Site VPN.
2. Remote workers connect UC applications and devices over the public internet.
3. UC devices and soft clients pull configuration from Avaya Aura Device Services (AADS) on EC2.
4. Sessions enter through one of the Session Border Controllers (SBCs), managed by the Element Management System (EMS).
5. Session Managers handle user authentication and session management under Avaya Aura System Manager.
6. Communication Manager provides telephony features and uses Media Servers for digital signal processing (DSP) resources.
7. Amazon WorkSpaces provides a simplified bastion host for management activities.
8. AWS Directory Service provides the unified directory for user creation.
9. Avaya Aura roles are distributed across two Availability Zones for high availability.

The diagram also shows a VPC with control, public, and private subnets, an Internet Gateway, Amazon Route 53, and the public switched telephone network. The blueprint captures the VPC, gateway, and connectivity services; it does not infer a Route 53 routing rule or a PSTN call path that the numbered flow does not describe.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Cloud**, on the AWS platform |
| Platforms | Amazon VPC, Internet Gateway, EC2, Direct Connect, Site-to-Site VPN, Route 53, WorkSpaces, AWS Directory Service |
| Slots | **Corporate users**, **Remote workers**, **UC administrators**, **Corporate network**, **Public internet**, **Public switched telephone network**, **Unified communications applications and devices** |
| System | **Avaya Aura Unified Communications**, hosted on EC2 |
| Containers | AADS, SBCs, EMS, Session Managers, Avaya Aura System Manager, Communication Manager, Media Servers |
| Third-party technology | Avaya Aura |

## Assumptions and unspecified details

- The model groups the AWS drawing's control/public/private subnets and two Availability Zones into descriptions. The template schema has no subnet or Availability Zone element kind, so it does not create unsupported custom elements or claim subnet CIDRs, routing tables, or placement details.
- The source does not specify EC2 instance types/counts, Avaya Aura versions/licensing, deployment procedures, scaling, security rules, or the precise topology of each Avaya role. Apart from the active/standby EMS instances shown, no replica counts are inferred.
- The diagram and numbered flow do not specify which Avaya component integrates with Directory Service, the directory protocol, or the PSTN path. Directory Service is included for its documented user-creation role; no protocol or PSTN relationship is invented.
- Route 53 appears in the diagram, but the page does not describe its use in the numbered flow; the blueprint does not infer a DNS record or routing behavior.
- Amazon Connect appears only in the page's further-reading links, not in this reference architecture, and is not modeled as a deployed service.

## What teams usually customize

- **Hybrid connectivity.** Select Direct Connect, Site-to-Site VPN, or both based on the actual corporate network and approved design.
- **Network details.** Add the real VPC/subnet layout, IP ranges, routes, security controls, and Availability Zone placement in the implementation design.
- **Avaya deployment.** Confirm the supported Avaya Aura release, EC2 sizing, licensing, role placement, HA behavior, and configuration with Avaya's deployment guidance.
- **Identity and telephony integrations.** Specify the Directory Service integration point and the PSTN/SBC connection path once those details are known.
- **Management access.** Adapt the WorkSpaces bastion pattern to the organization's access controls and operational tooling.
