# Personalization and Predictive Consumer Engagement for CPG

An AWS reference architecture for combining batch CPG data and real-time consumer activity to provide personalized product recommendations and targeted notifications.

## Sources

- [AWS architecture chapter](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/predictive-consumer-engagement-cpg/predictive-consumer-engagement-cpg-chapter.html)
- [AWS diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/predictive-consumer-engagement-cpg/images/predictive-consumer-engagement-cpg.png)
- [AWS diagram download](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/predictive-consumer-engagement-cpg/samples/predictive-consumer-engagement-cpg.zip)
- [AWS documentation PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/predictive-consumer-engagement-cpg/predictive-consumer-engagement-cpg.pdf)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Use case and data flow

The design helps CPG companies use activity across digital channels and customer data to make consumer engagements more relevant.

1. **Prepare batch data.** Transaction and ERP/CRM data are ingested using AWS Glue DataBrew, which cleans and normalizes the inputs. AWS Glue Crawler captures source metadata in the Data Catalog.
2. **Ingest live events.** Web and mobile clickstream events pass through Amazon API Gateway to Amazon Kinesis Data Streams. Amazon Data Firehose writes event data to Amazon S3 for potential retraining and future use.
3. **Update interactions.** The Amazon Personalize event tracker captures real-time activity and adds it to the interactions dataset. The diagram shows an AWS Lambda integration in this path.
4. **Load model inputs.** Amazon Personalize uses interactions (user activity), items (such as category and availability), and users (such as age and loyalty membership).
5. **Serve recommendations.** A serving layer using Amazon API Gateway and AWS Lambda retrieves recommendations from Amazon Personalize for web and mobile experiences.
6. **Send targeted messages.** AWS Lambda integrates Amazon Personalize recommendations with Amazon Pinpoint to send personalized notifications to consumers.

## What applying the template brings

| | |
|---|---|
| Zone | **AWS** |
| Services | AWS Glue Crawler, AWS Glue Data Catalog, AWS Glue DataBrew, Amazon API Gateway, Amazon Kinesis Data Streams, Amazon Data Firehose, AWS Lambda, Amazon S3, Amazon Personalize, Amazon Pinpoint |
| Slots | **Transaction systems**, **ERP/CRM systems**, **Web channel**, **Mobile channel**, and **Consumer messaging channels** are project-owned systems; **Consumer** is a user |
| Data stores | AWS Glue Data Catalog; S3 interaction, item, and user training objects; Amazon Personalize interactions, items, and users datasets |

## Assumptions and unspecified details

- The architecture does not name a third-party product or vendor. Transaction and ERP/CRM sources and the web/mobile experiences are represented as project-owned system slots; their implementations are not inferred.
- AWS does not specify the CPG data schema, S3 bucket names or object formats, identity resolution, event payloads, campaign rules, model recipe, API contracts, or notification channel configuration. The blueprint does not prescribe them.
- S3 data is represented by interaction, item, and user object stores to show the diagram's training inputs. The exact bucket and prefix layout is not specified.
- The diagram indicates an AWS Lambda integration between the stream and Amazon Personalize event tracker, but does not detail its code or event mapping.
- The source describes conceptual data and service flows, not a deployment topology. Availability zones, VPCs, IAM policies, encryption settings, scaling, retention, and infrastructure-as-code are outside this template.
- This is an architecture template, not deployable AWS infrastructure.

## What consumers usually customize

- Map the transaction, ERP/CRM, web, mobile, and messaging slots to the project's actual systems and channels.
- Define the event schema, batch transformations, user/item/interaction data mappings, and Amazon Personalize model configuration.
- Select the web/mobile serving API contract and decide how campaign targeting, notification consent, and delivery channels work.
- Specify S3 layout, security and access policies, retention, operational monitoring, availability, and deployment details for the project.
