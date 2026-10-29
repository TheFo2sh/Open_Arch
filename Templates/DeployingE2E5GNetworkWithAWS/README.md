# Deploying E2E 5G Network with AWS

An M1Spec blueprint of AWS's [Deploying E2E 5G Network with AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-e2e-5g-network/deploying-e2e-5g-network.html) reference architecture. It spans radio access, multi-access edge computing (MEC), the 5G Core user and control planes, management and orchestration, and AWS Wavelength. This is an architecture template, not deployable AWS infrastructure.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-e2e-5g-network/deploying-e2e-5g-network.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-e2e-5g-network/images/deploying-e2e-5g-network.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/deploying-e2e-5g-network/deploying-e2e-5g-network.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

AWS first published the reference on December 28, 2020. Check current AWS service availability and lifecycle before using it.

## What it is for

Use the blueprint as a starting point for a communications service provider (CSP) network that places radio and user-plane processing near subscribers, regionalizes 5G control and management services, and offers low-latency applications through Wavelength.

## Architecture and data flow

1. Cell sites use Central Units (CUs) and Distributed Units (DUs) as the Radio Access Network (RAN). AWS's prose recommends Snowball Edge devices according to throughput; its diagram also depicts Snowcone at a site. The page's prose repeats “Snowball Edge” for both throughput options, so this template follows the distinct Snowcone and Snowball Edge labels in the diagram without assigning unverified throughput limits.
2. AWS Outposts hosts MEC capabilities using services including EC2, ECS, EKS, and S3. The diagram also shows Lambda in this set. AWS does not specify the MEC applications, their data, or which service runs each workload.
3. The 5G Core User Plane Function (UPF) runs on Outposts for high throughput. AWS describes UPF microservices on EKS, with SR-IOV, DPDK, and dual-homing capabilities; the diagram adds an EC2 worker-node Auto Scaling group, Multus, App Mesh, X-Ray, Prometheus, Grafana, and Fluentd.
4. AWS Direct Connect connects on-premises 5G Core components to an AWS Region for control and management.
5. The regional control plane runs in the same VPC as the on-premises connection. The diagram depicts EKS microservices for NSSF, AMF, and SMF across three Availability Zones; AWS's prose allows ECS or EKS for control-plane functions.
6. If needed, UPF instances can expand into AWS Regions through a Network Load Balancer and VPC expansion to on-premises.
7. AWS Transit Gateway interconnects other VPCs that host management and orchestration services. The diagram shows service design and creation, service orchestration, and service assurance, with tools including CodePipeline, CloudWatch, SNS, Step Functions, SQS, Service Catalog, Athena, S3, DynamoDB, Fargate, ECS, EKS, Lambda, and SageMaker.
8. AWS Wavelength provides a CSP environment for the developer community and low-latency applications for subscribers. The diagram shows applications in a Wavelength VPC but does not define the applications or their interfaces.
9. The regional service set also depicts CloudFormation, CloudTrail, CodeDeploy, EC2, ElastiCache, Aurora, DynamoDB, S3, EBS, EFS, App Mesh, and Lambda. AWS does not assign individual data flows or specific stores to these icons.

## Assumptions and unspecified details

- The systems and users are mapping slots. The RAN, corporate 5G Core, data network, 5G control plane, user plane, management/orchestration workloads, developer applications, subscribers, and developers must be mapped to the adopting project's own systems and users.
- AWS does not identify vendors for the RAN, 5G Core network functions, MEC applications, or service design/orchestration/assurance workloads. Its diagram does name third-party or open-source tools (Multus, DPDK, Prometheus, Grafana, and Fluentd), which are cataloged without implying a particular network-function vendor.
- AWS does not define the user-plane/control-plane protocols, data schemas, subscriber databases, VPC CIDRs, subnet and routing configuration, Direct Connect capacity, precise service endpoint paths, or the topology for dual-homing. Those design choices are left to consumers.
- The architecture diagram includes several regional storage and database services, but does not identify their datasets, schemas, or consumers. The blueprint therefore models the AWS services without inventing database resources or data flows.
- The page is dated 2020; services and lifecycle status can change. In particular, verify AWS App Mesh availability and lifecycle before adopting the diagram's choice.

## What teams usually customize

- Map the RAN, operator core and data network, control and user planes, MEC workloads, management functions, developers, and subscribers to existing project systems and users.
- Select the RAN, 5G Core, MEC, and orchestration products and define their interfaces and operational ownership.
- Choose Outposts, Snow family, Wavelength, EC2/EKS/ECS placement, throughput, redundancy, and the optional regional UPF expansion.
- Design the VPCs, Direct Connect and Transit Gateway attachments, route tables, service endpoints, dual-homing, and security controls.
- Decide which of the diagram's management, observability, storage, and database services are required and document their data flows.
