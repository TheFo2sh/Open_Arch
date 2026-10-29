# Deploying 5G O-RAN NWDAF on AWS

An M1Spec blueprint based on AWS's [Deploying 5G O-RAN NWDAF on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-o-ran-nwdaf/deploying-5g-o-ran-nwdaf.html) reference architecture. AWS describes using Amazon EKS for network functions and Amazon SageMaker AI for NWDAF machine-learning lifecycle operations. This is an architecture template, not deployable AWS infrastructure.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/deploying-5g-o-ran-nwdaf/deploying-5g-o-ran-nwdaf.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/deploying-5g-o-ran-nwdaf/images/deploying-5g-o-ran-nwdaf.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/deploying-5g-o-ran-nwdaf/deploying-5g-o-ran-nwdaf.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

AWS dates the reference page June 16, 2022. Confirm current service availability and lifecycle before adopting the design.

## What it is for

Use the blueprint as a starting point for an O-RAN and 5G network that collects observed service-experience data, trains and serves NWDAF predictions, and sends analytics to OAM services for network optimization.

## Architecture and data flow

1. End users receive services through the O-RAN radio access network.
2. The O-RAN and 5G network functions run on Amazon EKS, including functions at an AWS Outposts site and regional 5G Core functions.
3. Network functions use Amazon EBS storage; the architecture calls out backups in remote AWS Regions.
4. Network functions send application, session, location, and quality-of-experience (QoE) data to the NWDAF Data Collection Coordination Function (DCCF).
5. DCCF coordinates data collection and distribution, preventing overlapping subscriptions and notifications. It forwards data to or retrieves data from the Analytics Data Repository Function (ADRF), which aggregates data and manages its lifecycle.
6. The Messaging Framework Adaptor Function (MFAF) formats and processes data received from network functions and coordinates its delivery.
7. NWDAF's Model Training Logical Function (MTLF) uses Amazon SageMaker AI to train models and deploy inference endpoints. Analytics Logical Functions (AnLFs) use those endpoints to make predictions.
8. AWS Lake Formation manages an Amazon S3-backed data lake for processed analytics, inference results, and trained models.
9. NWDAF compares current observations with historical, expected, and predicted Mean Opinion Score (MoS) values to derive observed service-experience analysis.
10. NWDAF sends this analysis to Operations, Administration, and Management (OAM) services for network optimization.

## Assumptions and unspecified details

- System and user elements are mapping slots. Map the subscriber, radio access network, 5G Core, NWDAF, and OAM slots to the adopting project's systems and users.
- AWS names the AWS services and logical network functions but does not identify a RAN or 5G Core vendor, a network-function product, or an OAM product. The blueprint represents those as slots or logical functions without assigning vendors.
- The diagram shows EKS-based functions both near the radio network and in an AWS Region. Exact cluster topology, Region names, availability zones, network paths, and deployment configuration are not specified.
- AWS states that EBS storage is backed up in remote Regions but does not specify backup services, schedules, retention, or destination Regions. Those are left to consumers.
- The source describes an S3-backed Lake Formation data lake but does not specify schemas, retention, access policies, or detailed data exchanges among the functions. The blueprint models only the documented storage purpose and principal analytics flows.
- The source names observed service experience analytics but leaves implementation, protocols, MoS calculation details, model selection, training data, and operational procedures unspecified.

## What teams usually customize

- Map the subscriber, radio access, 5G Core, NWDAF, and OAM slots to project systems and users.
- Select network-function and OAM vendors, then define their interfaces, data schemas, and service ownership.
- Specify EKS and Outposts placement, networking, resilience, scaling, and the EBS backup design.
- Define Lake Formation permissions, S3 organization, data retention, model lifecycle, MoS calculations, and operational integration with OAM.
