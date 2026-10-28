# DERMS on AWS for Utilities

A template of AWS's [DERMS on AWS for Utilities reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/derms-on-aws-for-utilities/derms-on-aws-for-utilities.html), based on the [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/derms-on-aws-for-utilities/derms-on-aws-for-utilities.pdf). It describes a distributed energy resource management system (DERMS) for managing a growing fleet of distributed energy resources (DERs). This is an architecture blueprint, not an AWS deployment.

## What it is for

The reference describes an elastic, data-driven DERMS that integrates utility data and DERs, supports operational recommendations and direct DER control, and uses analytics and managed machine learning (ML) to improve grid reliability.

## How it works

1. Customer, grid, meter, DER, market-price, and weather data arrive in batch or streaming form. The diagram shows AWS Storage Gateway, AWS IoT services, and Amazon Kinesis; the source text also lists AWS Transfer Family and streaming or API services as integration options.
2. A third-party vendor DERMS application runs on AWS compute services. AWS names Amazon EC2, AWS Lambda, and AWS container services as possible compute choices, but does not choose among them. Transactional and operational data use purpose-built AWS databases; no database product or engine is specified.
3. DERMS can control DER assets directly through IoT or APIs. It can also make recommendations to an advanced distribution management system (ADMS) or supervisory control and data acquisition (SCADA) system, integrating through services such as Amazon API Gateway, Amazon SNS, Amazon SQS, or Amazon EventBridge.
4. AWS Glue handles ETL such as transformation and deduplication and discovers schemas and metadata. Amazon S3 stores raw and curated data and archival copies; the data lake is the source of truth for downstream analytics and ML.
5. Amazon Redshift queries structured and semi-structured data across the data warehouse and lake. Amazon QuickSight publishes interactive dashboards for access from devices or embedding in applications and websites.
6. Amazon Forecast supports anomaly detection, energy-use forecasting, and equipment-failure prediction. Amazon SageMaker AI supports building, training, and deploying custom models. The diagram also allows partner or customer ML models.

## What the source leaves open

The source does not name a DERMS vendor, select a compute or container service, identify database products or engines, or prescribe which integration services to use. It also does not specify an IoT product, model implementation, database schema, network topology, security controls, or deployment sizing. The blueprint keeps those as choices rather than inferring them. The generic AWS compute, database, and application-integration entries represent categories from the source, not additional AWS products.

## What teams usually customize

- Choose the vendor DERMS product and map the DERMS and external-system slots to the project's actual systems.
- Select compute, container, IoT, application-integration, and database services to match operational, data, and access-pattern requirements.
- Define the data contracts, retention and archival policies, ETL/catalog configuration, and analytics/ML workflows.
- Specify the network, security, availability, and deployment details, which are outside the reference architecture's documented choices.
