# Serverless Consumer Review Insights for CPG

This template follows AWS's [Consumer Review Sentiment Analysis for CPG](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consumer-review-sentiment-cpg/consumer-review-sentiment-cpg.html) reference architecture. Sources: the [AWS diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consumer-review-sentiment-cpg/images/consumer-review-sentiment-cpg.png), its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/consumer-review-sentiment-cpg/consumer-review-sentiment-cpg.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the architecture's initial publication to May 13, 2021.

## What it is for

A serverless, event-driven pipeline for CPG teams that ingests consumer reviews from multiple sources, translates and analyzes the text, and makes the resulting insights available in a dashboard.

## How it works

1. Review channels such as e-commerce and product websites and social-media webhooks send review data into AWS. The diagram shows an API Gateway and Lambda ingestion path; it does not define their endpoint or function behavior.
2. The diagram shows the ingestion function forwarding reviews through **Amazon Kinesis Data Firehose** to **Amazon S3**.
3. **Amazon AppFlow** securely ingests data from selected SaaS applications into S3. AWS gives Salesforce, Marketo, Slack, and ServiceNow as examples; these are optional sources, not mandatory services.
4. An S3 event invokes **AWS Lambda** to analyze raw reviews. The function uses **Amazon Translate** for language translation and **Amazon Comprehend** for sentiment analysis, key-phrase extraction, and entity extraction. The diagram shows analysis outputs delivered through Firehose to S3.
5. **AWS Glue Data Catalog** contains a logical database and table definitions that organize review data in S3.
6. **Amazon Athena** queries S3 using those table definitions and returns information to an **Amazon QuickSight** dashboard for analysts.

## Assumptions and unspecified details

- The diagram adds API Gateway, an ingestion Lambda, and Firehose delivery of analysis outputs; the numbered prose does not explain their configuration or behavior. They are included because they appear in the diagram, not as a prescription for implementation.
- AWS does not specify whether raw reviews and the sentiment, key-phrase, and entity outputs are separate buckets or prefixes in a bucket. The blueprint treats them as logical S3 datasets and does not prescribe that physical layout.
- The source does not specify which SaaS providers a deployment uses. Salesforce, Marketo, Slack, and ServiceNow are examples; a deployment only needs the sources it chooses to integrate through AppFlow.
- The source does not define input schemas, translation rules, Lambda runtimes, analysis output formats, Glue table schemas, Athena queries, dashboard layout, or processing/error behavior. These remain open.
- This is an architecture template, not deployable infrastructure. It does not prescribe permissions, encryption, networking, retention, monitoring, or service sizing.

## What teams usually customize

- Map the **Review source channels**, **SaaS review sources**, **Consumer review analysis system**, **Insights analyst**, and **Consumer review insights dashboard** slots to their own systems and users.
- Choose source integrations and configure the required AppFlow connectors and review-ingestion interface.
- Define S3 organization, data schemas, language handling, analysis outputs, catalog tables, Athena queries, and dashboard content.
- Add deployment, security, reliability, and operational details appropriate to the project.
