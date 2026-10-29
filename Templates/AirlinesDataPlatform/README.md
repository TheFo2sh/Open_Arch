# Airlines Data Platform

An AWS data platform for airline domains, based on AWS's [Airlines Data Platform reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airlines-data-platform/airlines-data-platform.html). AWS publishes the diagram in the [Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) and as a [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/airlines-data-platform/airlines-data-platform.pdf#airlines-data-platform).

## What it is for

The architecture replaces or augments on-premises data infrastructure with domain-owned data products and separate storage and compute. It supports flight operations, passenger services, and loyalty, enabling operational events, batch data, customer analytics, and machine learning to share governed data products.

## How it works

1. Airline systems of record publish operational events through **Amazon Kinesis Data Streams** and send batch data through **AWS Transfer Family**. External demographic and address data is ingested through **AWS Data Exchange** and **Amazon AppFlow**.
2. **Amazon S3** stores real-time and batch staging data, parquet data sets, and reportable data sets. **Amazon EMR** and **AWS Glue** transform and catalog the data; **AWS Glue Data Catalog** publishes metadata for query workloads.
3. **AWS Step Functions** orchestrates customer event processing using **AWS Lambda** and **AWS Fargate**, which update customer 360 data in **Amazon DynamoDB**. The DynamoDB event stream feeds a second Step Functions workflow for complex event processing; it publishes events to subscribers and to the diagram's **WorldTracer** and **NetTracer** baggage-tracking destinations.
4. **Amazon Redshift** holds enterprise warehouse schemas and customer data marts for known query patterns. **Amazon Athena** queries the data lake directly for ad hoc analysis. **Amazon SageMaker AI** supports customer segmentation, lifetime value, and other customer analysis models. **Amazon QuickSight** provides customer analytics to dashboard users.
5. Customer-facing API clients use **Amazon API Gateway**, which invokes Step Functions microservices. Dashboard users consume analytics through QuickSight.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Kinesis Data Streams, Transfer Family, Data Exchange, AppFlow, S3, EMR, Glue, Glue Data Catalog, Step Functions, Lambda, Fargate, DynamoDB, API Gateway, Redshift, SageMaker AI, Athena, and QuickSight |
| Slots | **Airline systems of record**, **External data sources**, **Customer event subscribers**, **WorldTracer**, **NetTracer**, **API clients**, and **Dashboard users**; map these to the project's actual systems and users |
| Data stores | Real-time and batch staging, parquet and reportable data sets on S3; customer 360 data on DynamoDB; catalog metadata in Glue Data Catalog; customer data marts in Redshift |
| Workloads | Data transformation workloads on EMR; customer event handlers on Lambda; customer microservices on Fargate; customer service APIs on API Gateway; customer analysis models on SageMaker AI; analytics dashboards on QuickSight |

This is an architecture template, not deployable infrastructure. It does not specify networks, accounts, regions, availability, service configuration, or infrastructure-as-code.

## Assumptions and unspecified details

- The source page describes the data lake, data warehouse, ad hoc queries, customer models, operational data stores, and event-driven patterns. The diagram identifies the services and data products but does not define detailed schemas, event contracts, transformation jobs, or workload boundaries.
- The source names **WorldTracer** and **NetTracer** as baggage-event destinations, but does not specify their provider, APIs, protocols, authentication, or the integration mechanism. They are shown as external system slots; the technology catalog records the names without inventing those details.
- The source groups flight operations, PSS, DCS, CRS, loyalty, baggage management, booking, and survey products as systems of record, but does not prescribe specific products or their individual interfaces.
- The diagram distinguishes real-time staging, batch staging, parquet, and reportable data sets, but does not define retention, partitioning, data governance, or access policies.
- The diagram shows Amazon EMR and AWS Glue in the transformation area without prescribing which jobs run on which service. Both are represented as transformation paths rather than assigning undocumented job responsibilities.

## What teams usually change

- Map the source-system, external-data, event-subscriber, and user slots to the actual airline systems and roles; remove sources and destinations that are not in scope.
- Select the data products, schemas, formats, transformation jobs, and governance policies for each domain.
- Decide which transformations belong on EMR or Glue, and whether both are needed.
- Define the event contracts and integrations for WorldTracer, NetTracer, and other customer event subscribers.
- Adapt the warehouse, data marts, customer 360 model, and analytics/modeling workloads to the airline's query and customer-analysis needs.
- Add the network, security, availability, account, and deployment details required by the implementation.
