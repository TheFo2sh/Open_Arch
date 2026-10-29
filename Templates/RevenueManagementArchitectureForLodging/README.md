# Revenue Management Architecture for Lodging

An AWS reference architecture for migrating an on-premises lodging revenue management system to AWS. It combines batch and near real-time lodging and market data feeds with forecasting, revenue analytics, dynamic booking controls, and reporting.

## Sources

- [Revenue Management Architecture for Lodging](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/revenue-management-lodging/revenue-management-lodging.html) (published October 5, 2022)
- [Architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/revenue-management-lodging/images/revenue-management-lodging.png)
- [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/revenue-management-lodging/revenue-management-lodging.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## How it works

1. Lodging systems provide property, reservation, stay, folio, ancillary, and shopping data. Amazon Kinesis carries near real-time events to an Amazon S3 data lake; AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow support batch feeds. The diagram names KeyData Dashboard, Phocuswright, and Smith Travel Research (STR) for market and competitive data, and BlueTent, InterContinental Net Designs (ICND), Q4Launch, Scurto Marketing, and TravelClick for shopping data.
2. The lake separates staging, processed, optimized, and configuration data. Amazon EMR and AWS Glue transform datasets, and the AWS Glue Data Catalog describes them. Amazon EFS replicates the file structure required by existing revenue management modules.
3. AWS Batch runs batch revenue management processes on EC2 Spot Instances and stores their outputs in the lake. AWS Fargate runs near real-time booking and pricing controls; AWS Transfer Family delivers those controls to the central reservations system (CRS), which coordinates with property management systems (PMSs).
4. Amazon Redshift revenue data marts and Amazon Athena queries provide reporting over lake data. Amazon Forecast supports regional demand forecasting, and Amazon SageMaker AI supports advanced revenue analytics. The dashboard uses Amazon QuickSight for analytics and Amazon API Gateway with AWS Step Functions and Amazon DynamoDB for configuration changes and user overrides; configuration changes are also streamed back to the lake.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Systems | **Property and booking systems**, **CRS**, **PMSs**, external market and shopping data providers, and a **Revenue management dashboard**; map each slot to the project's own system or omit it |
| Compute platforms | **AWS Batch** for Spot-based batch modules and **AWS Fargate** for near real-time booking controls |
| Data and analytics | An **Amazon S3** data lake, **Amazon Redshift** revenue data marts, **Amazon DynamoDB** configurations, Amazon Athena, Amazon Forecast, Amazon SageMaker AI, and Amazon QuickSight |

## Assumptions and scope

- The system slots represent logical endpoints from the diagram, not a prescribed product implementation. CRS and PMSs are separate slots because the diagram shows them as connected booking-control endpoints as well as lodging data sources.
- The diagram groups several source systems and data providers rather than specifying each integration. The named third-party providers are retained as catalog entries and grouped by market/competitive or shopping data in the blueprint.
- The source groups AWS Transfer Family, AWS Data Exchange, and Amazon AppFlow under batch ingestion but does not map each provider to a particular service. The provider-to-service groupings in this blueprint are illustrative, not prescribed integrations.
- AWS describes the lake tiers, feed categories, batch modules, analytics, and control flows, but does not specify schemas, file formats, protocols, network topology, security configuration, deployment regions, or the dashboard's implementation. This template does not infer those details or represent a deployment plan.
- The architecture models the services and flows shown in the source; it does not prescribe availability, retention, or scaling settings beyond the stated EC2 Spot and On-Demand usage.

## What teams usually change

- Map or omit the system and user slots to match the lodging systems and roles in the project.
- Replace the example market and shopping data providers and adjust the batch and near real-time feed paths to match available integrations.
- Adapt the data lake tiers, transformations, reports, forecasting, analytics, and configuration store to the project's data model and revenue management modules.
- Add the networking, security, availability, and deployment details required by the implementation; they are outside the source diagram's scope.
