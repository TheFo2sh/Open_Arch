# Amazon VPC Lattice Reference Architectures

An M1Spec blueprint of AWS's [Amazon VPC Lattice Reference Architectures](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/amazon-vpc-lattice-use-cases.html), published in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source page links the [architecture PDF](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/amazon-vpc-lattice-use-cases.pdf) and diagrams for [components](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/1-components.png), [traffic flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/2-traffic-flow.png), [custom domains](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/3-custom-domain-name.png), [centralized single network](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/4-multi-account-centralized-single-service-network.png), [centralized multiple networks](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/5-multi-account-centralized-multiple-service-networks.png), and [distributed networks](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-vpc-lattice-use-cases/images/6-multi-account-distributed-service-networks.png).

## What it is for

The diagrams illustrate application-layer connectivity for independently deployable services across VPCs and AWS accounts. Amazon VPC Lattice service networks group services; a service and a client VPC must be associated with the same network, and network or service auth policies must permit the request. AWS Resource Access Manager shares networks and services across accounts, including accounts in the same or different AWS Organizations.

## How it works

1. A consumer application in an EC2 instance or Lambda function uses the VPC's Route 53 Resolver to resolve a VPC Lattice service name. The resolver returns the service-network path (link-local addresses in the traffic-flow example).
2. The VPC association's optional security group is the network-level filter. VPC Lattice service-network and service auth policies provide fine-grained authorization.
3. If the VPC and service are associated with the same network and policy allows the request, Lattice forwards it to the service's target group. The examples show an Application Load Balancer forwarding to EC2, an EC2 Auto Scaling group, a Lambda function, and an Amazon EKS Kubernetes pod.
4. A central account can own and share one or more service networks. Multiple networks segment access: a client associated with network 1 cannot reach a service associated only with network 2. In a distributed pattern, providers share services and consumers own networks to select which services they consume. A VPC can be associated with only one service network.
5. For a custom service domain, a Route 53 private hosted zone in the consumer VPC maps the custom name to the generated Lattice service domain. The VPC resolver returns the service endpoint addresses. AWS Certificate Manager supplies an optional certificate when HTTPS is required.

## What the blueprint contains

The diagrams are separate patterns, not one deployment. The blueprint therefore keeps distinct consumer VPCs and account zones for the centralized, segmented, and distributed examples rather than suggesting that one VPC associates with several networks. It includes the documented target variants and represents the service/network policy decisions and cross-account sharing as relationships.

Systems such as the consumer applications and service targets are slots for the adopting project's own systems. The blueprint does not define application behavior or treat this architecture as deployable infrastructure.

## Assumptions and unspecified details

AWS uses generic names such as `service1` and `service2`; the blueprint labels services by their illustrated target type rather than assigning application meaning. The diagrams do not specify VPC CIDRs, subnets, regions beyond the depicted AWS Region, security-group rules, policy documents, listeners, target health checks, ports, service protocols, domain names, certificate contents, or application implementation; none are prescribed here. AWS Organizations is mentioned as an account-sharing boundary but is not shown as a runtime dependency. Security groups are described on VPC association relationships, not modeled as standalone platforms.

## What teams usually customize

- Map the consumer and provider system slots to the project's actual services, functions, and workloads.
- Choose whether service networks are centrally owned, segmented into multiple networks, or owned by consumers, and define the corresponding account/resource shares.
- Replace the example target types with the service's actual target group and configure service discovery, auth policies, and security groups.
- Add the missing implementation details (network layout, protocols, listeners, policy rules, custom DNS names, and certificates) from the project's own requirements.
