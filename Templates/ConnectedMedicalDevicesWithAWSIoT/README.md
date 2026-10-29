# Connected Medical Devices with AWS IoT

An AWS reference architecture for managing medical devices deployed in hospitals, clinics, and homes. It uses AWS IoT Greengrass for edge computing, device management, and secure connectivity, with AWS IoT Core for cloud telemetry and device provisioning.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-medical-devices-iot/connected-medical-devices-iot.html) (published November 10, 2020)
- [Architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-medical-devices-iot/images/connected-medical-devices-iot.png)
- [Architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-medical-devices-iot/connected-medical-devices-iot.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

This design separates protected medical devices from direct internet connectivity in a hospital or large clinic. An on-premises Linux or Windows gateway runs AWS IoT Greengrass, proxies device connections, and communicates outbound with AWS. A small clinic or home can instead connect devices directly to AWS over the internet or a VPN.

## How it works

1. Medical devices in a hospital or clinic network have no internet connectivity and send outbound traffic only to an edge gateway. AWS notes that these devices are not AWS IoT Things and are not directly connected to or aware of the AWS Cloud.
2. The gateway runs AWS IoT Greengrass, which provides local processing, device management, and secure connectivity. Local operator and technician applications use it for device command and control. The diagram lists AWS Lambda for local processing, Greengrass connectors, Docker containers for custom applications, ML inference, and over-the-air updates.
3. AWS IoT Core represents Greengrass cores as Things. Amazon API Gateway is the single secure endpoint used by Greengrass for provisioning and other API calls, including calls to AWS services and third-party endpoints. Amazon Cognito and IAM provide authentication, authorization, and access management.
4. AWS Lambda stores and updates device metadata in Amazon DynamoDB. The metadata is used to link devices with data and video insights.
5. Medical-device video streams to Amazon Kinesis and is persisted in the Amazon S3 data lake. The diagram also shows AWS IoT Core sending data to the data lake.
6. Telemetry flows through Greengrass to AWS IoT Core using MQTT and is stored in Amazon Timestream for historical analytics. Procedure-generated data files are uploaded to Amazon S3.
7. AWS Glue performs ETL, Amazon Athena queries data, and Amazon QuickSight visualizes insights.
8. Amazon SageMaker AI trains ML models and deploys them to AWS IoT Greengrass for edge inference.
9. AWS IoT Events detects complex events and Amazon SNS publishes event notifications.
10. The diagram names manufacturer-hosted PKI services and other external services, but does not identify their providers. Amazon Glacier is also drawn in the data lake; its purpose and data flows are not explained in the page text.

For small clinics or homes, the diagram shows direct AWS connectivity as an alternative and labels Amazon FreeRTOS or the AWS IoT Device SDK as device software options.

## Assumptions and unspecified details

- Generic third-party APIs and manufacturer-hosted PKI are retained as external integrations because AWS requires or references them, but the source does not name vendors, APIs, protocols for those integrations, or certificate lifecycle behavior.
- The source calls the streaming service Amazon Kinesis without identifying a specific Kinesis product. The template does not narrow it to a particular Kinesis service.
- The data model, API contracts, IoT Core rules, Lambda implementation, Glue transformations and destinations, data retention, network/VPN topology, and security policies are not specified. The template does not invent these details.
- The AWS source page's numbered text describes ten steps, while the diagram has numbered callouts. The sequence above follows the text and adds diagram-only elements where they are clearly labeled.
- The diagram's Amazon Glacier element is represented, but not connected to a data flow because the source does not explain its role.
- The blueprint uses systems and people as M1Spec slots. It describes an architecture template only; it does not deploy infrastructure or assert healthcare regulatory compliance.

## What teams usually customize

- Map the medical-device, on-premises-application, edge-gateway, and directly connected-device slots to the systems in the project.
- Choose whether devices use the protected-network Greengrass gateway pattern or direct connectivity for a home or small-clinic deployment.
- Specify the actual device models, Greengrass components, supported APIs, external PKI provider, third-party services, and connectivity/security controls.
- Define the device metadata schema, S3 data organization, Kinesis configuration, ETL outputs, retention policy, and analytics/model workflows.
- Confirm which users need Cognito authentication and which device, data, and event permissions IAM should grant.
