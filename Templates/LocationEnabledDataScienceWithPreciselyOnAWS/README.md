# Location-enabled Data Science with Precisely on AWS

A template based on AWS's [Location-enabled Data Science with Precisely on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/location-enabled-data-science-with-precisely/location-enabled-data-science-with-precisely.html) and its [architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/location-enabled-data-science-with-precisely/Location-enabled%20Data%20Science%20with%20Precisely%20on%20AWS.pdf). AWS describes using Precisely geo-addressing capabilities with Amazon SageMaker AI or Amazon EMR Studio to enhance location-aware experiments.

## What it is for

Refresh Precisely location reference datasets and make those datasets and the Precisely Geo Addressing SDK available in customer Amazon S3 storage for data-science work. The diagram presents SageMaker AI and EMR Studio as alternative environments for using the data.

## How it works

1. **Amazon CloudWatch** invokes **AWS Lambda** on a schedule. Lambda starts an **Amazon EC2** compute instance for the refresh.
2. **Precisely Automatic Data Downloader** monitors **Precisely Data Experience** for dataset updates and downloads them into customer **Amazon S3**. AWS lists flat files (`.txt`, `.csv`), spatial data (`.shp`, `.tab`) and geocoding reference data (`.spd`).
3. The **Precisely Geo Addressing SDK** is obtained from **Precisely Fulfillment** through Amazon S3.
4. Data scientists use the reference data and SDK for geo-addressing in either **Amazon SageMaker AI** or **Amazon EMR Studio**.

The Precisely services and software are third-party dependencies, not AWS services. This template describes the architecture; it does not deploy infrastructure or include data-science application code.

## What AWS does not specify

The reference architecture does not prescribe the refresh interval (monthly and quarterly are examples), the Lambda implementation, EC2 image or instance size, network and permissions, downloader configuration, or Precisely account, entitlement and credentials. It also does not specify S3 bucket/key layout, retention or versioning, encryption and access policy, or how a particular experiment invokes the SDK and processes results. Those details are intentionally left open rather than assumed here.

## What teams usually customize

- Choose SageMaker AI, EMR Studio, or both if the project genuinely uses both; the reference diagram presents the two as alternatives.
- Set the schedule, compute lifecycle and downloader configuration to suit the Precisely data subscription and update cadence.
- Define S3 ownership, bucket layout, access controls, encryption, retention and any cross-account access with the team's security and data-governance requirements.
- Add the project's notebook, experiment code, downstream outputs and any ingestion or validation steps; these are not specified by the reference architecture.
