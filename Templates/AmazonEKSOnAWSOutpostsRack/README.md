# Amazon Elastic Kubernetes Service on AWS Outposts Rack

A private Amazon EKS control plane in an AWS Region manages a self-managed node group on an AWS Outposts rack, following the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-eks-on-aws-outposts-rack/amazon-eks-on-aws-outposts-rack.html) (published October 31, 2022). The page's linked [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/amazon-eks-on-aws-outposts-rack/images/amazon-eks-on-aws-outposts-rack.png) depicts the regional VPC and two Availability Zones, private control-plane ENIs, Outposts service link, Outposts subnet and self-managed node group, local gateway, and on-premises systems.

## What it is for

Run Kubernetes worker nodes at an on-premises location on AWS Outposts while using the Amazon EKS control plane in the parent AWS Region. The diagram does not specify application workloads; the workload system and cluster operator here are slots for a consuming team's own architecture.

## How it works

The flow follows the source page's numbered guidance:

1. Provide reliable connectivity between the Outposts rack and its parent Region. AWS shows a service link and gives AWS Direct Connect as an example of highly available, low-latency connectivity.
2. Create a private Amazon EKS cluster and select regional VPC subnets for its managed network interfaces. The diagram shows two Availability Zones.
3. If private subnets have no internet path, create VPC endpoints for Amazon EC2, Amazon S3, and Amazon ECR. Other endpoints depend on the AWS services the cluster will use.
4. Create a self-managed Amazon EKS node group on AWS Outposts.
5. Expose the Outposts nodes to the local network through the local gateway (LGW).
6. Use AWS IAM to manage user and role access to the cluster.
7. Use the CloudWatch metrics supported by AWS Outposts.

## What applying it brings

| | |
|---|---|
| Zone | AWS Region and Outposts rack |
| Platforms | Amazon VPC, Amazon EKS, AWS Outposts, Amazon EC2, Amazon ECR, Amazon S3, AWS IAM, Amazon CloudWatch |
| Slots | **Kubernetes workloads**, the consuming team's system; **Cluster operator**, a consuming project's user; **On-premises systems**, the consuming team's systems |
| Workload placement | Kubernetes workload slot on Amazon EC2 on AWS Outposts |

## Assumptions and unspecified details

- The blueprint reflects the AWS diagram's two regional Availability Zones, private VPC subnets, Outposts subnet, self-managed nodes, and local gateway. It does not choose VPC CIDRs, subnet sizes, routes, endpoint policies, or availability design beyond what the diagram shows.
- AWS does not specify the Kubernetes version, EC2 instance types or count, node operating system, workload applications, cluster add-ons, IAM policies, or additional service endpoints. Those remain consumer decisions.
- AWS Direct Connect is cited as an example for reliable Region connectivity, not as the only option or a mandatory separate service. The template does not select a connectivity product.
- The source names no third-party service. The AWS-managed control plane, AWS services, Outposts hardware, and generic on-premises systems are the documented scope.
- The source describes supported CloudWatch metrics but does not detail monitoring configuration or alerting.

## What teams usually customize

- Choose the parent Region, VPC and subnet layout, endpoint set, and reliable connectivity design for the specific Outposts deployment.
- Set the EKS version, node capacity and configuration, and IAM access model.
- Map the workload and on-premises system slots to the consuming project's systems, then add its actual workloads, integrations, and operational requirements.
- Add any required endpoints, observability, security, and resilience details that are outside the AWS diagram's scope.
