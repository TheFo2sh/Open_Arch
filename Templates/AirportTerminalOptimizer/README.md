# Airport Terminal Optimizer

A batch analytics architecture for optimizing airport terminal and gate assignments, based on the [AWS Airport Terminal Optimizer reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airport-terminal-optimizer/airport-terminal-optimizer.html), its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airport-terminal-optimizer/images/airport-terminal-optimizer-ra.png), and the [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/airport-terminal-optimizer/airport-terminal-optimizer.pdf). The source was published on April 16, 2020 and is listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The pipeline uses airline schedules from OAG (up to 330 days ahead), airport terminal and gate configurations, and terminal operating costs to determine cost-effective gate and terminal assignments during reduced schedules. The architecture also includes hourly and daily passenger traffic and landing-slot outputs, and an optional dashboard for configuration what-if analyses.

This is an M1Spec architecture blueprint, not a deployment plan. Its airport operations user and software systems are slots to map to a project's own users and systems.

## How it works

1. **Collect inputs.** OAG provides daily arrival and departure schedules. The airport provides gate and terminal configurations—including airline-specific or common-use gates, domestic or international designations, adjacency constraints, and aircraft-type capacities—and operating costs. The source also shows aircraft data, time zones, and public datasets as inputs.
2. **Stage batch files.** Inputs include SSIM, SSM, configurations, and costs. The diagram shows AWS Data Exchange and AWS Transfer Family for SFTP feeding a batch staging tier in Amazon S3.
3. **Prepare and process data.** AWS Glue, the AWS Glue Data Catalog, and Amazon EMR discover, catalog, and process inputs, including conversions among CSV, JSON, and Parquet. Processed data is stored in S3 in Apache Parquet format.
4. **Build optimization results.** Flight data is created from schedule files; hourly and daily passenger traffic and landing slots are derived from flight data; optimized gate and terminal assignments are produced from configurations and costs. The resulting data is stored in the S3 optimized tier.
5. **Analyze results.** Amazon Athena queries the optimized S3 data, and Amazon QuickSight visualizes results.
6. **Optionally run what-if analyses.** A configuration dashboard uses API Gateway, Lambda, and DynamoDB. The diagram also shows an Amazon Kinesis configuration stream and S3 configuration data in this path.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | AWS Data Exchange, AWS Transfer Family, Amazon S3, AWS Glue Data Catalog, AWS Glue, Amazon EMR, Amazon Athena, Amazon QuickSight, Amazon API Gateway, AWS Lambda, Amazon DynamoDB, Amazon Kinesis |
| Slots | **Airport operations team**; **Airport optimizer batch inputs**; **Airport terminal optimization pipeline**; optional **Configuration management dashboard backend** |
| Databases | Batch staging, processed, configuration, and optimized data tiers on S3; dashboard configurations on DynamoDB |
| Third-party service | **OAG airline schedules** |

## Assumptions and unspecified details

AWS does not identify the airport-side source applications or specify which input feed uses AWS Data Exchange versus SFTP; the blueprint therefore leaves feed-to-channel routing open. OAG is the named schedule provider. The source does not identify providers for aircraft data, time zones, or public datasets, so none are added as third-party technologies.

The source does not define the AWS Glue and EMR job split, bucket count or layout, data schemas, retention, schedule cadence, optimization algorithm, or the exact Kinesis service used by the optional dashboard. The four S3 data tiers group the datasets shown in the diagram; they do not prescribe bucket names or deployment topology. The dashboard path is optional, as in the source.

## What teams usually customize

- **Input integrations.** Map the airport input slot to the project's data sources and select the supported exchange or file-transfer path for each feed.
- **Processing.** Define the Glue and EMR job boundaries, input/output schemas, Parquet conventions, scheduling, and terminal/gate optimization rules.
- **Storage and analytics.** Choose the S3 layout, retention, query patterns, and QuickSight dashboards for the airport's data and decision process.
- **Configuration dashboard.** Include or omit the optional path; select the Kinesis service and define configuration storage, update semantics, and what-if behavior.
- **Operations.** Specify the AWS region, networking, access policies, capacity, monitoring, and deployment approach for the intended environment.
