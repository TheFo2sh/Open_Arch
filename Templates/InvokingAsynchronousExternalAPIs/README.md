# Invoking Asynchronous External APIs

An AWS reference architecture for invoking third-party APIs that accept long-running jobs and notify the caller when they complete. It uses Step Functions task tokens to pause request workflows, SQS to decouple dispatch and callback processing, and an API Gateway callback endpoint to receive completion notifications.

Source: [AWS Reference Architecture: Invoking Asynchronous External APIs](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/invoking-async-external-apis/invoking-async-external-apis.html), including its [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/invoking-async-external-apis/images/invoking-async-external-apis.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/invoking-async-external-apis/invoking-async-external-apis.pdf). The source is also listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## Use case

Use this pattern when an external service accepts work asynchronously, imposes a maximum requests-per-second contract, and later calls back with a job ID. The workflow can wait for that callback without holding a synchronous request open, then fetch and process the external result.

## Architecture and data flow

1. A request workflow starts, creates a task token, and waits for a callback with a configured timeout. The payload and token are placed on an Amazon SQS request queue.
2. AWS Lambda polls the request queue and can use AWS AppConfig to apply a dynamic delay. It starts an express Step Functions workflow; polling batch size, reserved concurrency, and maximum concurrency are additional invocation-rate controls.
3. The express workflow sends the payload through a rate-limited API Gateway HTTP proxy to the third-party asynchronous API. Failed requests go to an SQS dead-letter queue. Amazon CloudWatch monitors the request queue length; AWS suggests considering a contract adjustment if that queue grows beyond its limits.
4. The workflow token and the returned external job ID are stored together in Amazon DynamoDB.
5. When the job completes, the third-party service posts a callback to an API Gateway endpoint. Mapping templates transform the callback, enqueue it on an SQS callback queue, and let the endpoint respond immediately.
6. A second Lambda poller reads callback messages, looks up the token by job ID in DynamoDB, and resumes the waiting Step Functions workflow. Failed callback messages go to a callback dead-letter queue.
7. The resumed workflow passes the job ID to a result-processing step, which fetches the result from the third-party results service.

## Assumptions and unspecified details

AWS describes the pattern but does not name the third-party API provider or results store. Their interfaces and callback contract are therefore represented generically; no vendor, protocol, payload shape, authentication method, or data-store implementation is assumed.

The external provider is represented by a system slot, while the two generic third-party catalog entries document the API and results dependency. They are not `metadata.uses` values: this repository reserves those values on software elements for libraries.

The initiating application and how it starts the first workflow are also not specified. The requesting-application system is a slot for a consumer's system, not a prescribed AWS endpoint. The diagram focuses on the application flow and does not define VPCs, networking, IAM policies, encryption, retry/backoff settings, queue retention, timeout values, concrete RPS limits, or deployment configuration. This template models an architecture and does not deploy AWS infrastructure.

## What consumers usually customize

- Map the asynchronous API integration and requesting-application slots to the project's systems, and map or omit the external provider slot.
- Replace the generic third-party API and results service with the actual provider and document its callback, authentication, and results contract.
- Set workflow timeouts, retry and dead-letter handling, SQS settings, Lambda concurrency and polling batch size, AppConfig delay, and API Gateway rate limits to match the provider's contract.
- Add the project's networking, security, observability, and deployment details when translating this blueprint into infrastructure.
