# Emerson Plantweb Optics Data Lake for Health Care and Life Sciences

An M1Spec architecture template based on AWS's [Emerson Plantweb Optics Data Lake for Health Care and Life Sciences](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/emerson-plantweb-optics-data-lake-hcls/emerson-plantweb-optics-data-lake-hcls.html).

## What it is for

The architecture brings manufacturing and laboratory data from Emerson Plantweb Optics Data Lake (PWODL) into a governed AWS data lake. AWS identifies use cases including end-to-end batch reporting, real-time exception handling, batch review and release, continuous process verification, manufacturing quality modeling, and digital technology transfer.

## Architecture and data flow

1. Plant and manufacturing sources include LIMS, CMMS, MES, batch processing, configuration management, document management, and PLCs. PWODL collects these inputs through its Plantweb core and producer connectors.
2. PWODL sends records through its Kinesis producer to Kinesis Data Streams (using the PutRecords API), its Kafka producer to Amazon MSK, and its MQTT producer to AWS IoT Core topics. The diagram also shows API Gateway in the Kinesis ingress path.
3. Amazon Data Firehose reliably delivers streaming data to an Amazon S3 data lake. The diagram shows a Lambda integration on the MSK data path; its exact processing details are not described.
4. Amazon Comprehend extracts key phrases, entities, and sentiment from file-based data and log files. The diagram also shows AWS IoT Core data routed through an IoT rule to AWS IoT SiteWise.
5. Amazon Managed Grafana visualizes PWODL data through a plug-in for the PWODL API.
6. AWS Lambda provides read and write services to the PWODL REST API. It also writes SageMaker AI/ML results back to on-premises PWODL deployments.
7. Amazon SageMaker AI is used to develop, train, and deploy machine-learning models.
8. AWS Control Tower establishes and governs a regulated landing zone with AWS Organizations.
9. AWS Lake Formation and the AWS Glue Data Catalog govern and catalog the lake; Amazon Redshift queries the data, and Amazon QuickSight visualizes insights.

The AWS diagram depicts Plantweb Enterprise Core in an AWS VPC alongside factory-side Plantweb deployments. This template represents the PWODL integration as a system slot and does not prescribe a network topology or deployment boundary.

## Source material

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/emerson-plantweb-optics-data-lake-hcls/emerson-plantweb-optics-data-lake-hcls.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/emerson-plantweb-optics-data-lake-hcls/images/emerson-plantweb-optics-data-lake-hcls.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/emerson-plantweb-optics-data-lake-hcls/emerson-plantweb-optics-data-lake-hcls.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Assumptions and limits

- AWS does not specify the detailed connector configuration, payload schemas, transformations, data retention, model design, or the MSK-to-lake Lambda processing; these are left to the implementation.
- The VPC, accounts, organizational units, and network/security configuration are depicted but are not a deployment plan. No region, availability design, service sizing, or infrastructure-as-code is prescribed.
- Control Tower support for Good Automated Manufacturing Practice (GAMP) guidance is not a guarantee of regulatory compliance or validation. Teams must determine their own applicable controls and evidence.
- The reference is an architecture pattern, not a deployment. It does not configure or provision AWS or Emerson services.

## What teams usually customize

- Map the manufacturing and laboratory source slots and PWODL system slot to the project's actual systems and select the applicable data sources.
- Choose the producer connectors, API ingress, streaming paths, and any transformations needed for the real PWODL deployment.
- Define the data lake layout, catalog and access controls, retention, analytics, and machine-learning workflows for the organization's data.
- Specify the network, accounts, AWS Region, security controls, availability and recovery requirements, and regulated-workload validation appropriate to the deployment.
