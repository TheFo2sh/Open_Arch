# Consumer Review Sentiment Analysis for CPG

An event-driven AWS architecture for near-real-time analysis of consumer packaged goods reviews. It uses Amazon Translate for optional translation, Amazon Comprehend for sentiment and text extraction, and S3, Athena, and QuickSight for data exploration.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consumer-review-sentiment-analysis-cpg/consumer-review-sentiment-analysis-cpg.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consumer-review-sentiment-analysis-cpg/images/consumer-review-sentiment-analysis-cpg.png)
- [AWS architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/consumer-review-sentiment-analysis-cpg/consumer-review-sentiment-analysis-cpg.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Consumer packaged goods teams use product reviews to understand consumer decisions and identify issues. This template captures the source's flow from external review and SaaS sources through analysis and reporting. It is an architecture blueprint for M1Spec, not a deployment or a complete AWS implementation plan.

## How it works

1. Reviews from e-commerce sites, product websites, and social-media webhooks enter through Amazon API Gateway. AWS Lambda handles the incoming requests and Amazon Data Firehose delivers the reviews to the raw area in Amazon S3.
2. Amazon AppFlow separately ingests data from selected SaaS applications into S3. The AWS page names Salesforce, Marketo, Slack, and ServiceNow as examples; these are optional sources, not mandatory dependencies.
3. An S3 object event invokes an AWS Lambda analysis function. It uses Amazon Translate to translate reviews to a base language when necessary and Amazon Comprehend for sentiment analysis, key-phrase extraction, and entity extraction.
4. A second Amazon Data Firehose delivery stream writes analysis outputs to S3. The diagram shows raw/, sentiment/, key phrases/, and entities/ data areas.
5. AWS Glue Data Catalog organizes table definitions for the S3 data. Amazon Athena queries the data with those definitions, and Amazon QuickSight presents query results in dashboards for analysts.

## What the source leaves unspecified

The source does not prescribe review APIs or webhooks, SaaS connectors to enable, data schemas, language-selection rules, analysis configuration, Firehose delivery settings, physical S3 bucket and prefix boundaries, Glue table definitions, query/dashboard contents, or security and operational controls. The blueprint treats the S3 areas and catalog database as logical datasets and does not infer a bucket count, retention policy, network layout, Region, IAM policy, or encryption configuration.

## What teams usually customize

- The review publishers and SaaS connectors, including which examples are relevant and authorized.
- The ingestion contract, review normalization, supported languages, and translation behavior.
- Which analysis outputs to retain and how to partition and catalog them.
- Athena queries, QuickSight dashboards, and analyst access.
- Deployment-specific networking, identity, encryption, monitoring, retention, and governance controls.
