# Traffic Segmentation Options in Direct Connect

An M1Spec architecture template for the five alternative traffic-segmentation patterns in AWS's [Traffic Segmentation Options in Direct Connect](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-segmentation-aws-direct-connect/traffic-segmentation-aws-direct-connect.html). See the [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). This is an architecture blueprint, not a deployment.

## What it is for

Use the template to document isolated paths between two on-premises routing domains (VRF A and VRF B) and two AWS destination segments (VPC A and VPC B). It presents five alternatives, not one combined deployment. Each keeps A and B separate through its own VPC route tables and, when Transit Gateway is used, distinct segment route tables and VPC attachments.

## Architecture and data flow

1. **Private VIF per VRF.** A separate private virtual interface and VLAN for each corporate VRF pass through a Direct Connect gateway to virtual private gateways and the corresponding VPC route tables.
2. **Transit VIF and Direct Connect gateway per VRF.** Separate transit VIFs and Direct Connect gateways connect to Transit Gateway. Its segment-specific route tables and VPC attachments route A to VPC A and B to VPC B.
3. **Transit Gateway Connect when VIFs are limited.** A transit VIF and Direct Connect transport carry a separate Transit Gateway Connect attachment and GRE/BGP tunnel for each VRF. The corresponding Transit Gateway segment table routes to its matching VPC attachment.
4. **Public-VIF VPN when GRE is unavailable.** A separate Site-to-Site VPN over a public VIF carries each VRF's traffic to its corresponding VPC route table. The supplied source notes do not specify the VPN gateway attachment, so the blueprint shows logical reachability rather than asserting a particular endpoint.
5. **Private-IP VPN over Direct Connect.** Each VRF has a private-IP Site-to-Site VPN attachment with two IPsec tunnels over a transit VIF and Direct Connect gateway. Transit Gateway segment tables and VPC attachments keep the two destinations isolated.

In Transit Gateway patterns, traffic follows the route table associated with its attachment. Route tables and attachments are separate A/B elements in the blueprint; no cross-segment route is drawn.

## Assumptions and source boundaries

- The five patterns and their components follow the AWS reference architecture. The source does not identify a customer router, third-party vendor, carrier, Direct Connect location, network CIDRs, complete BGP policy, or destination-server implementation; none is selected here.
- VRF A/B and destination servers A/B are system slots because the template format has no dedicated network-domain or server element. They stand for customer-mapped systems, not software products or a prescribed compute platform.
- Pattern 4's VPN gateway attachment is not specified in the supplied source notes. It must be resolved for a real design; this template does not invent a virtual private gateway or Transit Gateway attachment for that pattern.
- Quota values and VIF availability change. Pattern 3 is selected based on the stated VIF-count constraint, not a fixed numerical quota; confirm current AWS quotas and service support before implementation.
- Route tables, attachments, VLAN IDs, tunnel parameters, addressing, failover, and route propagation are conceptual. Configure them to match the actual deployment and ensure the A/B isolation policy is enforced.
- The architecture includes no named third-party service. Customer-managed routing endpoints are slots because AWS does not specify their vendor or implementation.

## What teams usually customize

- Map the corporate VRF slots and destination server slots to actual systems, or omit any that do not apply.
- Select one segmentation pattern and remove the other alternatives from the project architecture.
- Specify customer routers, Direct Connect locations and connection types, VLAN IDs, VIF limits, route advertisements, CIDRs, tunnel settings, and failover behavior.
- Confirm each Transit Gateway attachment is associated with the intended segment route table and that route propagation does not bridge A and B.
- Add the actual destination compute and application technologies once known.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/traffic-segmentation-aws-direct-connect/traffic-segmentation-aws-direct-connect.html)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
