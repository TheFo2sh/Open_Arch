# AWS Industrial Applications with Siemens LOGO!

An M1Spec architecture template based on AWS's [AWS Industrial Applications with Siemens LOGO!](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-applications-siemens-logo/industrial-applications-siemens-logo.html), published September 27, 2021. The source is in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/); its [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/industrial-applications-siemens-logo/images/aws-industrial-applications-with-siemens-logo-ra.png) and [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-applications-siemens-logo/industrial-applications-siemens-logo.pdf#industrial-applications-siemens-logo) are the modeling references.

## What it is for

Connect industrial equipment controlled by Siemens LOGO! programmable logic controllers to AWS for device data exchange, monitoring and control applications, event notifications, data-lake analytics, equipment health analysis, dashboards, and Alexa voice integration.

## Architecture and data flow

1. Two industrial facilities are shown with equipment connected to Siemens LOGO! controllers over S7 and Modbus TCP. The controllers exchange MQTT messages with AWS IoT Core. AWS Lambda transforms incoming data; the source does not detail the trigger or exact processing path.
2. Custom low-code web and mobile applications built with Mendix monitor and control IoT devices.
3. AWS IoT Events detects changes and anomalies and triggers notifications through Amazon SNS.
4. Amazon Data Firehose ingests data into an Amazon S3 data lake. AWS Glue crawls and catalogs data and performs ETL jobs.
5. AWS IoT SiteWise models and stores equipment data for large-scale deployments. Amazon Managed Grafana visualizes near real-time data; Amazon Timestream stores time-series data for fast analytical queries.
6. Curated data from the data lake is used with Amazon SageMaker AI, Amazon Forecast, and Amazon Lookout for Equipment for predictive health analysis.
7. AWS IoT Core enables global data exchange between LOGO! devices. Custom Alexa skills let users control LOGO! input and output variables by voice, with AWS Lambda shown as part of the integration.

## Assumptions and unspecified details

- The blueprint separates the two industrial facilities shown in the diagram to make the cross-facility IoT Core data exchange explicit. Their names, physical topology, and equipment are not specified.
- The diagram labels S7, Modbus TCP, and MQTT, but does not provide versions, device configuration, message schemas, sampling rates, security settings, or network design.
- AWS describes Lambda as transforming incoming data before ingestion, while the diagram shows Lambda connected to AWS IoT Core. The source does not explain the Lambda trigger, direction, or precise ordering, so the blueprint does not prescribe a function implementation or invocation mechanism.
- The Mendix custom applications are shown within the AWS Cloud boundary, but AWS does not identify the Mendix product/runtime, hosting configuration, application data model, or communication protocol. Mendix is represented as a third-party application technology, not as a separately deployed platform.
- The source shows AWS IoT SiteWise equipment data, Amazon Timestream, and Amazon Managed Grafana, but does not detail the Timestream ingestion path, retention, query setup, or dashboard implementation.
- AWS Glue's catalog and ETL jobs, IoT Events detector models, SNS delivery targets, predictive analysis models, and Alexa skill implementation are not specified. The diagram's AWS Device Catalog box is a catalog reference to Siemens LOGO!, not a runtime service or data-flow element, so it is not modeled as deployed infrastructure.
- The source does not state which data paths or analytics services are optional. Consumers should choose the parts needed for their use case.

This is an architecture blueprint, not an AWS or Mendix deployment plan. It does not configure or provision infrastructure.

## What teams usually customize

- Map the two industrial facility slots, Mendix application slot, and application/Alexa user slots to the project's actual systems and users; omit slots that do not apply.
- Specify the LOGO! models, industrial equipment, protocols, network connectivity, security, and telemetry contracts for the real facilities.
- Decide which data stores, event rules, notification targets, dashboards, and predictive health services are in scope.
- Define the Mendix application/runtime, Lambda behavior, Alexa skill behavior, and the ingestion/retention paths that the source leaves open.
