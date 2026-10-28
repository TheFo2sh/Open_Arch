# Industrial DataOps on AWS using Cognite Data Fusion

An M1Spec template based on AWS's [Industrial DataOps on AWS using Cognite Data Fusion reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-dataops-cognite-data-fusion/industrial-dataops-cognite-data-fusion.html), first published in November 2024. The page links the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-dataops-cognite-data-fusion/images/industrial-dataops-on-aws-using-cognite-data-fusion.png) and the [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-dataops-cognite-data-fusion/industrial-dataops-cognite-data-fusion.pdf); the architecture is also listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

This is an architecture template, not an AWS deployment plan.

## Use case

Connect operational technology (OT), information technology (IT), and engineering technology (ET) sources to an industrial DataOps platform. Cognite Data Fusion (CDF) contextualizes industrial data and builds knowledge graphs; AWS services support edge ingestion, data-lake extraction, integration, analytics, machine learning, and custom applications.

## Architecture and data flow

1. **Industrial sources and edge.** Purpose-built extractors ingest industrial data such as historian, IT, OT, and engineering data. AWS IoT Greengrass can bring data from edge gateways and programmable logic controllers (PLCs) into AWS IoT SiteWise.
2. **Customer data lake.** Cognite Native Extractors ingest pre-aggregated data from Amazon S3, Amazon Redshift, and Amazon DynamoDB into CDF. The diagram shows the lake services but does not define schemas or how individual datasets are organized.
3. **CDF integration and transformation.** AWS Lambda and Amazon API Gateway are used together to ingest data from CDF. AWS Glue transforms data, and the Cognite SDK writes it back into CDF. The source does not specify API contracts, invocation details, transformation rules, or the Cognite SDK language.
4. **Analytics and applications.** Amazon Managed Service for Apache Flink (labeled Kinesis Data Analytics in the diagram) and Amazon SageMaker AI provide additional analytics and machine-learning capabilities. End users create custom applications using AWS IoT TwinMaker and Amazon Managed Grafana.
5. **Third-party Cognite software.** CDF is a Cognite SaaS platform. The architecture also names Cognite Native Extractors and the Cognite SDK; AWS does not specify their versions or deployment configuration.

## Assumptions and limits

- The blueprint includes the AWS services named in the page and flow description. The source diagram and prose do not fully specify the individual connections among every analytics service, the customer data lake, and custom applications, so those paths are not inferred.
- The diagram shows SiteWise data entering the customer data-lake area, but the page does not identify a destination service for that flow; the blueprint leaves its destination open.
- AWS does not specify data schemas, retention, regions, accounts, networking, security controls, service sizing, extractor configuration, API contracts, or Cognite SDK language. These remain decisions for consumers.
- The source calls for purpose-built extractors but does not identify their products or vendors. No implementation is assumed.
- User and system elements are slots to map to the adopting project's own users and systems.

## What consumers usually customize

- Map the industrial source, extraction, ingestion, transformation, and user-application slots to the project's actual systems and users.
- Select the data lake datasets and SiteWise data model, and determine whether and how SiteWise data is stored or processed further.
- Specify Cognite extractor and SDK versions, API contracts, authentication, transformation rules, and data ownership.
- Define the data paths and configurations for Flink, SageMaker AI, IoT TwinMaker, and Managed Grafana based on the intended analytics and application use cases.
- Add the networking, security, availability, and deployment design required for the target AWS and Cognite environments.
