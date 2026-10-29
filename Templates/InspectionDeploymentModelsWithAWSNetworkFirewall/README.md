# Inspection Deployment Models with AWS Network Firewall

An M1Spec architecture template based on AWS's [Inspection Deployment Models with AWS Network Firewall](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/). It brings together six alternative patterns for inspecting traffic with AWS Network Firewall; they are choices to compare, not one combined deployment.

## What it is for

Use the template to compare distributed inspection inside one VPC with centralized inspection for VPC-to-VPC, internet-bound, and multi-Region traffic. The diagrams focus on the traffic paths and route-table decisions that steer flows through AWS Network Firewall endpoints.

## How traffic flows

1. **Single VPC:** Inbound traffic enters through an internet gateway, is sent to the firewall endpoint for inspection, and then reaches an Application Load Balancer and its EC2 target group. Responses are routed through the firewall before returning to the internet. For outbound traffic, instances send packets through a NAT Gateway and the firewall endpoint before the internet gateway.
2. **Intra-VPC:** Ingress reaches a public workload, such as web servers or a load balancer. Routes can send traffic between public and application subnets, or selected private-subnet CIDR ranges, through the firewall endpoint. Application-server outbound traffic is also sent through the endpoint before allowed traffic reaches a load balancer, web servers, or NAT Gateway.
3. **East-west:** Transit Gateway routes traffic leaving a spoke VPC to an inspection VPC. Its route table sends traffic through the firewall endpoint; allowed traffic returns to Transit Gateway and is forwarded to the destination spoke. The source also describes the reverse direction as a separately inspected flow.
4. **North-south:** For outbound traffic, Transit Gateway sends a spoke workload's packets through the inspection VPC, then routes allowed traffic to a central egress VPC and NAT Gateway. For inbound traffic, a central ingress VPC's Application Load Balancer forwards requests through Transit Gateway and the inspection VPC before they reach a spoke workload.
5. **Combined:** Transit Gateway sends east-west traffic between spokes through a central inspection VPC. The same inspection VPC also inspects internet-bound traffic before it reaches a NAT Gateway and internet gateway.
6. **Multi-Region:** Traffic from a spoke in Region A passes through its regional Transit Gateway and inspection VPC, crosses Transit Gateway peering, and is inspected again in Region B before reaching the destination spoke.

## What the template includes

| | |
|---|---|
| Zone | AWS |
| Platforms | Amazon VPC, AWS Network Firewall, AWS Internet Gateway, AWS Application Load Balancer, AWS NAT Gateway, AWS Transit Gateway, and Amazon EC2 |
| System slots | Workloads shown in the source VPCs, plus an internet client |
| Third-party services | None are named or required by these AWS Network Firewall diagrams |

This is an architecture blueprint, not a deployment plan. VPCs, subnets, Availability Zones, CIDR ranges, route tables, firewall rules, and Transit Gateway attachments are described by AWS but are not modeled as deployable infrastructure elements.

## Assumptions and unspecified details

The six models are represented together so consumers can compare and select patterns; they are not intended to be deployed together. Repeated AWS services are separate blueprint elements where the source places them in different VPCs or Regions. The source does not specify workload applications, particular Regions or Availability Zones, CIDR plans, detailed routes beyond those shown, firewall policies, sizing, or high-availability settings. No third-party firewall appliance or other third-party service is depicted; AWS Network Firewall is the inspection service.

## What teams usually customize

- Keep only the inspection pattern or patterns relevant to the target architecture and map workload slots to existing project systems.
- Replace generic workload names with the actual application systems and decide which systems require inbound, outbound, or east-west inspection.
- Design the VPCs, subnets, Availability Zones, CIDR ranges, route tables, Transit Gateway attachments, peering, and firewall rules for the real network.
- Select the required NAT Gateway and load-balancer placement; the source patterns differ in whether these are local or centralized.

## Sources

- [AWS architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [Inspection Deployment Models with AWS Network Firewall](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/)
- [Single VPC inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-single-vpc.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-1.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-single-vpc)
- [Intra-VPC inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-intra-vpc.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-2.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-intra-vpc)
- [East-west inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-east-west.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-3.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-east-west)
- [North-south inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-north-south.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-4.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-north-south)
- [Combined inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-combined.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-5.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-combined)
- [Multi-Region inspection page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/network-firewall-inspection-models/nwfw-multi-region.html) · [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/network-firewall-inspection-models/images/network-firewall-inspection-models-6.png) · [PDF page](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/network-firewall-inspection-models/network-firewall-inspection-models.pdf#nwfw-multi-region)
