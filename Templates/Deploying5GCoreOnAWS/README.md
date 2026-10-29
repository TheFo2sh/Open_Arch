# Deploying 5G Core on AWS

A hybrid 5G Core architecture based on the AWS [Deploying 5G Core on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-core/deploying-5g-core.html) reference architecture ([PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/deploying-5g-core/deploying-5g-core.pdf)). AWS describes placing the User Plane Function (UPF) on AWS Outposts and running containerized network functions on Amazon EKS, with connectivity between customer data centers and AWS Regions.

## What it is for

This template is a starting point for a 5G core whose user-plane processing runs close to the radio network while regional control-plane, operations, and business support workloads run in AWS. It is an architecture blueprint for M1Spec, not deployable AWS infrastructure.

## Architecture and data flow

1. A Radio Access Network (RAN) sends subscriber traffic through the AWS Outposts Local Gateway to the Outposts user plane.
2. UPF instances run as containers on Amazon EKS. AWS's guidance calls out multiple network interfaces for UPF pods using Multus.
3. Outposts ingress and egress subnets use route tables for service endpoints and AWS Transit Gateway. The local gateway is the default route for subscriber internet access.
4. Virtual LANs separate Service Link traffic from local traffic, allowing connectivity both locally and to AWS Regions.
5. AWS Direct Connect provides a high-throughput connection from on-premises data centers to a regional VPC. A service endpoint provides direct access to regional services such as Amazon S3 without traversing the internet.
6. AWS Transit Gateway connects to other VPCs used for 5G management and control. Regional EKS workloads include the 5G control-plane functions, OSS, and BSS.
7. The diagram also shows AWS App Mesh, AWS X-Ray, Multus, Prometheus, Grafana, and Fluentd alongside the workloads.

## Assumptions and unspecified details

- The blueprint separates regional control-plane and OSS/BSS workloads from the Outposts user plane to reflect the diagram. Individual named control-plane functions are included as diagram components; the source does not identify their vendor or implementation.
- AWS documents the network paths, two Outposts subnets, VLAN separation, and service endpoint use, but does not specify exact CIDRs, routing-table entries, VPC topology, throughput, or interface protocols. Those are intentionally left to the implementation.
- The architecture names no 5G network-function vendor, radio equipment, subscriber database product, or orchestration product. No such products are assumed here.
- AWS presents Amazon S3 as an example regional service; the template does not invent a bucket, database schema, or workload that consumes it.
- AWS's page was first published in December 2020. Confirm service availability and lifecycle status against current AWS documentation before using the design.

## What teams usually customize

- Map the RAN, subscriber, 5G control plane, user plane, OSS/BSS, and external management/control slots to the systems and users in the project.
- Choose the network-function vendor and define its interfaces, lifecycle management, scaling, and operational integrations.
- Specify the Outposts and regional VPCs, subnets, VLANs, route tables, service endpoints, and Direct Connect/Transit Gateway topology.
- Decide which monitoring, logging, service-mesh, storage, and regional AWS services are actually required for the selected 5G products and deployment.
