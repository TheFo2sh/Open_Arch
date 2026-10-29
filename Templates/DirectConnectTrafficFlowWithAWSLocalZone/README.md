# Direct Connect Traffic Flow with AWS Local Zone

An M1Spec architecture template based on AWS's [Direct Connect Traffic Flow with AWS Local Zone reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/direct-connect-local-zone/direct-connect-local-zone.html), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). This is an architecture blueprint, not an AWS infrastructure deployment.

## What it is for

Use this template to document separate Direct Connect routes from an on-premises network to parent-Region and Local Zone subnets in one VPC. It highlights the private-VIF route for latency-sensitive Local Zone traffic and the transit-VIF route through Transit Gateway for the parent-Region subnet.

## Architecture and data flow

1. The on-premises network has two routes into AWS. One uses a **private VIF**, **Direct Connect gateway X**, a **Virtual Private Gateway (VGW)**, and **VPC A**. The second uses a **transit VIF**, separate **Direct Connect gateway Y**, **Transit Gateway (TGW)**, and the TGW's VPC A attachment.
2. VPC A has a subnet in a parent-Region Availability Zone for an EC2 instance and a separate subnet in an **AWS Local Zone** for latency-sensitive workloads. Each subnet has its own route table. AWS's diagram gives `10.0.0.0/24` and `10.0.1.0/24` as example subnet prefixes.
3. Local Zone traffic takes the shorter private-VIF, gateway X, VGW, and VPC path. Sending it through gateway Y and TGW would hairpin through the parent Region; that is an avoided route, not the preferred path.
4. Gateway X and gateway Y use different ASNs. Gateway Y's allowed prefixes include the parent-Region subnet prefix, which is advertised to the on-premises network along the TGW route.

## Assumptions and source boundaries

- The architecture follows the AWS page's numbered flow and diagram. The template represents VPC attachments, subnets, route tables, and VIFs through platform descriptions and relationships because the M1Spec C4 schema has no dedicated elements for those network resources.
- CIDRs shown above are AWS diagram examples, not required address ranges or deployment values. The source does not supply the actual Region/Local Zone names, ASN values, customer route tables, or complete BGP configuration.
- The on-premises network and the two workload systems are slots for a project's own systems. AWS does not identify a router, carrier, colocation provider, third-party network service, or specific workload; none is assumed here.
- Connection count, bandwidth, availability design, security controls, and workload behavior are outside the details in the source architecture.
- No AWS resources are provisioned by applying this template.

## What teams usually customize

- Map the on-premises network and workload slots to the project's actual systems.
- Replace the example CIDRs with the project's address plan; specify Region and Local Zone names, subnet and route-table entries, and the distinct gateway ASNs.
- Confirm which traffic uses the private and transit VIF routes, set allowed and advertised prefixes, and document the customer's BGP and network-device configuration.
- Add provider, connection, security, availability, and application details only when they are known for the deployment.

## Source

- [AWS Direct Connect Traffic Flow with AWS Local Zone](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/direct-connect-local-zone/direct-connect-local-zone.html)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
