# Centralized Log Analytics

An M1Spec architecture template based on AWS's [Centralized Log Analytics reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-log-analytics/centralized-log-analytics.html) ([diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/centralized-log-analytics/centralized-log-analytics.pdf#centralized-log-analytics); [catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)). AWS published the diagram on November 7, 2022. This template describes the architecture; it does not deploy AWS infrastructure.

## What it is for

Collect machine logs centrally, transform them when needed, index them in Amazon OpenSearch Service, then search and visualize them through OpenSearch Dashboards.

## How it works

1. Log producers send log lines to **Amazon S3**. The diagram shows **AWS CloudTrail**, **Amazon EC2**, and **flow logs**; AWS also lists Fluent Bit, Amazon Kinesis Agent, and the Amazon CloudWatch Agent as example collectors.
2. **Amazon S3** sends an object-create event to **Amazon SQS**.
3. **Amazon SQS** invokes an **AWS Lambda** function, which transforms string log lines into structured JSON if necessary.
4. The Lambda function sends the JSON-formatted log lines to **Amazon OpenSearch Service** with the OpenSearch `_bulk` API.
5. A **log analyst** uses **OpenSearch Dashboards** for interactive analysis, visualizations, notebooks, and dashboard monitoring.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| User slot | **Log analyst** |
| System slots | **EC2 log-producing workloads**, **Log transformation function**, and **OpenSearch Dashboards** |
| Platforms | AWS CloudTrail, Amazon EC2, Amazon VPC Flow Logs, Amazon S3, Amazon SQS, AWS Lambda, and Amazon OpenSearch Service |
| Containers | Alternative EC2 log collectors (Fluent Bit, Amazon Kinesis Agent, or Amazon CloudWatch Agent); OpenSearch Dashboards interface |
| Databases | **Collected log objects** on S3; **Searchable log data** on OpenSearch Service |

## Assumptions and unspecified details

AWS does not identify the application running on EC2, the specific flow-log source (the diagram only says “flow logs”), collector configuration, or collector-specific delivery mechanism to S3. The template interprets the diagram's “flow logs” label as Amazon VPC Flow Logs and shows the collectors as alternatives, not services that must all run together. It depicts the documented logical flow to S3 without adding an intermediary service such as Kinesis Data Firehose.

The source does not specify an AWS account layout, a region name, bucket or index configuration, retention, access controls, Lambda runtime or implementation, transformation schema, or OpenSearch sizing. The AWS page names no mandatory third-party service; Fluent Bit is one optional third-party collector choice.

## What teams usually customize

- Map the log analyst and EC2 workload slots to the project's actual people and systems.
- Choose and configure the log producers and collector implementation; select one of the listed collectors or another supported option.
- Define bucket and index names, retention, security, access, Lambda transformation logic, and the operational setup for the SQS notification.
- Add any collection or delivery services that the chosen collector configuration requires, if those are part of the project architecture.
