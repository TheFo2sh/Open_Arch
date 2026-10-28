# Routing Scenarios with AWS Direct Connect SiteLink

An M1Spec architecture template for the routing patterns in AWS's [Routing Scenarios with AWS Direct Connect SiteLink](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/routing-scenarios-with-aws-direct-connect-sitelink.html). The source page was published July 25, 2023. It describes five scenarios and their route advertisements; this template models the alternatives together, not as one required deployment.

## What it is for

Use SiteLink-enabled private or transit virtual interfaces (VIFs), associated with a common Direct Connect gateway, to exchange routes between customer locations over the AWS global network backbone. Inter-site traffic can avoid traversing an AWS Region. The same gateway can also connect customer networks to AWS resources, and multiple gateways/VIFs can segment regional and global routing.

## How it works

1. **On-premises routing.** Customer gateways at corporate data centers A and B advertise prefixes to Direct Connect over VIFs. AWS's examples use `10.0.1.0/24` and `10.0.2.0/24`. SiteLink announces routes between VIFs attached to the same Direct Connect gateway when SiteLink is enabled on them.
2. **Direct inter-site traffic.** Sites A and B route to one another over the AWS backbone, without traversing an AWS Region. SiteLink route advertisements include AWS and customer ASNs; AWS notes that SiteLink prepends the Direct Connect gateway ASN once for connections on the same AWS device and twice when connections are at different sites.
3. **Backup path.** An existing private network, such as MPLS, can be the preferred path between data centers. SiteLink advertises the same prefixes as a less-preferred backup route. The source illustrates BGP AS paths and links to AWS's [active/passive BGP guidance](https://aws.amazon.com/blogs/networking-and-content-delivery/creating-active-passive-bgp-connections-over-aws-direct-connect/).
4. **Network extension.** A location without its own direct connection can learn routes through another SiteLink-enabled location. In the source's example, data center C receives data center A's route through data center B.
5. **AWS full mesh and segmentation.** A Direct Connect gateway can connect VIFs to AWS resources, such as Transit Gateway or VPC. In the full-mesh example, on-premises traffic to AWS is routed by the corresponding regional Transit Gateway to a VPC. For segmentation, multiple gateways and VIFs separate global and regional routes; the source's examples use ASNs 65001, 65002, and 65003 and more-specific prefixes such as `10.1.0.0/24` and `10.2.2.0/24`.

## What applying it brings

| | |
|---|---|
| Zones | Customer-managed networks (`other`), AWS global networking, and AWS Regions 1 and 2 |
| Platforms | AWS Direct Connect, Direct Connect SiteLink, Direct Connect gateways, the AWS global network, Transit Gateway, and Amazon VPC |
| Slots | Corporate data centers A, B, and C, mapped to the project's own systems |
| External technology | An optional existing MPLS private network is shown as a preferred-path relationship; the provider is not identified |
| Routing | SiteLink route exchange, private/transit VIF associations, example CIDRs/ASNs, and regional Transit Gateway routing |

## Assumptions and source omissions

- The three corporate data centers are system slots because the template format has no customer-premises network-device element. They stand for the customer gateway and its on-premises network, not an asserted software system or specific router product.
- AWS does not identify a router vendor, MPLS carrier, Direct Connect location, physical connection type, AWS Region names, workload, VPC CIDRs, or a full production route policy. Those details are intentionally left for consumers to supply.
- MPLS is an example of a pre-existing preferred private path in the backup scenario, not an AWS service or a requirement for every scenario. The diagram does not identify its provider.
- The segmentation scenario is represented alongside the other scenarios to show the named ASNs and private/transit VIF roles. They are alternatives and need not be deployed together.
- This is an architecture blueprint, not deployment instructions or a provisioned AWS network.

## What teams usually customize

- Map the corporate data center slots to the project's actual network or infrastructure systems, or omit sites that do not apply.
- Choose Direct Connect locations, connection ownership/type, VIF types and associations, gateway ASN values, and AWS Regions.
- Define customer router configuration, BGP policies, advertised/allowed prefixes, route preference and failover behavior.
- Add the actual private-WAN provider and topology if using MPLS or another preferred inter-site path.
- Add the AWS workloads, VPC CIDRs, attachments, and route tables that the source leaves unspecified.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/routing-scenarios-with-aws-direct-connect-sitelink.html)
- [Traffic flow between on-premises locations diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/images/1-traffic-flow-between-on-premises-locations.png)
- [On-premises locations backup diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/images/2-traffic-flow-between-on-premises-locations-backup.png)
- [On-premises locations extension diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/images/3-traffic-flow-between-on-premises-locations-extension.png)
- [Full-mesh connectivity diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/images/4-full-mesh-connectivity.png)
- [Traffic segmentation diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/images/5-traffic-segmentation.png)
- [AWS editable diagram download](https://docs.aws.amazon.com/architecture-diagrams/latest/routing-scenarios-with-aws-direct-connect-sitelink/samples/routing-scenarios-with-aws-direct-connect-sitelink.zip)
