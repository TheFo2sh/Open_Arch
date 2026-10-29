# Edge Inference for Agriculture

AWS's reference architecture for low-latency inference in rural and remote agricultural environments, using AWS IoT Greengrass and Amazon SageMaker AI Neo.

**Sources:** [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/edge-inference-agriculture/edge-inference-agriculture.html), [diagram PNG](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/edge-inference-agriculture/images/edge-inference-agriculture.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/edge-inference-agriculture/edge-inference-agriculture.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates this diagram to August 31, 2020.

## Use case

Run agricultural sensor inference close to the source when cloud connectivity is intermittent or low latency is important. AWS identifies AWS Snowball Edge devices and AWS IoT Greengrass for the edge environment, with SageMaker AI Neo compiling models for deployment to the device.

## Architecture and data flow

1. Temperature, precipitation, and wind-speed sensors send readings to the AWS IoT Greengrass device.
2. AWS Snowball Edge and AWS IoT Greengrass support local processing despite intermittent connectivity.
3. An AWS Lambda producer function collects sensor data on the device.
4. The workload uses container images. AWS lists a public registry, a private registry, Amazon ECR, or Docker Hub as alternatives; it does not select one source.
5. Amazon SageMaker AI Neo compiles the model for the edge device using a compact runtime.
6. A second AWS Lambda function coordinates and triggers model inference responses on the device.
7. AWS IoT Greengrass connectors use Amazon SNS for notifications.
8. AWS IoT Greengrass delivers Neo-optimized models directly to the edge through over-the-air updates.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | AWS Snowball Edge, AWS IoT Greengrass, Amazon SageMaker AI Neo, Amazon ECR, and Amazon SNS |
| Slots | **Agriculture edge inference**, a system slot; **Agriculture sensors**, an input system slot; and optional external registry slots |
| Containers and components | Sensor-data producer function; model inference container with an optimized model and inference response function |
| Databases and users | None are specified by the source |

The AWS IoT Greengrass service and its edge runtime appear as separate platform elements sharing the same technology. This distinguishes the documented OTA deployment path from the workload executing locally; it does not imply separate AWS products. Registry systems and the Amazon ECR platform are optional alternatives, not services that must all be deployed.

## Assumptions and unspecified details

- AWS does not identify sensor vendors or protocols, sensor data formats, model algorithm or format, Lambda function code, or the actions triggered by inference.
- The diagram draws Amazon SNS inside the outline labeled “Container,” but the page does not define that boundary or show SNS internals. The blueprint treats SNS as a separate managed service reached through a Greengrass connector.
- The source does not select a container image registry or describe image publishing, pulling, credentials, or the exact container contents.
- AWS does not identify the Greengrass connector implementation/version for SNS, notification topics or recipients, model rollout policy, or OTA security settings.
- The page does not specify device models or sizing, network topology, regions, identity and access configuration, buffering behavior, or deployment steps.
- The blueprint interprets the producer and inference Lambda functions as edge workloads because AWS says they run on the device. It does not add a separate cloud-side Lambda invocation.
- This is an architecture template, not deployable AWS infrastructure.

## What consumers usually customize

- Map the **Agriculture edge inference** system slot and sensor input slot to the project's actual systems.
- Select the Snowball Edge device and Greengrass runtime versions, sensor protocols, model, and Lambda function code.
- Choose one container-image source and define the image distribution and credential flows.
- Specify SNS topics, recipients, inference response handling, offline buffering, OTA rollout and rollback policies, and device security.
- Add the project's networking, monitoring, identity, and infrastructure implementation details.
