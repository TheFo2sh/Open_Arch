# Electric Vehicle Charging OCPP Handler

An AWS reference architecture for a highly scalable, low-latency electric vehicle charge point operator based on the Open Charge Point Protocol (OCPP). Source: [AWS Electric Vehicle Charging OCPP Handler](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/electric-vehicle-charging-ocpp-handler/electric-vehicle-charging-ocpp-handler.html), published November 15, 2023. The source page embeds a PNG diagram and links an editable PowerPoint ZIP; it does not provide a PDF.

## What it is for

Connects EV charge points to an operator system using OCPP over WebSockets, with AWS IoT Core and MQTT routing messages to automatic responses and business workflows. The source describes the design as highly scalable and low latency but gives no quantitative targets.

## How it works

1. A driver connects an EV to a charge point and swipes an RFID card to initiate charging.
2. The charge point resolves the OCPP endpoint through Amazon Route 53 and connects through a Network Load Balancer to the containerized OCPP Handler on AWS Fargate.
3. The handler authenticates the charge point and establishes a bidirectional WebSockets connection. It also maintains a bidirectional MQTT connection to AWS IoT Core using the charge point ID.
4. Incoming OCPP messages use an MQTT topic path ending in `/in`. An AWS IoT rule routes selected messages, such as Heartbeat, to AWS Lambda for automatic responses; another forwards `/in` payloads to Amazon SQS.
5. Amazon SQS initiates AWS Step Functions to interpret message payloads and orchestrate business logic. The CSMS publishes messages for a charge point to its `/out` MQTT topic; the handler subscribes and forwards responses over the associated WebSocket.
6. The charge point acts on responses, for example by initiating power delivery. Telemetry and metrics are sent to unspecified data stores for analytics and visualizations. Administrators use a web portal to monitor the system, view data, or initiate configuration and firmware changes.

## Assumptions and limits

- The blueprint models the charge point, Charging Station Management System (CSMS), operator portal, and telemetry/analytics capability as system slots. The source names these actors or capabilities but does not identify their vendors or implementations.
- AWS names Route 53, a Network Load Balancer, Fargate, IoT Core, Lambda, SQS, and Step Functions. It does not name third-party service products. OCPP, MQTT, WebSockets, DNS, and RFID are protocols or technologies in the described flow, not specified vendor implementations.
- AWS does not specify the OCPP version, MQTT topic hierarchy beyond the charge point ID and `/in` or `/out` paths, authentication mechanism, data-store or portal products, analytics implementation, network topology, or detailed workflow integration. The blueprint does not add those choices.
- Amazon EC2, S3, and DynamoDB appear in the page's general AWS Free Tier text, not as components of this reference architecture, and are not modeled here.
- This is an M1Spec architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the charge point, CSMS, operator portal, telemetry/analytics, and user slots to the project's own systems and users.
- Choose the authentication, OCPP version, MQTT topic conventions, and security policies appropriate for the deployed charge points.
- Specify the actual CSMS integration and the AWS IoT rules, Lambda behavior, SQS-to-Step-Functions trigger, and business workflows.
- Select and model concrete storage, analytics, visualization, and portal services; the AWS reference page leaves them unspecified.
- Add the network, availability, scaling, observability, and deployment details required by the implementation.
