# Centralized Alarms and Notifications

This template models AWS's [Centralized Alarms and Notifications reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-alarms-notifications/centralized-alarms-notifications.html). The source page links to the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralized-alarms-notifications/images/centralized-alarms-notifications.png) and the [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/centralized-alarms-notifications/centralized-alarms-notifications.pdf#centralized-alarms-notifications); both were used to model the numbered flow. The [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) lists the architecture.

## What it is for

The design centralizes alarm handling in a monitoring account, then routes notifications to account- and workload-specific destinations. It uses AWS managed services and a Lambda function to look up routing configuration and publish alarm payloads.

## How it works

The AWS page's numbered flow describes:

1. Cross-account Amazon CloudWatch alarms are created in the central monitoring account. Alarms can be tagged with resource identifiers.
2. Workload-specific configuration, including connected workload SNS topics, is stored in the central monitoring account.
3. Optionally, an Amazon SQS queue buffers AWS Lambda invocations if concurrency issues occur.
4. A central Amazon SNS topic receives alarm events.
5. A serverless function receives an event, queries Parameter Store for account and workload SNS delivery topics, validates the configured topics, and sends the payload to them.
6. Messages without workload configuration go to a monitoring Amazon SQS dead-letter queue.
7. Configured workload SNS topics deliver messages to their associated handlers.
8. Each AWS Lambda function performs a unique action; AWS gives sending email as an example.

The diagram shows the optional SQS buffer between the central SNS topic and router function, and SQS queues between workload SNS topics and Lambda functions. The page's prose describes workload SNS topics invoking the associated Lambda functions without detailing those queue subscriptions. This blueprint follows the queue-mediated path drawn in the diagram; the exact delivery and subscription configuration is not specified.

## What applying it brings

- Separate AWS zones for the central monitoring account and workload accounts, reflecting the account roles described in the source. Repeat the workload-account side as needed.
- Technology platforms for Amazon CloudWatch, Amazon SNS, Amazon SQS, AWS Lambda, and AWS Systems Manager Parameter Store.
- System slots for the central alarm notification router and workload notification handler. Map these to the project's systems or leave them out when applying the template.
- Relationships for alarm events, optional buffering, configuration lookup, routing to workload topics, the unconfigured-message dead-letter path, and the diagrammed workload queue-to-function path.

## Assumptions and unspecified details

The source does not specify the number of workload accounts or resources, AWS Regions, alarm metrics or tag schema, Parameter Store names and value format, IAM roles and permissions, SNS topic and subscription policies, SQS retention/redrive settings, Lambda runtimes or code, or the actions performed by workload functions. The template does not invent these details. The account zones reflect the prose; the diagram itself shows a single AWS Cloud boundary rather than explicit account boundaries.

AWS does not name or require a third-party service. Email is only an example of a Lambda action; an email provider or other external destination is not shown or specified.

This is an architecture template, not deployable infrastructure. It does not configure accounts, cross-account permissions, alarms, topics, queues, functions, or delivery integrations.

## What teams usually customize

- Map the account zones and system slots to the project's actual monitoring and workload accounts and systems.
- Define alarm tags, topic configuration and validation, access policies, queue subscriptions, retries, and dead-letter handling.
- Add the specific workload Lambda actions and any external delivery services required by the project.
- Keep or omit the optional central SQS buffer based on the workload's invocation concurrency requirements.
