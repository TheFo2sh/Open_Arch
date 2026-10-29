# Smart Grocery with Scan-and-Go, Computer Vision, and IoT

An AWS reference architecture for grocery stores combining Scan-and-Go and conventional checkout, connected store devices, camera-based intelligence, serverless order workflows, streaming data, and customer and operations notifications.

**AWS source:** [Smart Grocery with Scan-and-Go, Computer Vision, and IoT](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/smart-grocery-scan-and-go/smart-grocery-scan-and-go.html) · [Architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/smart-grocery-scan-and-go/images/smart-grocery-with-scan-and-go-computer-vision-and-iot-capability-ra-1.png) · [Architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/smart-grocery-scan-and-go/smart-grocery-scan-and-go.pdf) · [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The template is a starting point for a grocery retailer that wants digital Scan-and-Go ordering, associate picking and fulfillment, traditional POS and self-checkout channels, IoT-enabled store monitoring, and computer-vision workflows using existing IP cameras. It models the architecture described by AWS; it is not a deployment plan.

## How it works

1. In-store sensors and smart devices send MQTT data through AWS IoT Greengrass for connection management and aggregation. AWS IoT Core connects the store devices with cloud services.
2. The AWS Panorama on-premises appliance applies machine-learning models to existing IP-camera feeds for picking, fulfillment, and store intelligence. Amazon Kinesis Video Streams optimizes camera feeds for computer vision.
3. Amazon API Gateway, Amazon EventBridge, and AWS AppSync integrate customer ordering and associate picking applications with the application and its data.
4. AWS Lambda runs business logic, while AWS Step Functions orchestrates order-management workflows over transaction, customer, and inventory data.
5. Amazon Kinesis Data Streams and Amazon Kinesis Data Firehose stream device and IoT data to the Amazon S3 data lake.
6. Amazon DynamoDB stores events and transactional state and connects to smart grocery services.
7. Amazon S3 is the data lake for in-store and digital transactions, sensor data, and telemetry.
8. AWS AppSync supports a real-time operations dashboard, and Amazon Pinpoint sends targeted, location-based messages across channels.

The AWS diagram also shows generic third-party IoT event providers and payment gateways, and Amazon Location Service for curbside pickup. Their vendors and integration contracts are not identified by AWS, so they remain generic slots in this blueprint.

## What applying it brings

| | |
|---|---|
| Zones | In-store/on-premises and AWS Cloud |
| User slots | Shopper, store associate, and store operations user |
| Application slots | Scan-and-Go, associate order picking, traditional POS, self-checkout, and operations dashboard |
| External integration slots | Third-party IoT event provider and payment gateway, without vendor assumptions |
| AWS platforms | IoT Greengrass, Panorama, IoT Core, API Gateway, EventBridge, AppSync, Lambda, Step Functions, Kinesis Data Streams, Kinesis Data Firehose, Kinesis Video Streams, DynamoDB, S3, Pinpoint, and Location Service |
| Databases | Events and transactional state on DynamoDB; smart grocery data lake on S3 |

## Assumptions and unspecified details

- AWS describes the customer ordering and associate picking applications by role, not by product, language, or hosting environment. They are modeled as system slots.
- Traditional POS and self-checkout are part of the documented grocery use case, but AWS does not specify their implementation or their connection to the integration layer. They are slots without an invented API path.
- AWS names transaction, customer, and inventory data but does not assign every data domain to a particular store. The blueprint therefore describes DynamoDB only as the event and transactional-state store; it does not assert where customer or inventory records live.
- The source does not name third-party IoT event or payment providers, their protocols, or payment processing details. These remain generic integration slots.
- The blueprint captures the documented service-level flow. Network layout, security controls, service configuration, retention, scaling settings, and deployment topology are not specified here.

## What teams usually customize

- Map the shopper, associate, operations user, and application slots to the retailer's actual systems and user roles.
- Decide how POS, self-checkout, payment, and IoT event sources integrate; add named vendors only when confirmed by the implementation.
- Assign customer and inventory records to the chosen systems of record, and refine how the serverless workflows access them.
- Choose IoT device types, camera models, Panorama models, messaging channels, data retention, and the AWS account/network topology.
