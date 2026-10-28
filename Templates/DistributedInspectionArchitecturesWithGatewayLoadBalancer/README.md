# Distributed Inspection Architectures with Gateway Load Balancer

An M1Spec architecture template based on AWS's [Distributed Inspection Architectures with Gateway Load Balancer](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/). It covers the documented north/south inbound and outbound patterns, east/west inspection between workload VPCs, and the associated route-table guidance.

## What it is for

Use this pattern when multiple workload VPCs need to send inbound, outbound, or inter-VPC traffic through a shared fleet of network security appliances. Workload VPCs use Gateway Load Balancer endpoints connected to a centralized appliances VPC by AWS PrivateLink; Gateway Load Balancer distributes the flows to the appliance fleet.

## How traffic flows

1. **Inbound:** Traffic from the internet enters through an internet gateway. Its ingress route table forwards the flow to a Gateway Load Balancer endpoint in the destination Availability Zone. The endpoint reaches the centralized Gateway Load Balancer through AWS PrivateLink; Gateway Load Balancer sends GENEVE-encapsulated traffic to an appliance and receives the inspected flow back. The endpoint then routes it to the Application Load Balancer, which forwards it to a healthy EC2 instance.
2. **Outbound:** A workload instance sends internet-bound traffic to a NAT Gateway, which translates the source address. The public subnet route table sends the packets to the local Gateway Load Balancer endpoint. After inspection through the shared appliance fleet, the endpoint routes the flow to the internet gateway.
3. **East/west:** Traffic from an instance in one workload VPC is sent through its local endpoint and the shared appliance fleet, then routed through AWS Transit Gateway to an endpoint in the destination VPC. It traverses the inspection path again before reaching the destination instance. AWS calls for Transit Gateway appliance mode on the inspection VPC attachment to maintain flow symmetry.
4. **Route symmetry:** Ingress, inspect, public, application, and Transit Gateway subnet route tables direct traffic to endpoints in the appropriate Availability Zone. Their exact routes depend on the traffic direction and destination; the blueprint shows the service path rather than individual route-table entries.

## What the template includes

| | |
|---|---|
| Zone | AWS |
| Platforms | AWS Internet Gateway, PrivateLink/Gateway Load Balancer endpoints, Gateway Load Balancer, Transit Gateway, Application Load Balancers, NAT Gateways, EC2 Auto Scaling, and EC2 |
| System slots | Workload in VPC 1, Workload in VPC 2, and the third-party security appliance fleet |
| Third-party technology | A generic security appliance placeholder; the AWS source does not identify its vendor or product |

This is an architecture blueprint, not a deployment plan. VPCs, subnets, Availability Zones, route tables, and network addresses are described in the AWS diagrams but are not modeled as deployable infrastructure elements here.

## Assumptions and unspecified details

The AWS reference requires security appliances but does not name a vendor, product, image, inspection policy, or configuration. The technology catalog therefore uses a generic third-party placeholder; select a product that supports the required Gateway Load Balancer integration and GENEVE behavior when adapting the template. The diagrams also do not prescribe a particular AWS Region, CIDR plan, production capacity, or workload application. The two workload VPCs are slots illustrating the documented multi-VPC patterns, not a fixed deployment count.

## What teams usually customize

- Map the two workload slots to the project's own systems, combine them when appropriate, or leave out patterns that do not apply.
- Select the third-party appliance product and define its inspection policies, scaling, health checks, and availability requirements.
- Adapt VPC attachments, subnets, route tables, Availability Zone placement, and Transit Gateway appliance mode to the actual network topology.
- Decide which traffic patterns to inspect and whether Application Load Balancers and NAT Gateways belong in each workload VPC.

## Sources

- [AWS architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [Distributed Inspection Architectures with Gateway Load Balancer](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/)
- [North/South inbound inspection](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/distributed-inbound-inspection.html)
- [North/South outbound inspection](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/distributed-outbound-inspection.html)
- [East/West inspection](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/distributed-east-west-inspection.html)
- [Distributed inspection route tables](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/distributed-inspection-gwlb/distributed-inspection-route-tables.html)
- [Source diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/distributed-inspection-gwlb/distributed-inspection-gwlb.pdf)
