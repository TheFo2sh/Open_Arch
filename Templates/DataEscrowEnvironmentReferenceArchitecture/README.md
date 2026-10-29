# Data Escrow Environment Reference Architecture

An AWS data escrow environment for securely storing, sharing, and accessing data between publishers and advertisers, based on AWS's [Data Escrow Environment Reference Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-escrow-environment/data-escrow-environment.html), its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/data-escrow-environment/images/data-escrow-environment.png), its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/data-escrow-environment/data-escrow-environment.pdf#data-escrow-environment), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS published the reference on May 13, 2022.

## What it is for

The architecture lets publishers hold advertiser-specific data, govern access centrally, and make data available for advertiser-side transformations and analytics without describing a deployment recipe.

## How it works

1. The publisher account stores encrypted advertiser-specific objects in Amazon S3. The source does not describe the encryption method or key management.
2. Publisher data is transformed with Amazon EMR or AWS Glue and stored in transformed Amazon S3 buckets. The source presents these as service options, not a required concurrent pair.
3. AWS Lake Formation and AWS Glue Data Catalog govern and catalog the publisher S3 data. AWS CloudTrail and Amazon CloudWatch are shown as part of local governance and monitoring.
4. A separate central governance account, controlled by the publisher, shares resources with the publisher account and provides access to publisher data using central governance and metadata access.
5. An advertiser client application starts integration. Amazon Managed Workflows for Apache Airflow creates the Airflow DAGs; advertiser transformations extract local S3 data, access related publisher data through the central governance and metadata layer, and can use EMR or Glue.
6. The advertiser account stores the transformed and joined data in final Amazon S3 buckets.
7. The diagram shows Amazon S3 data exported to Amazon Redshift or queried with Amazon Athena, then Amazon QuickSight provides dashboards and insights to analysts.

## What applying it brings

| | |
|---|---|
| Zones | Publisher AWS account; central governance AWS account controlled by the publisher; advertiser AWS account |
| Publisher services | Amazon S3, EMR, Glue, Lake Formation, Glue Data Catalog, CloudTrail, and CloudWatch |
| Central governance | Lake Formation and Glue Data Catalog with an advertiser data catalog |
| Advertiser services | S3, Lake Formation, Glue Data Catalog, CloudTrail, CloudWatch, EMR or Glue, MWAA, Redshift, Redshift Spectrum, Athena, and QuickSight |
| Slots | Advertiser client application; advertiser integration workflow; analytics dashboards; analyst |
| Data stores | Encrypted advertiser data, transformed advertiser data, local advertiser input data, final joined dataset, metadata catalogs, and Redshift tables |

## Assumptions and boundaries

- AWS describes three account roles. The zones represent those roles, not a prescribed account count, region, network topology, or deployment configuration.
- The source calls the publisher objects encrypted but does not specify encryption settings, key ownership, retention, file formats, or permissions. The central account is publisher-controlled, but its cross-account sharing configuration is not detailed.
- The numbered prose names Amazon Redshift Spectrum as the direct S3 query option, while the diagram labels Amazon Athena. Both are represented as documented alternatives; they are not treated as equivalent services. AWS also says QuickSight accesses tables in Redshift or Redshift Spectrum, while the diagram shows Athena and Redshift.
- AWS names no third-party service provider or product. The advertiser client application is a generic system slot; Apache Airflow is included as the open-source framework underlying the named AWS-managed MWAA service.
- The repository specification has no object-store or dataset element kind, so S3 buckets and metadata catalogs are represented as `database` elements. The source does not define the exact bucket layout, transformations, data schemas, access policies, or which optional processing/query service each account selects.
- This is an architecture template, not deployable AWS infrastructure. It does not create accounts, buckets, policies, workflows, or analytics resources.

## What teams usually customize

- Map publisher, governance, and advertiser account roles to the project's AWS accounts and establish the actual cross-account permissions.
- Choose EMR or Glue for each transformation stage and define job logic, schedules, formats, and data-quality checks.
- Define encryption and key management, bucket organization, retention, catalog scope, and Lake Formation permissions.
- Select the required query path—Redshift, Redshift Spectrum, Athena, or a combination—and configure QuickSight datasets and dashboards.
- Replace the generic client-application slot and dashboard/analyst roles with the project's own systems and users.
