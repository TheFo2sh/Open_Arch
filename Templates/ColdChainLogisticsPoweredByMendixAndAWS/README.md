# Cold Chain Logistics Powered by Mendix and AWS

An architecture template for a cold-chain logistics application hosted on Mendix Cloud and integrated with AWS services. It follows AWS's [Cold Chain Logistics Powered by Mendix and AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cold-chain-logistics-mendix/cold-chain-logistics-mendix.html) reference. The modeled cloud deployment is the [Mendix Cloud diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cold-chain-logistics-mendix/cold-chain-logistics-mendix-cloud.html); AWS's [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/cold-chain-logistics-mendix/cold-chain-logistics-mendix.pdf#cold-chain-logistics-mendix-cloud) also includes a separate Mendix Private Cloud diagram, which this template does not model.

## What it is for

The template shows how a Mendix application can connect cold-chain IoT devices and external data sources to AWS for telemetry, image analysis, messaging, object storage, analytics, and database access. Mendix Cloud is a required third-party application platform as a service in this deployment view.

## Architecture and data flow

- IoT devices publish telemetry to AWS IoT Core. Mendix connectors can publish and subscribe using MQTT and update device shadows to control actuators. AWS IoT Core custom rules process messages; the source does not name their rule actions or targets.
- Mendix native connectors use AWS SDKs and AWS API endpoints. The application can call REST services through Amazon API Gateway using Signature Version 4.
- External systems can feed an Amazon S3 data lake. The Mendix AWS/S3 connector can upload, modify, and delete files and back up data for long-term storage or reporting.
- Mendix connector microflows use Amazon Rekognition for image analysis, and the Amazon SNS connector explores topics and publishes messages with attributes.
- Amazon Athena queries and analyzes the S3 data lake with SQL. Sensor time-series data is stored in Amazon Timestream and can be queried from Mendix through the database connector.
- The source also describes Amazon DynamoDB as a backend database option and Amazon Aurora or Amazon RDS as external databases accessed through JDBC.

## Assumptions and unspecified details

AWS presents several integrations and database choices, not a requirement to deploy every listed service together. The blueprint includes the services described by the page and distinguishes the alternative database options; consumers should select the integrations their application needs.

The source does not specify IoT device models, telemetry schemas, rules and rule targets, how IoT sensor data is ingested into Timestream, API routes, S3 bucket/table layout, application domain model or user roles, database engine/instance configuration, regions, networking, credentials, or security policies. It also does not identify versions or implementations for the Mendix connectors, AWS SDKs, or JDBC driver. These remain implementation decisions; the relationships in this template describe documented integration paths, not a fully prescribed deployment.

## What teams usually customize

- Map the **Cold chain logistics application**, **Cold-chain IoT devices**, and **External data sources** slots to systems in the project, or leave out slots that do not apply.
- Choose which AWS services and data stores are in scope, especially whether the application uses DynamoDB, Aurora, RDS, or a combination.
- Specify the device and data contracts, IoT rule actions, connector versions, API resources, identity/access controls, network connectivity, and deployment settings for the actual solution.

This template is an M1Spec architecture blueprint; it does not provision AWS or Mendix infrastructure.
