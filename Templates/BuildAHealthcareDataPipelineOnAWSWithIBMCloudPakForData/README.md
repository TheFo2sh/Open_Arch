# Build a Healthcare Data Pipeline on AWS with IBM Cloud Pak for Data

An M1Spec blueprint based on the AWS [Build a Healthcare Data Pipeline on AWS with IBM Cloud Pak for Data](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/build-healthcare-data-pipeline-on-aws-ibm-cp4d/build-healthcare-data-pipeline-on-aws-ibm-cp4d.html) reference architecture, first published April 19, 2023. The source page links the [architecture diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/build-healthcare-data-pipeline-on-aws-ibm-cp4d/images/build-healthcare-data-pipeline-on-aws-ibm-cp4d.png) and an [editable PowerPoint in a ZIP file](https://docs.aws.amazon.com/architecture-diagrams/latest/build-healthcare-data-pipeline-on-aws-ibm-cp4d/samples/build-healthcare-data-pipeline-on-aws-ibm-cp4d.zip); it does not link a PDF.

## What it is for

The pipeline transforms patient-health information from connected medical devices and makes it available to IBM Cloud Pak for Data (CP4D) for governed data preparation, analytics, and machine learning. A healthcare application consumes deployed model endpoints to surface insights about treatment, predicted outcomes, readmission, and disease progression.

## How it works

1. Connected medical devices stream patient-health information to **Amazon Data Firehose**. **AWS Lambda** applies data-format transformations.
2. If transformation fails, **Amazon Simple Notification Service (SNS)** receives a notification and invokes a re-processing API. After successful transformation, Firehose persists the data to **Amazon Simple Storage Service (Amazon S3)**.
3. **IBM Cloud Pak for Data** uses its connection services to access data in S3 and on premises. **IBM Watson Knowledge Catalog** supports governance, enrichment, data-access rules, and masking sensitive information.
4. **IBM DataStage** runs transformation jobs that generate enriched and tailored information. **IBM Watson Studio** supports analysis and model training; trained models are deployed to **IBM Watson Machine Learning** and exposed as endpoints to the healthcare application.
5. **IBM Security QRadar XDR**, running on **Amazon EC2**, collects and aggregates Amazon VPC flow logs, AWS CloudTrail logs, and CP4D logs for security monitoring and threat alerts.

The blueprint treats the numbered source-page steps as the documented data flow; it does not imply deployment order, synchronous calls, or retry semantics beyond what AWS states.

## Assumptions and limits

- The source does not specify device protocols, healthcare-data standards, transformation rules, the re-processing API implementation, retry behavior, S3 organization or retention, or the database/storage technology behind on-premises data.
- The source does not specify how AWS, on-premises systems, and CP4D connect, where CP4D or the healthcare application is hosted, or how IAM, encryption, or network controls are configured. The CP4D and on-premises zones are logical placeholders, not deployment claims.
- IBM QRadar XDR is shown on EC2 as stated by the source. Its log-collection configuration and the implementation of the healthcare application and dashboards are not described.
- The source mentions CP4D 4.6.x service documentation; this template does not pin a deployed version or configure any infrastructure.
- The diagram's editable download is a PowerPoint inside a ZIP; the source page does not provide a PDF.

This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map **Connected medical devices**, **Re-processing API**, and **Healthcare application** to the project's own system slots.
- Specify the healthcare data format and transformations, S3 layout and lifecycle, and re-processing/error-handling behavior.
- Document the actual CP4D hosting location, connectivity to AWS and on-premises data, and the implementation and security configuration for each service.
- Adapt the IBM governance, DataStage, model-training, model-serving, and QRadar log flows to the products and controls actually in use.
