# Amazon OpenSearch Trending Queries with AWS Glue and Amazon Bedrock

An M1Spec architecture template based on AWS's [Amazon OpenSearch Trending Queries with AWS Glue and Amazon Bedrock](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/opensearch-trending-queries/opensearch-trending-queries.html) reference architecture ([PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/opensearch-trending-queries/opensearch-trending-queries.pdf#opensearch-trending-queries)). The source page was published December 18, 2024.

## What it is for

Identify frequently used and trending article-search queries so teams can improve the search experience and make content-strategy decisions. The flow combines Amazon OpenSearch Service search, an AWS Glue data pipeline with K-means clustering, and Amazon Bedrock language-model selection.

## How it works

1. End users search articles through the search application, which retrieves results from Amazon OpenSearch Service. The application also sends query logs through an Amazon API Gateway proxy to Amazon Kinesis Data Streams.
2. Amazon Data Firehose buffers and consolidates the logs (the source diagram specifies a 15-minute maximum buffer interval). An AWS Lambda function compresses them before storing them in Amazon S3.
3. A daily Amazon EventBridge schedule starts an AWS Step Functions workflow. AWS Glue crawlers catalog the raw logs, transformed Parquet data, and clustered queries. AWS Glue jobs consolidate logs to Parquet and use K-means clustering to group queries, storing each data stage in S3.
4. Amazon Athena queries the top N queries per cluster and passes the results as CSV to Lambda. Lambda invokes Amazon Bedrock to select the most relevant query in each cluster and stores those results in Amazon DynamoDB.
5. When users open the search page, application logic uses API Gateway and Lambda to retrieve trending queries from DynamoDB. Business analysts use a trending-query API to analyze the results and guide content strategy.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | OpenSearch Service, API Gateway, Kinesis Data Streams, Data Firehose, Lambda, S3, EventBridge, Step Functions, Glue, Athena, Bedrock, DynamoDB |
| Slots | **Search application**, including the article search page; **Trending-query API client**, for business analysts; **End user** and **Business analyst** |
| Containers | Query-log compression, query selection, trending-query API, Glue crawlers, Parquet transformation and K-means clustering jobs |
| Databases | Article search index, Kinesis query-log stream, S3 raw/Parquet/cluster data, Glue Data Catalog, DynamoDB trending-query results |

## Assumptions and details AWS does not specify

This template models the documented flow, not deployable AWS infrastructure. AWS does not specify the search application's implementation, the API's request/response contract, data schemas, query retention, access controls, network topology, or the exact Glue job code and K-means parameters. It also does not name the Amazon Bedrock model, prompt, or model configuration, or explain how the source application streams query events to the proxy. The template leaves these as design choices rather than prescribing values. The user-facing applications are slots; their implementations are not inferred.

The reference architecture names AWS services only; it does not identify a required third-party service. No third-party provider or technology has been added to the catalog.

## What teams usually customize

- Map the search application, analyst API client, and users to the project's own systems and people, or omit slots that do not apply.
- Adapt the API Gateway endpoints, query-event schema, S3 retention and partitioning, Glue jobs and clustering parameters, and the Bedrock model/prompt to the search workload.
- Set the schedule, Firehose buffering, security/IAM policies, network boundaries, service sizing, and deployment details for the target environment.
- Change how trending-query results are ranked, stored, exposed, or consumed by the search page and analysts.
