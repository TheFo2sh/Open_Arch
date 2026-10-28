# Improve Demand Forecasting to Boost Sales on Amazon.com

An AWS reference architecture for Amazon.com first-party vendors that want to understand prior demand trends, anticipate future demand, improve On-Time-In-Full (OTIF) metrics, and maximize revenue. It programmatically sources vendor performance data through the Amazon Selling Partner API, then uses machine learning to create future demand predictions.

Based on AWS's [retail demand forecasting reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/demand-forecasting-retail/demand-forecasting-retail.html), published April 5, 2022. The linked [architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/demand-forecasting-retail/demand-forecasting-retail.pdf#demand-forecasting-retail) and [diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/demand-forecasting-retail/images/demand-forecasting-retail.png) are the source for the modeled flow.

## How it works

1. **Amazon EventBridge** initiates scheduled tasks to keep data fresh. **AWS Lambda** calls the Amazon Selling Partner API. An IAM role attached to the Amazon Vendor Central account entitles access; the API authenticates the caller and the role authorizes access to a specific set of vendor codes.
2. Some API responses are placed in **Amazon Simple Queue Service (SQS)** to decouple processing. Lambda consumes queue messages, transforms and persists data, and creates notifications. **Amazon Simple Notification Service (SNS)** receives notifications about data conditions such as product catalog changes.
3. **Amazon DynamoDB** acts as an intermediate database for CRUD operations while maintaining data integrity.
4. A scheduled **AWS Glue** job publishes data to a serverless data lake in **Amazon Simple Storage Service (Amazon S3)** for long-term persistence of time-series data.
5. EventBridge triggers a recurring **Amazon Forecast** routine. **AWS Step Functions** manages the workflow that sources demand history and generates future predictions.
6. S3 data is syndicated to consuming applications. **Amazon QuickSight** provides business intelligence, and **Amazon Athena** provides SQL capabilities.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | EventBridge, IAM, Lambda, SQS, SNS, DynamoDB, Glue, S3, Step Functions, Forecast, QuickSight, Athena |
| Slots | **Amazon.com first-party vendor**, **Amazon Vendor Central and Selling Partner API**, and **Demand data consumers** |
| Containers | **Vendor data ingestion** and **Queue message processor**, in the demand forecasting data pipeline |
| Databases | **Intermediate vendor data** on DynamoDB and **Demand history data lake** on S3 |

The external Vendor Central/Selling Partner API integration and consuming applications are represented as system slots because templates map systems onto the project's own systems. The vendor is a user slot. The technology catalog includes the Selling Partner API as an external third-party technology; Vendor Central is the account context described by AWS, not a separately specified software dependency.

## Assumptions and unspecified details

This is an architecture template, not deployable infrastructure or an implementation guide. The AWS page describes the service roles and flow but does not specify API operations or payload schemas, IAM trust and policy documents, queue configuration or retry behavior, Lambda code, DynamoDB key design, S3 layout or retention, Glue transformations/catalog configuration, forecast datasets and model settings, Step Functions states and failure handling, SNS subscribers, or consumer integrations. Those are intentionally left for the adopting team to design. The AWS network, account boundaries, and detailed security configuration are also not specified by the diagram.

## What teams usually customize

- **Vendor access:** select vendor codes and define the Vendor Central account setup, IAM role trust, least-privilege permissions, and Selling Partner API operations.
- **Ingestion and processing:** choose queue behavior, transformations, notifications, data validation, and DynamoDB item design for the actual API responses.
- **Data lake and forecasting:** set S3 organization and lifecycle, Glue schedules and transformations, and Forecast datasets, prediction cadence, and model parameters.
- **Consumers:** connect the data lake, forecasts, QuickSight dashboards, Athena queries, and any other downstream applications to the business's reporting and operational needs.
