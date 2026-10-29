# Domain Consistency in Event-Driven Architectures

An event-driven integration pattern for keeping a monolith and bounded-context microservices consistent without a distributed transaction. This template is based on AWS's [Domain Consistency in Event-Driven Architectures](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/domain-consistency-event-driven/domain-consistency-event-driven.html) reference architecture, its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/domain-consistency-event-driven/images/domain-consistency-event-driven.png), and its [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/domain-consistency-event-driven/domain-consistency-event-driven.pdf).

## What it is for

Use a transactional outbox and change-data-capture pipeline to publish domain events reliably from systems that own their data. Each service commits its own entity changes and outbox record together, while other bounded contexts process those events asynchronously and maintain local projections. Cross-domain data is eventually consistent; there is no distributed ACID transaction.

## How it works

1. A custom Amazon EventBridge bus supports event choreography between domains.
2. AWS Database Migration Service (DMS) captures changes to the monolith's relational database and sends them to Amazon Kinesis Data Streams.
3. The monolith writes to an outbox table with its entity tables in one ACID transaction.
4. A Lambda function listening to the Kinesis CDC stream reads outbox inserts and publishes them as domain events to the EventBridge bus.
5. EventBridge rules route relevant external events to each bounded-context microservice's Amazon SQS queue. A Lambda function handles the messages, and an SQS dead-letter queue receives failures.
6. The incoming events build eventually consistent DynamoDB projections of external domains for local logic to read.
7. Each microservice repeats the local transaction across its entity tables and event outbox table.
8. DynamoDB Streams captures inserts to each microservice's outbox.
9. A Lambda function handles the stream and publishes those inserts as domain events to the same EventBridge bus.

The blueprint shows one representative bounded context to make the repeated queue, consumer, entity/outbox, and projection pattern readable. Each service has its own queue and data; the model does not imply a single shared queue or database.

## Assumptions and source boundaries

- The architecture flow above follows the nine steps on AWS's source page and the linked diagram/PDF.
- AWS's supplied architecture notes do not identify the relational database product or engine. The template represents it as an abstract relational data platform rather than assuming RDS, Aurora, or a specific engine.
- The diagram also depicts Step Functions orchestration, Lambda functions, and Fargate containers for the bounded-context microservice. AWS does not specify their workflow or call paths, so the template shows the services without inventing those details.
- The source does not name monolith or microservice products, bounded-context names/count, event schemas, Lambda runtime, DMS task settings, queue policies, retry limits, or deployment/network details. These are intentionally left unspecified.
- No third-party service is identified in the supplied AWS flow, so none is added.
- This is an M1Spec architecture template, not deployable AWS infrastructure. It does not prescribe account setup, IAM, networking, retention, throughput, or operational configuration.

## What teams usually customize

- Map the monolith, bounded-context microservice, and domain-event handler slots to systems in the applying project.
- Repeat or tailor the representative queue, consumer, and projection model for the project's actual bounded contexts and event subscriptions.
- Replace the abstract relational database only after choosing the actual database product and engine.
- Add project-specific event contracts, failure handling, security, deployment, and operational details once those are designed.
