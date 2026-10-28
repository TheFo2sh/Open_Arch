# 42Q Cloud MES on AWS

A reference architecture for industrial data ingestion, analytics, and integration with 42Q's cloud manufacturing execution system (MES). It is based on AWS's [42Q Cloud MES on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/42q-cloud-mes/42q-cloud-mes.html), published October 13, 2022. The linked [AWS PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/42q-cloud-mes/42q-cloud-mes.pdf#42q-cloud-mes) contains the architecture diagram.

This is an M1Spec architecture template, not an AWS deployment plan.

## Use case

Connect factory equipment and other data sources to a cloud MES for digital factory integration. The source describes AWS services for ingestion, data storage, analytics, and machine learning, alongside the 42Q SaaS MES and its integration APIs.

## Architecture and data flow

1. **Factory edge.** AWS IoT Greengrass connectors provide connectivity for OPC-UA, Modbus-TCP, Modbus-RTU, and IoT Ethernet IP. Greengrass also supports legacy printers for on-premises label printing. AWS does not specify gateway hardware, connector versions, or the printer integration protocol.
2. **Ingestion choices.** AWS says to select an ingestion service based on the source: AWS DataSync, Amazon Kinesis, Amazon Managed Streaming for Apache Kafka, AWS IoT Core, or AWS Transfer Family. These are alternatives, not a claim that one deployment uses all five.
3. **Storage choices.** Store data according to workload needs. AWS lists Amazon DynamoDB, Amazon S3, Amazon Neptune, Amazon Redshift, Amazon Timestream, and AWS IoT SiteWise. Amazon OpenSearch Service is also listed among the analytics services. The blueprint shows these choices without asserting a particular schema, retention policy, or service-to-workload mapping.
4. **Analytics and machine learning.** AWS lists Amazon Forecast and Amazon SageMaker AI for building, training, and deploying models; and Amazon EMR, AWS Glue, Amazon Athena, Amazon Data Firehose, and Amazon OpenSearch Service for analytics. The reference does not prescribe which services are combined or how jobs and models are configured.
5. **MES integration.** AWS Lambda can write data from Amazon S3 or another data store to the 42Q MES API. 42Q Xchange provides SOAP-based APIs to connect ERP and CRM systems to 42Q. The API contract, payloads, authentication, and invocation design are not specified.
6. **Third parties and source systems.** The architecture requires the 42Q cloud MES and its Xchange integration. AWS also refers to unnamed AWS Partner solutions that connect other data sources and provide context; the source does not identify a partner or product. Factory equipment, ERP/CRM systems, and printers are shown as slots because their products and ownership are project-specific.

## Assumptions and limits

- AWS's page presents multiple service options; the template catalogs those named services but does not imply they all run together. The blueprint only draws the flows AWS describes at a high level.
- The source does not define regions, accounts, VPCs, networking, security controls, availability targets, device models, connector configuration, data schemas, retention, or service sizing. None are inferred here.
- The source does not state exactly which ingestion service feeds each data store or which analytics services operate on which datasets. Those relationships are left open for consumers to decide.
- The source describes 42Q Cloud MES as SaaS and names the Xchange SOAP APIs, but provides no API details. Authentication, payload shape, delivery guarantees, and operational responsibilities must be confirmed with the relevant vendors.
- The source names partner solutions as a category only; it does not identify an implementation.
- The user slot is a generic factory user because AWS does not specify user roles.

## What consumers usually customize

- Map the factory user, industrial equipment, ERP/CRM systems, and legacy printers to the corresponding project systems and users.
- Choose ingestion services based on each source, then select data stores, analytics, and machine-learning services for the actual workload.
- Add the specific AWS Partner solutions, device/gateway products, data schemas, API details, and security/networking design once those decisions are known.
- Adjust which stores send data to the MES and how the Lambda integration is invoked after confirming the 42Q API contract.
