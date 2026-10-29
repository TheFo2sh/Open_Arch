# Tulip Next-Gen MES on AWS

An M1Spec template based on AWS's [Tulip Next-Gen MES on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tulip-next-gen-mes/tulip-next-gen-mes.html), published October 11, 2022. The page links the [architecture diagram PNG](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/tulip-next-gen-mes/images/tulip-next-gen-mes-ra.png) and [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/tulip-next-gen-mes/tulip-next-gen-mes.pdf#tulip-next-gen-mes), in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

This models the documented architecture; it is not an AWS deployment plan.

## Use case

Connect factory-floor devices and industrial data sources to Tulip's Frontline Operations Platform and a customer AWS environment, then use workload-specific AWS services for data storage, processing, analytics, machine learning, and APIs.

## Architecture and data flow

1. **Factory floor and Tulip edge.** Tulip Edge IO provides connectivity to barcode scanners, cameras, printers, and scales. A Tulip Connector Host connects to local devices. The diagram also shows Tulip Player and local OPC UA and MTConnect connections.
2. **Industrial connectivity.** AWS IoT Greengrass connectors provide OPC UA, Modbus TCP, Modbus RTU, and EtherNet/IP connectivity to factory data sources. AWS Partner solutions can connect additional sources and provide context; no specific partner product is named.
3. **Ingestion choices.** Select an ingestion service based on the source: AWS DataSync for file shares, or Amazon Kinesis, Amazon Managed Streaming for Apache Kafka, AWS IoT Core, and AWS Transfer Family for streaming data. These are options, not a required sequence or an instruction to deploy all services.
4. **Storage choices.** Store data according to workload: Amazon DynamoDB for key-value data, Amazon S3 for objects, Amazon Neptune for graphs, Amazon Redshift for warehousing, Amazon Timestream for time series, and AWS IoT SiteWise for industrial equipment data. The diagram also includes Amazon Relational Database Service.
5. **Machine learning and analytics.** Amazon Forecast and Amazon SageMaker AI are listed for building, training, and deploying models; Amazon Lookout for Vision appears in the diagram. Analytics options include Amazon EMR, AWS Glue, Amazon Athena, Amazon Data Firehose, and Amazon OpenSearch Service. The diagram also shows Amazon Kinesis Data Analytics.
6. **APIs.** AWS WAF provides protection for the API path. Amazon API Gateway supports REST methods for Amazon S3, Amazon Lookout for Vision, Amazon Textract, and Amazon Rekognition. AWS Lambda appears in the APIs section of the diagram.
7. **Tulip SaaS integrations.** Tulip provides a no-code environment for applications and ingests data through Tulip Connectors. Its diagram shows SQL and REST connectors for SQL databases and SaaS applications, plus a Tulip API.

## Assumptions and unspecified details

- The source presents multiple service options by workload and access pattern. The template does not assert that every listed AWS service is deployed together, or specify which ingestion service feeds which store or analytics service.
- The architecture separates the on-premises factory, Tulip SaaS, and customer AWS environment. It does not specify network connectivity, accounts, VPCs, Regions, security policies, service sizing, availability targets, or deployment configuration.
- AWS does not identify the partner solutions, factory equipment models, SQL databases, or SaaS applications. These are represented as project-mappable system slots.
- The diagram names Amazon Relational Database Service but does not choose a database engine, schema, or workload. Database schemas, contents, retention, and service-to-workload mappings are otherwise unspecified.
- AWS Lambda appears in the diagram, but the page does not describe its role. The template includes the service without inventing a function, trigger, or data path.
- Tulip connector configuration, industrial data models, API contracts, authentication, and detailed mappings between factory data, AWS services, and Tulip applications are not prescribed by the reference.
- The architecture does not specify how the Tulip API relates to API Gateway or whether every shown connector/service is required. Consumers should confirm those integrations for their deployment.

## What consumers usually customize

- Map operators, process engineers, factory devices, local systems, partner solutions, and external SQL/SaaS systems to their own project users and systems; omit slots they do not need.
- Choose ingestion, storage, analytics, and machine-learning services for the actual sources and workloads rather than deploying every option.
- Define the edge gateway and Tulip connector configuration, industrial data models, API contracts, security and network design, AWS accounts and Regions, and service-specific retention and access controls.
- Confirm current service availability and product capabilities, especially for diagram labels such as Amazon Kinesis Data Analytics, and adapt the architecture accordingly.
