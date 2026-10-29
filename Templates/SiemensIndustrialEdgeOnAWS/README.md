# Siemens Industrial Edge on AWS

An M1Spec architecture template based on AWS's [Siemens Industrial Edge on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-industrial-edge/siemens-industrial-edge.html), its [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/siemens-industrial-edge/images/siemens-industrial-edge-on-aws-ra.png), and [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/siemens-industrial-edge/siemens-industrial-edge.pdf). The source is in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) and was published May 13, 2024.

## What it is for

Connect industrial assets to AWS using AWS IoT SiteWise Edge on Siemens Industrial Edge. The architecture combines decentralized data collection and edge AI with AWS-hosted industrial data, visualization, analytics, and machine-learning workflows.

## How it works

1. **Manage the edge.** Siemens Industrial Edge Management and the Industrial Edge Hub provide central management and application distribution. The source leaves the management hosting location open.
2. **Collect shop-floor data.** Southbound connectors and applications on Industrial Edge devices collect data from industrial assets. The diagram names OPC UA, Modbus, SIMATIC S7, EtherNet/IP, and TCP connector options, with apps created through Mendix on Edge, Flow Creator, or Docker.
3. **Ingest industrial data.** AWS IoT SiteWise Edge collects and aggregates data on Industrial Edge devices and sends it to AWS IoT SiteWise in the AWS Cloud.
4. **Visualize data.** AWS IoT SiteWise Monitor, AWS IoT TwinMaker, and Amazon Managed Grafana are shown as visualization options. AWS IoT App Kit is also shown for application development.
5. **Query cold data.** Amazon S3 stores cold IoT data. Amazon Athena queries it for analytics with Grafana, QuickSight, or Mendix applications.
6. **Train and package models.** AWS AI/ML services use data in S3 to train models. The diagram includes Amazon SageMaker Studio Lab and a SageMaker model; the AWS description says to combine AWS AI/ML services with the Siemens AI SDK to package and deploy models to the edge.
7. **Run models at the edge.** Siemens AI Model Manager deploys and manages models; the AI Inference Server runs them, and AI Model Monitor monitors them.

## What applying it brings

| | |
|---|---|
| Zones | **Shopfloor**, **Enterprise and edge management**, and **AWS Cloud** |
| Platforms | Siemens Industrial Edge; AWS IoT SiteWise, SiteWise Monitor, TwinMaker, Amazon Managed Grafana, S3, Athena, QuickSight, and SageMaker Studio Lab |
| System slots | Industrial Edge device; industrial assets and data sources; Industrial Edge management system; machine-learning model training; visualization and analytics applications |
| Edge containers | Southbound connector applications, Industrial Edge apps and data layer, AWS IoT SiteWise Edge, edge AI inference/monitoring and model management, management hub/repository, and Siemens AI SDK packaging |
| Databases | Industrial asset models and data on AWS IoT SiteWise; cold industrial IoT data on Amazon S3 |

The source diagram does not depict human actors, so the template adds no user slots. M1Spec maps the listed systems to a project's own systems when the template is applied.

## Assumptions and unspecified details

- The reference gives no device hardware, operating system, network topology, security design, connector configuration, data schemas, sampling rates, or retention settings. It names protocols and connector options, not specific connector products or configurations.
- Industrial Edge Management may be on premises or in the cloud. The diagram shows self-managed Kubernetes or Amazon EKS as hosting options but does not choose one; this template leaves management hosting open.
- AWS describes visualization and analytics products as options. The relationships summarize the numbered flow; exact SiteWise, S3, Athena, Grafana, QuickSight, and Mendix configurations are not specified.
- The source names AWS AI/ML services generically and shows Amazon SageMaker Studio Lab and a SageMaker model. It does not specify the training algorithm, model format, packaging details, inference interface, or model-monitoring criteria.
- Siemens AI Model Manager, AI Inference Server, and AI Model Monitor are shown as edge capabilities; their versions, configuration, and deployment mechanics are not documented.

This is an architecture template, not an AWS deployment plan. It does not prescribe a Region, VPC, Kubernetes/EKS deployment, IAM policy, availability design, infrastructure code, or service configuration.

## What teams usually customize

- Map the shop-floor, edge device, edge management, model-training, and application slots to their own systems; identify actual equipment and data sources.
- Select and configure connector apps, protocols, Industrial Edge applications, and any Industrial Edge Management hosting option.
- Define SiteWise asset models, data retention and S3 organization, Athena queries, and visualization/analytics applications.
- Specify the AWS AI/ML service and training workflow, model packaging and rollout, inference integration, and monitoring requirements.
- Design deployment, networking, identity, security, and operational controls for the actual environment.
