# AWS Outposts Networking Reference Architecture

An M1Spec blueprint of AWS's [AWS Outposts Networking Reference Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/outposts-networking/outposts-networking.html), including its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/outposts-networking/images/outposts-networking.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/outposts-networking/outposts-networking.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The reference explains how an AWS Outposts Rack connects to a customer LAN and WAN, a home AWS Region, and Amazon VPC. The service link connects the Outpost to its regional service-link anchor over either an existing internet connection or AWS Direct Connect. The Local Gateway provides a separate path between Outpost VPC resources and the customer network. This template describes the architecture; it does not deploy infrastructure.

## How it works

1. The customer supplies fiber to the patch panel at the top of the Outposts Rack. Customer devices support link aggregation (LACP), VLANs, and BGP with the Outpost network devices.
2. The point-to-point links use VLAN A for service-link connectivity and VLAN B for Local Gateway connectivity. The diagram shows BGP on both paths.
3. A customer-provided service-link CIDR addresses Outpost infrastructure that connects to the service-link anchor in the home AWS Region.
4. A customer edge router reaches the public anchor IPs over Direct Connect or the public internet. The diagram labels service-link traffic on port 443; NAT or PAT can support the service link.
5. In the Direct Connect option, a public virtual interface connects to the service-link anchor IPs and advertises Amazon public IP ranges to the customer router.
6. AWS creates the service-link anchor in an Availability Zone chosen by the customer. An Outpost is homed to an Availability Zone; multiple VPCs can associate with one Outpost.
7. An Outpost subnet is created in an Amazon VPC in an account associated with the Outpost. The subnet can be shared with other accounts in the same organization.
8. Regional services connect from the Outpost through intra-VPC connectivity. The diagram shows Amazon S3 and Amazon Redshift as examples but does not specify their workloads or individual traffic paths.
9. The customer supplies a Local Gateway Customer-owned IP (CoIP) range for instances with Elastic IPs that need connectivity to on-premises workloads.
10. The Local Gateway, one per Outpost, attaches to one or more VPCs and provides NAT between the Outpost VPC range and the CoIP range.

## Third-party and customer-provided dependencies

AWS does not name a required third-party software service or connectivity provider. The customer supplies physical fiber, customer network devices, and an edge router. The internet path depends on the customer's existing internet provider; the Direct Connect path depends on a Direct Connect location and customer or partner router. Equinix SV1 and CoreSite NY1 are examples in the diagram, not requirements.

## Assumptions and details not specified

- The blueprint uses one illustrative Outpost, VPC, regional EC2 instance, and Outpost EC2 instance. AWS says an Outpost can associate with multiple VPCs; actual account, subnet, and Availability Zone choices are not prescribed here.
- AWS's prose specifies a /26 service-link CIDR, while the diagram labels its example `10.50.0.0/27`. The diagram also illustrates a CoIP range `10.0.0.0/26` beside a VPC range `10.0.0.0/16`. These examples are not used as deployment values; select valid ranges for the actual design.
- AWS does not specify BGP ASNs or route policies, VLAN IDs, LACP configuration, NAT/PAT rules, security controls, service-link CIDR selection, workload behavior, or the exact regional-service traffic flows.
- The diagram depicts an internet gateway and VPC endpoints without describing their service configuration or flows. Those are included as services, not connected to a workload in this blueprint.
- The systems named for the two EC2 instances are slots for a project's systems. The source does not identify their workloads.

## What teams usually customize

- Select the Outpost, home Availability Zone, VPCs, account ownership, and subnet-sharing model.
- Choose Direct Connect or the existing internet path, then define the physical network, BGP, VLAN, LACP, routing, and NAT/PAT configuration.
- Allocate non-conflicting service-link, VPC, and CoIP CIDRs according to current AWS requirements.
- Map the two instance slots to actual project systems and specify regional service integrations, security controls, and workload traffic.
