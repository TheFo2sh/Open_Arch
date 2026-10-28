# Centralized Internet Egress with NAT Gateway

A network pattern for sending internet-bound traffic from spoke VPCs through a central egress VPC, an AWS Transit Gateway and a NAT Gateway. See the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-egress-nat-gateway/centralized-egress-nat-gateway.html) and the [AWS reference architecture diagram catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Use centralized egress when multiple workload VPCs should share a controlled outbound internet path instead of each having its own NAT Gateway. The reference pattern disables communication between spoke VPCs while allowing them to reach the internet through the egress VPC.

## How it works

1. A spoke VPC routes internet-bound traffic to an AWS Transit Gateway.
2. The Transit Gateway forwards that traffic to the central egress VPC.
3. The egress VPC routes traffic from a private subnet through its NAT Gateway in a public subnet.
4. The NAT Gateway uses the egress VPC's Internet Gateway to reach the public internet; return traffic follows the corresponding routes back to the originating spoke.
5. Transit Gateway routing keeps spoke VPCs isolated from one another.

The blueprint shows the network path at a service level. It does not model individual route tables, subnets, VPC attachments, or internet endpoints as separate elements. No third-party service is required by this AWS pattern.

## Assumptions and details to decide

This is an architecture template, not deployable infrastructure. The reference pattern does not prescribe project-specific CIDRs, subnet sizing, security-group or network-ACL rules, capacity settings, or deployment automation. A team must determine these for its environment, including availability-zone placement, NAT Gateway count and routing-table entries. The blueprint represents a generic spoke VPC; add more spoke VPCs as needed.

## What teams usually customize

- **Spoke VPCs:** Add the project's VPCs and their Transit Gateway attachments.
- **Availability and cost:** Choose the number and placement of NAT Gateways and the associated route design.
- **Network policy:** Set CIDRs, route tables, security groups and network ACLs to meet the project's connectivity and isolation requirements.
- **Egress controls:** Add any required inspection or proxy service; these are optional additions, not part of this reference pattern.
