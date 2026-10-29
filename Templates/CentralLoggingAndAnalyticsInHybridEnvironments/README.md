# Central Logging and Analytics in Hybrid Environments

An AWS reference architecture for collecting and analyzing metrics and logs from on-premises virtual machines and VMware Cloud on AWS. It centralizes CloudWatch data in a customer-owned VPC, then routes log data to search, object storage, and analytics services. This template describes the architecture; it does not deploy AWS infrastructure.

Source: [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/central-logging-analytics-hybrid/central-logging-analytics-hybrid.html) ([diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/central-logging-analytics-hybrid/central-logging-analytics-hybrid.pdf); [catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)).

## How it works

1. The Amazon CloudWatch agent runs on on-premises virtual machines and virtual machines in VMware Cloud on AWS.
2. The on-premises metrics and logs reach the customer-owned VPC through AWS connectivity, including the AWS Transit Gateway shown in the source. VMware Cloud on AWS sends CloudWatch data to an endpoint in the customer VPC through an elastic network interface.
3. A CloudWatch log group can subscribe to Amazon Data Firehose in the logging account. Firehose continuously delivers logs to Amazon S3 and the search destination shown in the diagram, Amazon Elasticsearch Service (now Amazon OpenSearch Service).
4. AWS Glue builds the Data Catalog and runs ETL jobs. Amazon Athena uses the catalog to discover and query data in S3; Amazon Redshift reads and loads S3 data files. Amazon QuickSight visualizes results from Athena and Redshift.
5. CloudWatch log data can also be exported for use by other systems, including ISV solutions.

## What applying it brings

| | |
|---|---|
| Zones | **Customer data center** on an unspecified platform; **AWS** |
| Slots | **On-premises virtual machines**, **VMware Cloud on AWS virtual machines**, and an external **ISV integration** |
| Platforms | VMware vSphere, VMware Cloud on AWS and its depicted EC2 bare metal/SDDC layers; Amazon VPC, CloudWatch, Direct Connect, Transit Gateway, elastic network interface, Data Firehose, S3, OpenSearch Service, Glue, Athena, Redshift, and QuickSight |
| Containers | CloudWatch agent on both virtual-machine groups |
| Databases | CloudWatch logs and metrics; S3 log archive; OpenSearch searchable log data; Glue Data Catalog; Redshift analytics data |

## Assumptions and unspecified details

The source identifies the services and high-level flows but does not specify the ISV product, the exact VMware/EC2 configurations, account and VPC topology, Transit Gateway attachments, log-group selection or retention, agent configuration, subscription filters, Firehose buffering or transformations, S3 layout, OpenSearch sizing, Glue schemas and ETL logic, Athena queries, Redshift design, or QuickSight identity and dashboard configuration. The blueprint therefore keeps the ISV endpoint as a system slot, reflects only the infrastructure layers named in the diagram, and does not invent these implementation choices. Network boundaries and the underlying AWS resources are shown as architecture platforms, not as deployable infrastructure.

## What teams usually customize

- Map the customer data center and workload slots to the project's actual environments and systems.
- Choose which accounts, VPCs, regions, connectivity paths, and log groups participate.
- Define collection, retention, filtering, processing, storage, search, query, and dashboard details to fit operational and compliance needs.
- Replace or omit the ISV integration slot depending on whether external log export is required and which product is selected.
