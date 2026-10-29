# AWS Industrial IoT Predictive Quality

An M1Spec architecture template based on AWS's [AWS Industrial IoT Predictive Quality reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-iot-predictive-quality/industrial-iot-predictive-quality.html), its [linked diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-iot-predictive-quality/images/AWS%20Industrial%20-%20Predictive%20Quality%20Reference%20Architecture.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-iot-predictive-quality/industrial-iot-predictive-quality.pdf) from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source was published July 16, 2020.

This is an architecture template, not an AWS deployment plan.

## Use case

Detect product defects in near real time using a computer-vision model trained with factory images, deployed for inference at the factory edge, and connected to operational alerts and analytics.

## Architecture and data flow

1. **Capture factory data.** AWS IoT Greengrass communicates with industrial equipment to capture data and video from factory-floor cameras and sensors. The diagram depicts an OPC-UA server and an on-premises historian but does not name their products.
2. **Connect over OPC-UA.** The AWS IoT SiteWise Connector runs on Greengrass and connects to factory equipment using OPC-UA.
3. **Model factory assets.** AWS IoT SiteWise models assets representing on-premises devices, equipment, and processes.
4. **Exchange messages and store images.** Greengrass exchanges messages with AWS IoT Core and sends processed images to Amazon S3 in a data lake managed with AWS Lake Formation.
5. **Route IoT data.** Rules in AWS IoT Core trigger events and send data to AWS IoT Events and AWS IoT Analytics.
6. **Build the model.** Amazon SageMaker AI builds a predictive-quality computer-vision model based on images stored in the data lake.
7. **Run inference at the edge.** The model is deployed to the AWS IoT Greengrass edge gateway for local inference at the factory.
8. **Notify the Operations Engineer.** An Amazon SNS topic delivers quality alerts when defects are detected.
9. **Visualize factory data.** AWS IoT SiteWise Monitor provides a web portal for near-real-time factory-data visualization.
10. **Derive insights.** Amazon QuickSight derives insights from AWS IoT Analytics for the Operations Manager.

The diagram also labels Modbus, MQTT, and HTTP at the Greengrass gateway; it does not explain their precise routes or associate them with specific equipment. These are protocols, not named third-party services.

## What applying it brings

| | |
|---|---|
| Zones | **Factory** and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, AWS IoT SiteWise, AWS IoT SiteWise Monitor, AWS IoT Core, AWS IoT Events, AWS IoT Analytics, Amazon SNS, Amazon SageMaker AI, AWS Lake Formation, Amazon S3, Amazon QuickSight |
| Slots | **Factory equipment and data sources**, **Factory edge gateway**, **Predictive quality model training**, **Factory data monitoring portal**, **Quality notifications**, and **Factory analytics dashboard** systems; **Operations Engineer** and **Operations Manager** users |
| Edge containers | AWS IoT SiteWise Connector, Greengrass Connector, Video uploader, and ML inference |
| Database | **Processed factory images** on Amazon S3; **Factory asset models and data** on AWS IoT SiteWise |

AWS does not identify a third-party service or supplier. Factory equipment, cameras, sensors, the OPC-UA server, and the on-premises historian are customer-side dependencies whose vendors and implementations are unspecified.

## Assumptions and unspecified details

- The blueprint follows the source page's numbered flow and diagram. It models S3 as the storage for processed images and Lake Formation as the data-lake management service; the source does not specify a bucket layout, catalog, or access policy.
- The source does not specify the factory gateway hardware or operating system, Greengrass version, connector configuration, model algorithm, image-processing steps, inference outputs, IoT Core rule definitions, IoT Events detector models, or IoT Analytics processing and retention. The template does not invent these details.
- Although the diagram depicts Lambda-style local functions for video upload and ML inference, it does not provide their implementation or deployment configuration.
- AWS does not specify network topology, security controls, service sizing, availability targets, Region, alert delivery channel, dashboard design, or user permissions.

## What consumers usually customize

- Map the factory, edge gateway, model-training, portal, notification, and dashboard slots to the project's own systems; map the operator slots to its users.
- Identify the actual equipment, cameras, historian, gateway, OPC-UA endpoints, and any Modbus/MQTT/HTTP integrations.
- Define the image-processing and model-training workflow, edge deployment and inference behavior, IoT rules, analytics, alert delivery, security, and operational requirements.
- Confirm service availability and suitability for the target account and Region, and adapt the architecture to current AWS service capabilities.
