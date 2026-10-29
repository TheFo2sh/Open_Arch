# Alfresco Digital Business Platform on AWS

A highly available Alfresco Digital Business Platform on AWS for enterprise content management and business process management, with add-ons for information governance, rendition, search, and machine-learning services.

Source: [AWS Alfresco Digital Business Platform on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/alfresco-digital-business-platform/alfresco-digital-business-platform.html) (published March 1, 2023). The [linked architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/alfresco-digital-business-platform/images/alfresco-digital-business-platform-on-aws-ra.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/alfresco-digital-business-platform/alfresco-digital-business-platform.pdf) are the sources for the depicted deployment layout.

## What it is for

The template is a starting point for teams running Alfresco Content Services (ECM) and Alfresco Process Services (BPM) on AWS. The source diagram shows an AWS VPC spanning two Availability Zones, public and private subnets, load balancers, and Auto Scaling groups for a highly available deployment.

## How it works

1. Knowledge workers use Alfresco applications from a workstation or mobile web browser.
2. The Alfresco Content Connector provides an extended content store in Amazon S3 or Amazon S3 Glacier. Amazon EFS Intelligent-Tiering is shown as an option for shared storage.
3. Alfresco Content Services provides ECM with information governance. The diagram shows Content Center administration, Identity Services, Digital Workspace, Governance Services, the Transform engine, and Alfresco Content Services across the application tiers.
4. Alfresco Business Connectors integrate with Google Docs, Salesforce, SAP, SAP Cloud, Microsoft Teams, Outlook, and Office. The diagram also shows a Microsoft 365 Connector.
5. Alfresco Intelligence Services extends the Transform engine and integrates with Amazon Textract for metadata extraction, Amazon Rekognition for image analysis, and Amazon Comprehend for text analysis.
6. Alfresco Search and Insight Engine uses Solr on Amazon EC2 with Amazon EBS for full-text search across metadata stored in a database. Alfresco Search Enterprise with Amazon OpenSearch Service is an alternative. Amazon Kendra can be used with the Alfresco data source connector for intelligent enterprise searches.
7. Alfresco Process Services provides BPM capabilities. The AWS description says it supports Amazon Aurora or Amazon RDS, including MySQL, Oracle, PostgreSQL, and Microsoft SQL Server; the diagram shows active and standby RDS.

The diagram also depicts Amazon MQ active and standby brokers, Internet and NAT gateways, bastion hosts, HTTP proxies, and AWS IAM, KMS, Certificate Manager, CloudWatch, CloudTrail, CloudFormation, and Directory Service. It includes EC2 and Amazon EKS as deployment-model choices.

## What applying it brings

- **Zone:** AWS.
- **Platforms:** The depicted AWS compute, load-balancing, network, storage, database, search, messaging, AI, identity, security, and operations services.
- **Slots:** Knowledge worker, corporate content store, Microsoft 365, Google Docs, Salesforce, SAP, and the Alfresco Digital Business Platform.
- **Containers:** Alfresco content, process, search, governance, transformation, intelligence, identity, workspace, and connector services.
- **Databases:** Extended content and archive stores, a Process Services relational database option, and search indexes where their hosting service is identified.

## Assumptions and limits

- The blueprint preserves AWS's choices as alternatives: S3 or S3 Glacier for extended content; EC2 or EKS deployment; Search and Insight Engine with Solr or Search Enterprise with OpenSearch; and Aurora or RDS for Process Services. It does not imply these alternatives are deployed simultaneously.
- AWS does not specify database engines or schemas for the content metadata database, nor does the diagram clearly assign that metadata database to the displayed Process Services RDS. The blueprint therefore does not invent a separate ACS database or claim that the Process Services database stores content metadata.
- EFS is described only as an optional Intelligent-Tiering storage choice. Its exact placement and whether it replaces or supplements S3/Glacier are not specified.
- The source does not specify network CIDRs, subnet sizing, instance types/counts, scaling policies, regions, service versions, or detailed integrations among the supporting AWS services. These details are intentionally not inferred.
- The diagram's Amazon MQ active/standby brokers and supporting IAM, KMS, ACM, CloudWatch, CloudTrail, CloudFormation, and Directory Service services are included as depicted, but AWS does not describe their exact connections to Alfresco.
- This is an architecture template, not deployable AWS infrastructure or a deployment specification.

## What teams usually customize

- Select the content store, deployment model, search backend, and Process Services database engine that match their requirements.
- Map the user and external-system slots to their own identity, content, productivity, CRM, and ERP systems.
- Add the environment-specific network, availability, sizing, security, monitoring, backup, and integration details that AWS leaves open.
