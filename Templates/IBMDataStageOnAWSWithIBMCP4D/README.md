# IBM DataStage on AWS with IBM CP4D

An IBM DataStage data integration and analytics architecture on AWS, following [AWS's IBM DataStage on AWS with IBM CP4D reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-datastage-on-aws-with-ibm-cp4d/ibm-datastage-on-aws-with-ibm-cp4d.html) and its [linked diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ibm-datastage-on-aws-with-ibm-cp4d/ibm-datastage-on-aws-with-ibm-cp4d.pdf).

## What it is for

A cloud-native data integration platform that collects data from enterprise and AWS data stores, transforms and enriches it with IBM DataStage, and delivers processed data to IBM Db2 Warehouse data marts for analytics and reporting.

## How it works

1. **Red Hat OpenShift Service on AWS (ROSA)** provides the managed OpenShift platform. IBM Cloud Pak for Data runs on OpenShift, with IBM DataStage jobs for data integration.
2. DataStage reads from enterprise SQL and non-SQL databases and AWS data stores. AWS's examples include Amazon S3, Amazon Aurora, Amazon Redshift, and Amazon DocumentDB.
3. DataStage transforms and loads processed data into **IBM Db2 Warehouse on Cloud**, whose data marts support reporting and analytics.
4. Marketing and finance users access data marts and build visualizations, dashboards, and reports using tools such as **IBM Cognos Analytics** and **Amazon QuickSight**.

## Assumptions and unspecified details

The template reflects only what the reference page and diagram establish. AWS groups enterprise sources together and gives SAP as an example, but does not identify a specific SAP product or the hosting of those sources. The generic enterprise data platform in this blueprint is a placeholder for that unspecified group, not a named technology.

The diagram places IBM Db2 Warehouse on Cloud within the AWS cloud boundary but does not describe its deployment or connectivity. It also does not specify regions, network topology, versions, DataStage job design or schedules, source schemas or credentials, data mart schemas, security configuration, or the hosting and integration details for IBM Cognos Analytics. These are deliberately not inferred here. This template describes an architecture, not deployable AWS infrastructure.

## What teams usually customize

- Map the IBM DataStage, IBM Cognos Analytics, marketing, and finance slots to the project's existing systems and users, or omit slots that do not apply.
- Replace the generic enterprise source placeholder with the actual source platforms and databases, and add or remove AWS data sources.
- Define the project's concrete data movement, connectivity, security, deployment, and operational details.
- Adjust the target warehouse, data marts, and analytics/reporting tools to match the team's implementation.
