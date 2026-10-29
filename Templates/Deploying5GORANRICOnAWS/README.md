# Deploying 5G O-RAN RIC on AWS

An M1Spec blueprint of AWS's [Deploying 5G O-RAN RIC on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-o-ran-ric/deploying-5g-o-ran-ric.html) reference architecture. AWS describes near-real-time and non-real-time Radio Intelligent Controllers (RICs), their O-RAN interfaces, machine-learning services, and an S3-backed data lake. This is an architecture template, not deployable AWS infrastructure.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-o-ran-ric/deploying-5g-o-ran-ric.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-o-ran-ric/images/deploying-5g-o-ran-ric.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/deploying-5g-o-ran-ric/deploying-5g-o-ran-ric.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Use the blueprint as a starting point for a 5G radio network that applies fast, near-real-time control alongside longer-running policy and resource-management loops. The near-real-time RIC supports QoE prediction and proactive closed-loop network optimization; the non-real-time RIC supplies guidance, enrichment, and model lifecycle management.

## Architecture and data flow

1. The near-real-time RIC collects data from and controls the Central Units (CUs) and Distributed Units (DUs) over the O-RAN E2 interface using SCTP/IP. Its control loops run from 10 ms to 1 s.
2. Amazon EKS nodes on AWS Outposts or in AWS Local Zones host the RIC controller workloads and NoSQL database instances. Amazon EBS storage attached to the EKS nodes backs the persistent database data.
3. Near-real-time RIC applications use network data for QoE prediction and proactive, closed-loop network optimization.
4. The non-real-time RIC handles control loops longer than 1 s, including static Radio Resource Management (RRM) policies, and provides guidance, enrichment information, and ML lifecycle management.
5. The non-real-time RIC exchanges policy-based guidance and ML model management with the near-real-time RIC over O-RAN A1 using REST over HTTP/TCP/IP. O-RAN O1 uses REST over HTTP/TCP/IP for non-real-time control, including static RRM policies.
6. Amazon SageMaker AI develops, trains, and deploys ML models for apps in both controller types. AWS also identifies EC2-hosted model training, update, deployment, and inference endpoints used by both RIC types.
7. An Amazon S3-backed AWS Lake Formation data lake on the non-real-time RIC stores raw and processed data, inference results, trained models, and Amazon EBS backup snapshots.

## Assumptions and unspecified details

- The CUs, DUs, near-real-time RIC, and non-real-time RIC are system slots to map to the adopting project's systems. AWS does not identify their vendors or implementations.
- AWS presents Outposts and Local Zones as placement options for EKS nodes. The blueprint shows both as alternatives, not as a requirement to deploy in both locations.
- AWS calls out NoSQL database instances but does not name a database product, vendor, schema, replication design, or data retention policy. The catalog therefore uses a generic, explicitly unspecified NoSQL technology placeholder.
- The source does not specify EKS cluster and node topology, VPCs, subnets, network security, availability configuration, detailed API payloads, or which individual data items use each ML endpoint.
- The page describes SageMaker AI model development, training, and deployment as well as EC2-hosted model lifecycle and inference endpoints. It does not define the exact division of responsibilities, endpoint configuration, or model handoff between them.
- AWS specifies the E2, A1, and O1 interfaces and their protocols, but leaves detailed message schemas and operational configuration to the implementation.

## What teams usually customize

- Map the CU, DU, and RIC slots to the project's radio and controller systems and select the corresponding product vendors.
- Choose Outposts or Local Zones and define the EKS cluster, node, networking, availability, and security configuration.
- Select and configure the NoSQL engine, EBS volumes, backup and recovery policies, and data retention.
- Define how SageMaker AI and EC2-hosted training, deployment, and inference endpoints divide model lifecycle responsibilities.
- Specify the E2, A1, and O1 message contracts, loop policies, model handoff, and data-lake governance.
