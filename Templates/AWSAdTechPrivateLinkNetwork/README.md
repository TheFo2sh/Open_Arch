# Guidance for AdTech PrivateLink Network on AWS

An M1Spec architecture template based on AWS's [Guidance for AdTech PrivateLink Network on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/adtech-privatelink/adtech-privatelink.html), published May 13, 2022. AWS describes supply-side platforms (SSPs) and demand-side platforms (DSPs) hosting programmatic bidding applications in the same Region and using AWS PrivateLink for real-time bidding traffic.

## What it is for

Use this pattern when an SSP auction service needs to send bid requests privately to DSP bidder services in the same AWS Region, while retaining DNS-based routing to DSP endpoints that are reached over the internet.

## How the traffic flows

1. A reader accesses a webpage with an ad impression, and the browser sends an ad request to the publisher ad server.
2. The publisher ad server sends the request to the SSP endpoint URL. Elastic Load Balancing in the SSP VPC forwards it to auction instances. The auction system selects DSPs and sends bid requests to their endpoint URLs.
3. The SSP VPC resolves DSP endpoint URLs with its VPC DNS resolver or an Amazon Route 53 private hosted zone. Depending on the endpoint, the request uses the interface endpoint or routes out to the internet.
4. For a DSP connected through AWS PrivateLink, the bid request reaches the interface endpoint's ENI in the SSP private subnet and is forwarded to the DSP endpoint service.
5. The DSP endpoint service routes the request to its associated Network Load Balancer, which distributes it to the bidder fleet. A bidder processes the request and returns a bid response to the SSP auction system over the AWS backbone network.
6. To use a private hostname for its endpoint URL, a DSP verifies its domain by creating a TXT record in its DNS. AWS's architecture assumes Amazon Route 53 for the DSP DNS.
7. Both SSP and DSP configure Amazon CloudWatch dashboards to see active connections and bytes processed per endpoint connection.

## What the template includes

| | |
|---|---|
| Zone | An AWS Region containing the SSP and DSP VPCs |
| AWS platforms | Amazon VPC, EC2, Elastic Load Balancing (including the depicted DSP Network Load Balancer), AWS PrivateLink, Route 53 Resolver, Route 53 private hosted zones, Route 53, and CloudWatch |
| Slots | Reader, publisher ad server, SSP auction system, DSP bidder fleet, and external SSP/DSP endpoints |

This is an architecture blueprint, not a deployment plan. The VPCs, public/private subnet boundaries, and security groups are represented as VPC platform descriptions; they are not expanded into infrastructure resources. The SSP auction and DSP bidder applications are system slots. AWS does not name their vendors, products, or implementation technologies.

## Assumptions and unspecified details

- The architecture places the SSP and DSP VPCs in the same AWS Region. AWS does not prescribe a Region, VPC CIDRs, subnet counts, Availability Zone placement, or endpoint availability configuration.
- AWS does not identify the publisher ad server, SSP/DSP providers, auction software, or bidder software. These remain system slots rather than named third-party products.
- The AWS diagram shows an additional Elastic Load Balancing resource in the DSP public subnet, but the page's numbered flow does not explain its purpose. It is included without assigning it a traffic role.
- AWS does not specify the endpoint service acceptance policy, DNS names, TXT record values, security group rules, ports, protocols, timeouts, capacity, or detailed route-table configuration.
- The internet path is shown as an alternative to PrivateLink for endpoint URLs; the exact public routing topology is not specified.

## What teams usually customize

- Map the Reader, Publisher ad server, SSP auction system, DSP bidder fleet, and external SSP/DSP slots to project systems and users.
- Choose the SSP/DSP providers and the auction and bidder applications; AWS does not prescribe products for them.
- Set VPC, subnet, Availability Zone, security group, routing, endpoint-service acceptance, and scaling configurations for the actual network.
- Select DNS ownership and hosted-zone strategy, including which DSP endpoints use PrivateLink and which use public internet routing.
- Configure the CloudWatch dashboards and endpoint metrics needed for operations.

## Sources

- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [AWS architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/adtech-privatelink/adtech-privatelink.html)
- [Linked AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/adtech-privatelink/images/adtech-privatelink.png)
- [Linked AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/adtech-privatelink/adtech-privatelink.pdf)
