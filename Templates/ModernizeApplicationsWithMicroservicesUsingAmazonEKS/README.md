# Modernize Applications with Microservices Using Amazon EKS

An M1Spec architecture template based on AWS's [Modernize Applications with Microservices Using Amazon EKS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/modernize-applications-with-microservices-using-amazon-eks.html) reference architecture.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/modernize-applications-with-microservices-using-amazon-eks.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/images/modernize-applications-with-microservices-using-amazon-eks.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/modernize-applications-with-microservices-using-amazon-eks.pdf#modernize-applications-with-microservices-using-amazon-eks)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Modernize legacy application tiers as Kubernetes microservices on Amazon EKS while retaining the existing database workloads on VMware Cloud on AWS. AWS DevOps services build and publish container images and update Kubernetes deployments without requiring an immediate database migration.

## How it works

The flow follows AWS's numbered architecture description:

1. During SDDC provisioning, an Elastic Network Interface is automatically attached to the Amazon EC2 bare-metal ESXi hosts in VMware Cloud on AWS.
2. Amazon EKS clusters are provisioned separately for development, testing, and production.
3. AWS App2Container is an example of a tool that can accelerate application refactoring or rearchitecting into containerized microservices. Amazon EKS manages and automates testing and deployment of container workloads.
4. Legacy systems are transformed into modern applications while the existing database tier can remain on VMware Cloud on AWS.
5. A Network Load Balancer integrates with the Kubernetes Ingress Controller to expose applications.
6. Amazon Route 53 resolves incoming requests to the Network Load Balancer in the primary AWS Region.
7. The development team commits code to AWS CodeCommit, initiating AWS CodePipeline.
8. AWS CodeBuild packages code and dependencies and builds a Docker image.
9. The new image is pushed to Amazon Elastic Container Registry (Amazon ECR).
10. CodeBuild invokes the Kubernetes API with kubectl to update the microservice deployment's image tag.
11. Kubernetes performs a rolling update of the application pods using the image specified in Amazon ECR.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Region**, on the AWS platform |
| Platforms | Amazon VPC, separate Amazon EKS clusters for dev/test/production, VMware Cloud on AWS, EC2 bare-metal hosts with VMware ESXi, ENI integration, Route 53, Network Load Balancer, CodeCommit, CodePipeline, CodeBuild, and ECR |
| Slots | **Application user**, **Development team**, **Modernized application**, and **Application source repository** |
| Containers | UI microservice deployment, application microservice deployment, and Kubernetes Ingress Controller |
| Database | **Legacy database tier** on VMware ESXi |

## Assumptions and details not specified

- The blueprint groups the development, test, and production EKS clusters under one logical platform entry to keep the catalog concise; these are distinct clusters, not one shared cluster. AWS does not specify promotion order or which environment the illustrated ingress and pipeline target.
- The source diagram shows a VPC and private subnet but does not prescribe CIDRs, routing, security groups, ports, or a full network topology. The template does not invent these deployment details.
- AWS does not specify the legacy database engine or schema, microservice languages, APIs, service boundaries beyond the illustrated UI and application services, pod counts, or image-tag policy.
- App2Container is mentioned as an example tool, not a required deployed service. The source names a Kubernetes Ingress Controller but does not identify a specific implementation or configuration.
- VMware Cloud on AWS and ESXi are the only non-AWS provider technologies in the documented architecture. No other third-party service is specified.
- This is an architecture template, not an AWS infrastructure deployment plan.

## What teams usually customize

- Map the application user, development team, application, and source repository slots to the project's own users and systems.
- Choose the VPC and private-subnet layout, cluster configuration, and how the distinct EKS environments are promoted.
- Specify the actual application services, ingress implementation, database engine and connectivity details.
- Adapt the CodeCommit, CodePipeline, CodeBuild, ECR, and kubectl flow to the team's source-control, build, image-tagging, and rollout practices.
