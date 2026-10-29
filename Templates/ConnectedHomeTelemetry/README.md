# Connected Home Telemetry on AWS

This template models AWS's [Connected Home Telemetry reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-home-telemetry/connected-home-telemetry.html). The source page was published March 22, 2021 and links to the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-home-telemetry/images/connected-home-telemetry.png) in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The page does not link a PDF.

## What it is for

Collect telemetry from smart home devices, route selected data to storage and event processing, and make data available to client applications for retrieval, notifications, and visualization.

## How it works

1. **Device connection.** Devices connect to **AWS IoT Core** directly over MQTT from **FreeRTOS** or through **AWS IoT Greengrass**. The diagram also identifies AWS IoT Device SDKs.
2. **IoT Core routes data.**
   - **2a.** A topic rule selects meaningful data and stores it in **Amazon DynamoDB**.
   - **2b.** Another topic rule sends selected data, such as temperature, to **AWS IoT Events**.
   - **2c.** **AWS IoT Analytics** can ingest data directly from AWS IoT Greengrass.
3. **Clients and downstream services.**
   - **3a.** Client applications can request data through **Amazon API Gateway**.
   - **3b.** **AWS IoT Events** can trigger **Amazon SNS** notifications when specified changes occur, such as temperature exceeding 25 degrees.
   - **3c.** Data from IoT Analytics can be imported into **Amazon QuickSight** for visualization and further insights.
4. **4a.** API Gateway invokes **AWS Lambda**, which retrieves the requested data from DynamoDB.
5. **5a.** Client applications can visualize data in Amazon QuickSight.

## Assumptions and limits

The blueprint represents the documented service interactions, not deployable AWS infrastructure. Connected devices, the Greengrass edge gateway, and client applications are system slots for mapping to a project's systems. The diagram does not identify device manufacturers, application vendors, a particular AWS IoT Device SDK, or the Greengrass deployment topology; these remain unspecified. MQTT is listed as the protocol used on the direct FreeRTOS path.

AWS describes the DynamoDB data as meaningful data selected by an IoT Core topic rule, but does not specify its schema, table layout, retention, or access controls. It does not specify IoT Events detectors, thresholds beyond the illustrative temperature example, notification subscriptions, the API contract or authentication, the Lambda implementation, IoT Analytics configuration, or the QuickSight dataset and dashboards. The template does not invent these details. AWS names no required third-party service in this architecture.

## What teams usually customize

- Map device firmware, any Greengrass edge system, and client applications to the project's own systems.
- Select device hardware, SDK versions, telemetry schemas, MQTT topics, and the Greengrass deployment.
- Define DynamoDB tables and access controls, IoT Events rules and SNS subscriptions, and the API's authorization and response contract.
- Configure IoT Analytics processing and QuickSight datasets, permissions, and dashboards for the desired use case.
