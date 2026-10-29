# Industrial Data Platform on AWS

An M1Spec architecture template based on AWS's [Industrial Data Platform on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-data-platform/industrial-data-platform.html), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Connect industrial edge telemetry, imagery, manufacturing applications, and enterprise data to AWS storage, data engineering, machine learning, and application access services. The architecture also returns inference results to industrial enterprise systems.

## Architecture and data flow

1. **Equipment telemetry.** AWS IoT Greengrass connectors and edge Lambda functions ingest and transform machine and PLC telemetry. AWS IoT SiteWise organizes equipment data; that data flows through AWS IoT Core and Amazon Data Firehose into an Amazon S3 data lake.
2. **Images.** AWS Storage Gateway synchronizes image files into Amazon S3. AWS Panorama handles imagery from industrial IP cameras as a separate path; AWS does not specify its output destination in the supplied architecture notes.
3. **Manufacturing applications.** Applications can stream data through Amazon Kinesis Data Streams or transfer files through AWS Transfer Family; both paths deliver data to S3.
4. **Enterprise data.** Industrial enterprise systems export historical data to S3 and reference data to Amazon DynamoDB, keeping those storage paths distinct.
5. **Data engineering and machine learning.** AWS Glue engineers datasets and catalogs them. Amazon SageMaker AI builds machine-learning models, or Amazon Lookout for Equipment detects equipment anomalies. AWS Lambda initiates inference and returns prediction results to industrial enterprise systems.
6. **Application access.** Dashboards and applications use AWS AppSync to access datasets and inference results.

## What applying it brings

| | |
|---|---|
| Zones | **Industrial edge** and **AWS** |
| Platforms | AWS IoT Greengrass, AWS IoT SiteWise, AWS IoT Core, Amazon Data Firehose, Amazon S3, AWS Storage Gateway, AWS Panorama, Amazon Kinesis Data Streams, AWS Transfer Family, Amazon DynamoDB, AWS Glue, Amazon SageMaker AI, Amazon Lookout for Equipment, AWS Lambda, and AWS AppSync |
| Slots | **Machines and PLCs**, **Image file sources**, **Industrial IP cameras**, **Manufacturing applications**, **Industrial enterprise systems**, and **Dashboards and applications**; the industrial edge gateway, model-development system, and inference workflow |
| Containers | Telemetry connectors and edge Lambda on the Greengrass gateway |
| Databases | Organized SiteWise asset data, S3 data lake, synchronized image files, manufacturing event stream, DynamoDB reference data, and Glue dataset catalog |

AWS's source notes do not identify a third-party service or vendor. The industrial, manufacturing, and enterprise applications in the blueprint are generic system slots, not assumed products.

## Assumptions and unspecified details

- The blueprint preserves separate equipment telemetry, synchronized image files, IP-camera imagery, manufacturing streams, manufacturing file transfers, historical exports, and reference-data paths. Kinesis Data Streams and Transfer Family are alternatives for the manufacturing application path; SageMaker AI and Lookout for Equipment represent alternative machine-learning approaches.
- AWS does not specify the industrial-system products, file formats, data schemas, Greengrass component configuration, IoT Core routing rules, Firehose configuration, S3 layout, or AWS Glue transformations. The template does not prescribe them.
- The source notes do not identify where AWS Panorama sends its output, how Panorama integrates with the data lake, what triggers Lambda inference, where model artifacts or prediction results are stored, or the AppSync API and data-source configuration. These details are left to consumers rather than inferred.
- The blueprint groups AWS services and industrial system slots logically. It does not prescribe physical placement, regions, accounts, networks, security controls, retention, availability, service configuration, or infrastructure code.

This is an architecture template, not an AWS deployment plan.

## What consumers usually customize

- Map the generic industrial, manufacturing, enterprise, image-source, and dashboard slots to the project's actual systems.
- Choose streaming or file transfer for manufacturing data, and define schemas, data quality, S3 organization, DynamoDB reference-data modeling, and retention.
- Configure Greengrass components, SiteWise assets, IoT Core routing, Firehose delivery, Storage Gateway synchronization, Panorama processing, and Glue jobs/catalogs.
- Select SageMaker AI or Lookout for Equipment, then define inference triggers, model lifecycle, result handling, and safe feedback to operational systems.
- Define AppSync APIs and data sources, along with identity, network, account, regional, and security controls.
