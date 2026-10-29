# Traffic Encryption Options in AWS Direct Connect

Four AWS reference patterns for encrypting traffic between a corporate network and AWS using Site-to-Site VPN or MACsec. This is an M1Spec architecture template, not an infrastructure deployment.

Sources: [AWS reference architecture collection](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/), [consolidated PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/traffic-encryption-direct-connect.pdf), and the individual diagrams for [public VIF to a VPC](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/encryption-vpn-to-vpc.html), [public VIF to Transit Gateway](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/encryption-vpn-to-tgw.html), [private IP VPN to Transit Gateway](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/encryption-private-ip-vpn.html), and [MACsec](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-encryption-direct-connect/encryption-macsec.html).

## What it is for

Use this template when documenting private connectivity that requires traffic encryption between an on-premises corporate network and AWS. It distinguishes end-to-end IPsec tunnels over Direct Connect from MACsec link encryption on a supported dedicated connection.

## Architecture and data flow

1. **Public VIF to a VPC.** A customer gateway sends IPsec-encrypted packets over a Direct Connect public virtual interface to the AWS Site-to-Site VPN public endpoint. The VPN terminates at the VPC's virtual private gateway, which routes traffic to an EC2 instance. AWS documents two VPN endpoints for this virtual private gateway pattern. Return traffic follows the reverse path.
2. **Public VIF to Transit Gateway.** The customer gateway sends IPsec-encrypted packets over a public VIF to the Site-to-Site VPN endpoint attached to Transit Gateway. The Transit Gateway routes the decrypted traffic to a spoke VPC and its EC2 instance. The pattern is intended for access to multiple VPCs; the blueprint shows one representative spoke.
3. **Private IP VPN to Transit Gateway.** An IPsec Site-to-Site VPN uses private tunnel endpoint addresses, a Direct Connect transit VIF, and a Direct Connect gateway as underlying transport to Transit Gateway. Transit Gateway routes the traffic to a spoke VPC and its EC2 instance.
4. **MACsec.** A customer or partner MACsec-capable device sends traffic over a MACsec-enabled dedicated Direct Connect connection, then a transit VIF and Direct Connect gateway to Transit Gateway and a spoke VPC. MACsec protects the Layer 2 link, not an end-to-end route across arbitrary customer or carrier segments.

## Assumptions and source boundaries

- The source presents dedicated and hosted Direct Connect connection choices for VPN patterns. The public VIF patterns establish a BGP peer and use the AWS public IP ranges advertised over that VIF. MACsec requires a supported 10 Gbps or 100 Gbps dedicated connection and MACsec-capable devices and Direct Connect location; AWS requires a compatible CKN/CAK pair associated with the connection.
- For private IP VPN, AWS specifies the Transit Gateway CIDR as an allowed prefix on the Direct Connect gateway attachment and requires it not to overlap VPC or on-premises CIDR ranges.
- AWS's diagrams show customer gateways and, for MACsec, a customer or partner device at the Direct Connect location. They do not name a hardware vendor, colocation provider, carrier, or third-party service. These are represented as customer-mapped system slots; the template does not invent providers or devices.
- AWS specifies the IPsec or MACsec mechanism, but not customer-specific crypto suites, key values, complete routing policy, addressing plan, or device configuration. The template does not supply these.
- In the MACsec pattern, the customer-to-location segment is protected only when the Layer 2 circuit is extended end-to-end. If the circuit terminates at a customer or partner device at the Direct Connect location, protection of the remaining segment is the customer's or partner's responsibility.
- The AWS reference examples use an EC2 instance as the traffic destination; application behavior, VPC sizing, availability, and deployment settings are outside the documented scope.
- User and system elements are M1Spec slots. Map the corporate user, client, customer gateway, MACsec device, and workload slots to the project's own elements when applying the template.

## What teams usually customize

- Map the corporate-side system slots and AWS workload slots to the systems in the project architecture.
- Choose the appropriate VPN pattern and topology: a virtual private gateway for one VPC, a public VIF VPN for Transit Gateway, or a private IP VPN over a transit VIF.
- Specify the actual Direct Connect connection type and location, customer gateway and partner devices, supported MACsec boundary, VPN parameters, routing, and IP addressing based on the deployment.
- Expand the Transit Gateway spokes and add the real workloads, VPC attachments, and route-table relationships.
