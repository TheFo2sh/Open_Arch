# Expose Microservices Using Amazon EKS

An M1Spec architecture template based on AWS's [Expose Microservices Using Amazon EKS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/expose-microservices-eks/expose-microservices-eks.html) reference architecture. The IPv4 chapter is titled [Expose Microservices in a Hybrid Scenario Using Amazon EKS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/expose-microservices-eks/expose-microservices-eks-ipv4.html); its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/expose-microservices-eks/images/expose-microservices-eks-1.png) is also included in the [AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/expose-microservices-eks/expose-microservices-eks.pdf). See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Exposing microservices running on Amazon EKS in private subnets to internet clients and on-premises networks, with public and private Elastic Load Balancers and separate inbound and outbound paths.

## How it works

1. **External inbound:** Amazon Route 53 resolves public requests to the public ELB deployed by the **AWS Load Balancer Controller**. The ELB forwards requests to external applications in EKS.
2. **Internal inbound:** Route 53 resolves requests in a private hosted zone to the private ELB. The ELB forwards requests to internal applications in EKS.
3. **Target modes:** ELBs can forward to a worker node (instance mode), after which the Kubernetes Service directs traffic to a pod, or directly to the pod IP (IP mode).
4. **Internet egress:** A pod in a private subnet routes outbound internet traffic through a NAT Gateway in a public subnet; the public route sends it through the Internet Gateway.
5. **On-premises egress:** A pod in a private subnet routes traffic to the Virtual Private Gateway. The connection to the on-premises network uses VPN or AWS Direct Connect.

The source diagram depicts an EKS cluster with private worker nodes across two Availability Zones, public and private subnets, public and private load balancers, and NAT gateways in the public subnets. It shows both external and internal application services and ingresses managed by the AWS Load Balancer Controller.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon Route 53, public and private Elastic Load Balancing, Amazon EKS, NAT Gateway, Internet Gateway, Virtual Private Gateway, Site-to-Site VPN, and Direct Connect |
| Slots | **Internet client**, **On-premises network**, **Microservices**, and **Cluster ingress integration** |
| Containers | External applications, internal applications, and AWS Load Balancer Controller |

## Assumptions and unspecified details

- The blueprint follows the IPv4 chapter. The source also links to separate custom-networking and IPv6 diagrams; those variants are not combined into this template.
- AWS does not name the applications, their APIs, languages, pod counts, or service boundaries. The external and internal application containers are generic slots.
- The source calls the load balancers ELBs without specifying their type. This template does not infer Application Load Balancer or Network Load Balancer.
- The diagram shows two Availability Zones, public and private subnet CIDRs, and NAT gateways, but the template does not prescribe a deployment topology, route-table configuration, or CIDR plan. The CIDRs in the drawing are examples, not requirements.
- AWS names the AWS Load Balancer Controller as the selected controller. It is modeled as a cluster add-on; AWS does not specify its configuration or deployment method. The source does not name a separate third-party service. NGINX Ingress Controller is mentioned only as an alternative and is not included in the default architecture.
- VPN and Direct Connect are shown as on-premises connectivity options; the source does not require that both be deployed. AWS Fargate is discussed as an alternative compute option that requires ELB IP mode, but is not part of the depicted worker-node architecture.
- This is an architecture template, not an infrastructure deployment plan. IAM, security groups, ports, TLS, DNS names, availability targets, scaling, and route-table details are not specified.

## What teams usually customize

- Map the internet-client, on-premises-network, microservices, and cluster-ingress slots to the project's own systems and users; omit slots that do not apply.
- Choose the load-balancer target mode and controller configuration for the EKS networking model.
- Adapt the private hosted zone, subnet and route-table layout, NAT placement, and VPN or Direct Connect connectivity to the adopting environment.
- Specify the application services, security controls, scaling and availability requirements that AWS leaves open.
