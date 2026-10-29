# Connected Lodging Properties Using IoT and AI/ML

An AWS reference architecture for connected lodging properties. It combines edge IoT and voice-enabled room controls with property operations, data-lake analytics, and AI/ML. AWS describes use cases including touchless room personalization, queue-depth monitoring, foot and vehicle traffic tracking, and sanitation compliance.

Sources: [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-lodging-properties-iot/connected-lodging-properties-iot.html), [diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-lodging-properties-iot/images/connected-lodging-properties-iot.png), [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-lodging-properties-iot/connected-lodging-properties-iot.pdf#connected-lodging-properties-iot), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The diagram was first published August 28, 2020.

## Architecture and data flow

The flow below follows the diagram's numbered callouts:

1. **Property edge:** IoT devices communicate with AWS IoT Greengrass Core using MQTT. The diagram names FreeRTOS and other operating systems. It shows a local shadow service, MQTT broker, Lambda function, property metadata, and trained models at the edge.
2. **Device management:** AWS IoT Core maintains device shadows, manages devices, supports over-the-air updates, and secures devices. AWS IoT Device Defender and AWS IoT Device Management are also shown.
3. **Operational events:** AWS IoT Core routes data to Amazon Kinesis Data Streams. Events are stored in Amazon DynamoDB and published through Kinesis Data Streams to Amazon Pinpoint.
4. **Room personalization:** Alexa Voice Service connects voice-enabled guest devices and apps to API Gateway and the serverless functions. The diagram shows Step Functions orchestrating Lambda functions for the IoT Core pass-through, Alexa event handling, and authentication.
5. **Notifications:** Amazon Pinpoint sends operational and property-management alerts to front desk apps. The source says notifications can use multiple channels but does not name them.
6. **Data lake:** Amazon Kinesis Data Firehose delivers raw data to Amazon S3. S3 stores raw and processed datasets; AWS Glue (including its Data Catalog) and Amazon EMR are shown for data processing.
7. **AI/ML:** Amazon SageMaker Ground Truth and SageMaker AI are shown for model development, training, and inference. Deploying inference models to Greengrass Core is optional.
8. **Analytics:** Amazon Redshift, Amazon Athena, and Amazon QuickSight provide analytics. Redshift data marts are optional.
9. **Property monitoring:** AWS describes social-distancing and queue-depth management solutions. The property devices include cameras and sensors in lobby/lounge, check-in, and driveway/valet areas. AWS does not name the solution provider or define its integration.

## What applying the template brings

- An AWS zone and a property-edge zone, with AWS IoT Core, device management/security, event, serverless, notification, data lake, AI/ML, and analytics services.
- Slots for lodging guests, property management and front desk staff, property IoT devices, voice-enabled endpoints, and front desk applications. Systems and users are slots to map to a project's own systems and users.
- Databases for the operational data store, raw and processed data-lake datasets, and an optional Redshift analytics data mart.
- FreeRTOS and MQTT as device software technologies. Devices using other operating systems are not separately cataloged.

This is an architecture template, not an AWS deployment. It does not configure AWS resources, networking, availability, capacity, or security policies.

## Assumptions and unspecified details

- Alexa Voice Service is modeled as a separate managed integration because it is explicitly shown and named; AWS does not specify account ownership or tenancy.
- AWS does not identify specific IoT device models, sensors, data formats, alert channels, Lambda/API contracts, event rules, model details, or the implementation/provider of its social-distancing and queue-depth solutions. The template does not invent these.
- Service relationships describe the source's stated purposes and diagram flows. They do not prescribe implementation-specific pipelines, schemas, retention, or deployment.
- SageMaker Ground Truth, AWS Glue Data Catalog, Kinesis Data Streams, and the optional model deployment/data mart are shown as in the source; implementation boundaries and configuration are not specified.

## What teams usually customize

- Map the guest, staff, device, endpoint, and application slots to their own domain systems and users.
- Select actual device types, operating systems, sensors, edge software, Alexa integration, and alert channels.
- Define event schemas, API and Lambda contracts, data ingestion/curation, analytics, model lifecycle, and security settings.
- Decide whether to deploy inference at the edge and whether to create Redshift data marts.
- Add the networking, availability, sizing, and deployment details required by their AWS environment.
