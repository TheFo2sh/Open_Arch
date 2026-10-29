# DT4o Faktory Vision: Quality Insights on AWS

An M1Spec template for the AWS reference architecture [DT4o Faktory Vision: Quality Insights on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/dt4o-faktory-vision/dt4o-faktory-vision.html). The source also provides the [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/dt4o-faktory-vision/images/DT4o-faktory-vision-ra.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/dt4o-faktory-vision/dt4o-faktory-vision.pdf), in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the page to December 11, 2022.

## What it is for

Computer-vision quality detection and defect analytics for manufacturing, using DT4o Faktory Vision and its distinct Faktory Inference and Faktory Edge roles.

## How it works

The sequence follows AWS's numbered architecture flow:

1. The plant's production controller (PLC) synchronizes the cameras. AWS IoT Greengrass initiates camera capture and inference events.
2. Cameras acquire images at low latency at the edge using MQTT. Greengrass transfers captured images to Amazon S3.
3. The DT4o Faktory Vision container on Amazon EC2 configures the plant hierarchy and starts machine-learning modeling. Operator feedback is used to fine-tune models and create new versions.
4. Amazon SageMaker AI trains models for each product type and stores versioned models in Amazon S3.
5. Faktory Inference downloads models to local disk.
6. Faktory Inference loads models according to the plant hierarchy.
7. Faktory Edge uses the models for runtime quality inference. AWS describes an inference target of under 500 ms.
8. Operators see product quality insights alongside raw and processed images. AWS describes a display target of under 600 ms.

Amazon Elastic Container Registry (ECR) is also listed as a supporting service in the AWS page and appears in its diagram.

## What applying it brings

| | |
|---|---|
| Zones | **Manufacturing plant** and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, Amazon EC2, Amazon Elastic Container Registry, Amazon S3, Amazon SageMaker AI |
| Slots | **Plant operator**, **Plant cameras**, **Production controller (PLC)**, **MQTT connector middleware**, **Faktory Inference**, **Faktory Edge**, and **Quality insights display** |
| Container | **DT4o Faktory Vision container** within the **DT4o Faktory Vision** system |
| Other technologies | MQTT and the DT4o Faktory Vision, Faktory Inference, and Faktory Edge product roles |

Systems and the operator are slots to map to a project's own systems and users. The blueprint does not prescribe deployment topology or infrastructure.

## Assumptions and unspecified details

- AWS names MQTT as the protocol, but does not identify the MQTT broker/middleware product, provider, topics, or configuration. The generic middleware remains a system slot; this template does not substitute AWS IoT Core or another broker.
- The source does not specify camera/controller models, exact PLC-camera synchronization mechanism, plant hierarchy schema, model formats, APIs, detailed image/model data formats, authentication, network topology, or the deployment details of the DT4o services.
- AWS's under-500-ms inference and under-600-ms display figures are stated architecture targets, not guaranteed deployment SLAs.
- ECR is listed and depicted as supporting the container workload; the source does not specify image names, release process, or pull configuration.
- Product versions, licensing, availability, capacity, retention, and security settings are not prescribed.

This is an architecture template, not an AWS deployment plan.

## What teams usually customize

- Map the plant operator, camera, PLC, MQTT middleware, Faktory Inference, Faktory Edge, and display slots to their own systems and users.
- Choose and configure the MQTT broker, plant connectivity, security, and camera/controller integration.
- Define the AWS account, region, networking, EC2 sizing, SageMaker training configuration, S3 organization/retention, and ECR image lifecycle.
- Confirm product-specific deployment boundaries, model formats, hierarchy mapping, and operational latency goals with DT4o and AWS.
