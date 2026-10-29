# Revenue Management Architecture for Airlines

An M1Spec template based on AWS's [Revenue Management Architecture for Airlines](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/revenue-management-airlines/revenue-management-airlines.html), published April 5, 2023. AWS's architecture builds on the [Airlines Data Platform](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airlines-data-platform/airlines-data-platform.html) foundation; the repository also has a separate [Airlines Data Platform template](../AirlinesDataPlatform/README.md).

## Sources

- [AWS source page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/revenue-management-airlines/revenue-management-airlines.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/revenue-management-airlines/images/migration-arch-revenue-management-ra.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/revenue-management-airlines/revenue-management-airlines.pdf#revenue-management-airlines)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

This migration pattern helps airlines scale existing revenue-management workloads, incorporate batch and near-real-time feeds, reduce infrastructure costs for batch processing, and support changing booking controls and reporting needs. It is an architecture template, not deployable AWS infrastructure.

## How it works

1. **Ingest data.** ATPCO, QL2/INFARE, and 3Victors are named as feed sources. Their batch and near-real-time data enters tiers in an Amazon S3 data lake; the architecture is intended to accommodate new feeds and propagate data changes.
2. **Run existing modules.** Existing revenue-management modules move to EC2 Spot Instances. Amazon EFS reproduces the shared file structure those modules require.
3. **Store module results.** The modules write their outputs back to the S3 data lake so they are available for reporting and analytics.
4. **Update booking controls.** Near-real-time controls run on EC2 On-Demand Instances and update fares, rules, and availability in Amazon DynamoDB for availability services.
5. **Report from the lake.** Amazon Redshift and Amazon Athena support flexible reports using data lake information.
6. **Use the dashboard.** Revenue-management teams use a dashboard for analytics, reporting, and configuration adjustments.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, EC2 Spot Instances, EFS, EC2 On-Demand Instances, DynamoDB, Redshift, and Athena |
| User slot | **Revenue management team** |
| System slots | **ATPCO**, **QL2 / INFARE**, **3Victors**, **Availability services**, and the **Revenue management dashboard** |
| Workloads | Existing batch revenue-management modules on Spot capacity and near-real-time booking controls on On-Demand capacity |
| Data stores | Input and module-output tiers in S3, fares/rules/availability in DynamoDB, and reporting data in Redshift |

## Assumptions and unspecified details

- The source names ATPCO, QL2/INFARE, and 3Victors but does not map each provider to a feed cadence, format, or integration mechanism. The blueprint therefore shows them feeding the input lake without prescribing those details.
- The lake is represented by distinct input and module-output stores to show the documented flow. Exact tier names, schemas, retention, data-change propagation mechanisms, and access controls are not specified.
- The source says EFS reproduces the file structure required by existing modules but does not describe that structure or the modules' product names and interfaces.
- The source names EC2 Spot and On-Demand workloads but does not specify instance sizes, scaling, interruption handling, placement, or deployment configuration.
- DynamoDB is shown holding fares, rules, and availability for availability services. The source does not specify the table design or the services' interface.
- Redshift and Athena are shown as reporting paths over lake information. The source does not specify whether data is copied into Redshift, how it is loaded, or the dashboard's implementation and integration paths; the relationships are conceptual, not protocol or deployment instructions.
- The source says the architecture builds on the Airlines Data Platform but does not repeat that platform's full architecture here. This template models the revenue-management flow only.

## What teams usually customize

- Map or omit the feed-provider, availability-service, dashboard, and team slots to match the airline's systems and roles.
- Define provider-specific feed schedules, formats, ingestion methods, lake tiers, schemas, and change-propagation rules.
- Select which legacy modules to migrate, their Spot capacity strategy, and the shared file structure they need.
- Define booking-control and availability-service interfaces, DynamoDB data design, and the dashboard's configuration flow.
- Specify Redshift loading/query patterns and the reports, analytics, security, networking, availability, and deployment details required for implementation.
