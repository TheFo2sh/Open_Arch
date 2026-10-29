# Centralized Ingress with Application Load Balancer

This template represents AWS's [Centralized Ingress with Application Load Balancer](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/) reference architecture. The source guide describes three alternative ways to route public traffic from a central ingress VPC to EC2 targets in an application VPC.

## What it is for

Use a dedicated ingress VPC and public Application Load Balancer to centralize internet entry for application VPCs. AWS Transit Gateway routes target traffic between the VPCs. The template includes the guide's direct EC2 target, Auto Scaling group target, and Auto Scaling group target with a chained application ALB patterns.

## How it works

All three patterns begin when internet traffic reaches the central ingress VPC. Its public Application Load Balancer forwards the request toward a target in the application VPC through AWS Transit Gateway. The Transit Gateway route table associated with the central ingress VPC determines the application VPC path.

1. **EC2 IP target:** the central ALB sends the request to a configured target IP through Transit Gateway. Traffic enters the application VPC and reaches the EC2 instance. The ALB's IP registrations require manual management.
2. **Auto Scaling group target:** the central ALB sends traffic through Transit Gateway to the Network Load Balancer's static IP in the application VPC. The Network Load Balancer forwards traffic to EC2 instances registered by the Auto Scaling group, using instance ID targets.
3. **Auto Scaling group target with ALB:** traffic follows the same central ALB, Transit Gateway, and Network Load Balancer path, then the Network Load Balancer forwards to an application-VPC ALB using an ALB-type target group. That ALB forwards to EC2 instances registered by the Auto Scaling group using instance ID targets.

The diagram also shows an Internet Gateway in the central ingress VPC, VPC subnets, route tables, Transit Gateway attachments and route table, and target groups. They are network configuration for the depicted flow, not separate software systems. No third-party service or application software is identified in the source.

## What applying it brings

| | |
|---|---|
| Zone | AWS |
| Network platforms | Central Ingress VPC, Internet Gateway, AWS Transit Gateway, Application VPC |
| Load balancers | Central Application Load Balancer, optional Network Load Balancer and chained application Application Load Balancer |
| Compute platforms | Amazon EC2 for direct IP targets; Amazon EC2 Auto Scaling and EC2 for the group-target patterns |
| System slots | Application EC2 target and Application Auto Scaling group target; use the relevant slot for the target pattern being applied |

## Assumptions and what teams usually customize

- The source does not name the application running on EC2. The two system slots are generic workload placeholders, not named applications or additional services.
- The architecture presents three alternatives, not a requirement to deploy all target paths at once. Keep the path that matches the team's target registration and load-balancing needs, and remove the other alternative when applying the template.
- AWS's diagram includes example CIDRs, subnet layouts, and route-table entries. Select actual address ranges, subnets, attachments, and routes for the team's VPCs; the example values are not deployment defaults.
- The source does not specify listeners, ports, protocols, TLS certificates, security-group rules, health checks, application behavior, availability-zone count, or how the NLB static IP is allocated. These remain implementation decisions.
- The Internet Gateway is shown in the diagram; the source's numbered flow begins with traffic arriving at the central ingress VPC. This template does not infer extra DNS, firewall, identity, or third-party services.
- This is an M1Spec architecture template, not deployable AWS infrastructure.

## Sources

- [AWS reference architecture landing page and catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/)
- [EC2 target page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/centralized-ingress-ec2-target.html) · [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/images/centralized-ingress-alb-1.png)
- [Auto Scaling group target page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/centralized-ingress-asg-target.html) · [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/images/centralized-ingress-alb-2.png)
- [Auto Scaling group target with ALB page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/centralized-ingress-asg-alb-target.html) · [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-ingress-alb/images/centralized-ingress-alb-3.png)
- [AWS PDF containing all three diagrams](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/centralized-ingress-alb/centralized-ingress-alb.pdf)
