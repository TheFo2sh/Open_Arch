# VMware Cloud on AWS Networking Reference Architectures

AWS's networking patterns for connecting on-premises networks, Amazon VPCs, and VMware Cloud on AWS SDDCs. This template consolidates four related diagrams; it describes architecture options and does not deploy AWS infrastructure.

## Sources

The [AWS reference architecture chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.html) redirects to the first of four chapters. AWS publishes their diagrams in one [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.pdf) with chapter fragments and as individual images:

| Pattern | AWS chapter | Diagram image | PDF section |
|---|---|---|---|
| Direct Connect to a virtual private gateway and VPN | [Chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-dx-vgw-vpn.html) | [Diagram 1](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/images/vmware-cloud-networking-1.png) | [Section](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.pdf#vmware-dx-vgw-vpn) |
| Direct Connect with Direct Connect gateway and Transit Gateway | [Chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-dx-dxgw-tgw.html) | [Diagram 2](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/images/vmware-cloud-networking-2.png) | [Section](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.pdf#vmware-dx-dxgw-tgw) |
| Resilient connectivity with Transit Gateway and VMware Transit Connect | [Chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-transit-connect.html) | [Diagram 3](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/images/vmware-cloud-networking-3.png) | [Section](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.pdf#vmware-transit-connect) |
| Security VPC traffic inspection | [Chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-security-vpc.html) | [Diagram 4](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/vmware-cloud-networking/images/vmware-cloud-networking-4.png) | [Section](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/vmware-cloud-networking/vmware-cloud-networking.pdf#vmware-security-vpc) |

AWS [Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## Use case and flows

Use these patterns to plan hybrid connectivity and traffic inspection between customer networks, AWS VPCs, and VMware Cloud on AWS. The four alternatives are shown together for comparison; their links are not a single topology that must be deployed in full.

1. **Direct Connect to VGW with VPN backup.** A private VIF connects on-premises to the Region A SDDC, with Site-to-Site VPN as backup. A public VIF reaches AWS public endpoints and can carry a VPN to the Region B SDDC when there is no Direct Connect connection in that Region. A separate private VIF to a Direct Connect gateway supports VPC connectivity through VGW associations; that gateway association is not supported for VMware SDDCs.
2. **Direct Connect gateway and Transit Gateway.** Private VIFs can connect on-premises directly to SDDCs in Regions A and B. Redundant transit VIFs connect to a Direct Connect gateway associated with regional Transit Gateways. Transit Gateway VPC attachments and cross-Region peering connect VPCs and networks. VPN attachments can provide SDDC connectivity, but VMware VMkernel traffic (including ESXi management, vMotion, and vSphere Replication) is prioritized over the private VIF; AWS advises not to advertise the private-VIF routes to the VPN.
3. **Resilient Transit Connect.** Transit VIFs from Direct Connect instances in two Regions connect through the Direct Connect gateway to regional Transit Gateways. VMware Transit Connect provides high-bandwidth, low-latency connectivity for SDDC-group networks. AWS Transit Gateway peering connects Transit Gateway networks between Regions; VMware Transit Connect peering connects only SDDC networks. VPC attachments to a Transit Gateway and to VMware Transit Connect have different reachability: the latter reaches only SDDC networks attached to that same vTGW.
4. **Security VPC inspection.** Transit Gateway routes on-premises, VPC, internet, and SDDC traffic through a security VPC. The VPC can use AWS Network Firewall or an unspecified third-party firewall for ingress/egress inspection. Spoke VPC traffic to and from SDDCs traverses the security VPC, and an external Transit Gateway peering attachment directs SDDC ingress and egress through it.

## What applying it brings

| | |
|---|---|
| Zone | **AWS** |
| Slots | **Customer on-premises network**, **SDDC A workloads**, **SDDC B workloads**, and **AWS public services and endpoints**; map these to the project's own systems |
| Platforms | Direct Connect and private/public/transit VIFs, Direct Connect gateway, VGWs, Site-to-Site VPN, Transit Gateway, Amazon VPC, internet gateway, AWS Network Firewall, VMware Cloud on AWS SDDCs, and VMware Transit Connect |
| Databases | None |

## Assumptions and unspecified details

The blueprint combines the four documented patterns but does not imply they are all deployed together. “Region A” and “Region B” are AWS's diagram labels, not selected regions. AWS does not specify account boundaries, CIDRs, routing tables or route advertisements beyond the noted VPN constraint, Direct Connect locations or providers, physical network devices, bandwidth, VPN tunnel counts, failover timing, VPC workload types, or exact attachment and ownership configuration. It does not name a third-party firewall product; AWS Network Firewall is shown as the selected documented option, with the generic alternative retained in the technology catalog. These details should be chosen for the target environment rather than inferred from the diagrams.

## What teams usually customize

- Select one or more connectivity patterns and map the region and system slots to the actual network topology.
- Confirm routing, route advertisements, VIF/VPN redundancy, attachment ownership, and failover behavior with the network team.
- Choose AWS Network Firewall or a specific third-party product and define its deployment, inspection policy, and capacity.
- Decide which VPCs and SDDCs attach to each Transit Gateway or VMware Transit Connect and verify the resulting route scope.
