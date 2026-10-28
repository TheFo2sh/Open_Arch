# Account and Security Strategy for the Serverless Data Platform

An M1Spec template based on AWS's [Account and Security Strategy for the Serverless Data Platform](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/account-security-data-platform/account-security-data-platform.html), including its [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/account-security-data-platform/account-security-data-platform.pdf). The source is part of the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

The reference architecture organizes a serverless data platform into AWS accounts to isolate resources and security responsibilities. It is aimed at travel and hospitality data, where multiple systems of record feed governed analytics, machine learning, and customer dashboards.

## How it works

The blueprint treats the accounts shown in the diagram as AWS zones: master, security, network, shared services, ingestion, analytics production, ML sandbox, logs and audit, dashboards, DevOps tools, and analytics sandbox.

1. **Govern accounts and access.** AWS Control Tower and AWS Organizations organize accounts from the master account. The security account uses AWS Security Hub, GuardDuty, CloudTrail, Macie, and KMS to maintain security visibility. The shared services account provides workforce access using AWS IAM Identity Center (called AWS Single Sign-On in the source diagram) and a customer-selected identity provider.
2. **Connect the network.** AWS Direct Connect provides on-premises connectivity through AWS Transit Gateway to account VPCs. The network layout and routing are intentionally not specified.
3. **Ingest data.** The diagram shows AWS SFTP (now AWS Transfer Family), API Gateway and DynamoDB, Kinesis Data Streams and Data Firehose, S3 staging, Step Functions, and Lambda. Batch and streaming data feed the data platform; the source does not assign individual source systems to a specific ingestion mechanism.
4. **Govern and analyze data.** Shared data services use Lake Formation, the Glue Data Catalog, Glue, EMR, and Athena. The analytics production account stores data in S3, runs containerized workloads on ECS, exposes APIs, and deploys and monitors models with SageMaker. Redshift Spectrum can query S3 data.
5. **Develop and present data products.** An ML sandbox supports SageMaker notebooks, training, processing, and ground-truth labeling. An analytics sandbox separates raw, model, and report data and offers Redshift, EMR, and Athena. Dashboards use Redshift with Amazon QuickSight or customer-selected third-party tools.
6. **Operate the platform.** CloudWatch centralizes logs for audit, with S3 log and backup storage shown in the logs and audit account. A DevOps account uses CodeCommit, CodeBuild, CodePipeline, and CodeDeploy to deploy code and artifacts to ingestion and analytics accounts. Shared services also include DNS and directory management. The source additionally notes golden AMIs as a shared capability.

The diagram also shows travel/business systems of record such as airline schedules and operations, crew and airline information, ERP, loyalty, reservations, and surveys. Data consumers, data engineers, and ML practitioners are represented as user slots.

## Assumptions and details not specified

This is an architecture template, not deployable AWS infrastructure. AWS describes account responsibilities and service roles, but does not specify account IDs, organization policies, roles, network CIDRs or routes, regions, identity-provider configuration, encryption/key policies, security rules, log-retention periods, data schemas, individual source-to-ingestion mappings, pipeline code, or scaling settings. The blueprint does not invent these details.

The diagram names third-party categories rather than required products. Okta and Ping Identity are examples for identity; McAfee and Cloudflare are examples for CASB. Dashboard providers and third-party tools in the shared services account are not named. These are represented as generic third-party systems and are optional choices, not prescribed technologies. The source also uses older product labels such as AWS SFTP, AWS Single Sign-On, and Kinesis Data Firehose; the catalog uses their current AWS service names. AWS does not specify how golden AMIs are created or distributed, so the template does not invent a service or workflow for that capability.

## What consumers usually customize

- Map or omit the systems-of-record and user slots to match the project's domain and responsibilities.
- Choose account boundaries, identity provider, CASB, dashboard provider, and shared third-party tools.
- Define account governance, least-privilege access, encryption, security monitoring, and audit retention.
- Select network topology, source-specific batch and streaming paths, data schemas, and service configurations.
- Decide which data lake, analytics, machine-learning, and DevOps services are needed in each environment.
