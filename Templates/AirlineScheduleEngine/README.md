# Airline Schedule Engine

An AWS reference architecture for combining batch airline schedules and real-time flight data into a scalable, fault-tolerant service for flight and schedule lookups. The template is based on AWS's [Airline Schedule Engine reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/airline-schedule-engine/airline-schedule-engine.html) and its [linked diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/airline-schedule-engine/airline-schedule-engine.pdf#airline-schedule-engine).

## What it is for

The architecture aggregates schedule and flight inputs, supports direct flight and route lookups, and combines flights using connection rules. AWS describes it as a tier-0 system using purpose-built databases, serverless compute, and a data lake.

## How it works

1. Batch schedule files, including Standard Schedules Information Manual (SSIM) inputs, and real-time Standard Schedule Messages (SSM) and flight information (FLIFO) feeds enter separate Amazon S3 staging buckets.
2. AWS Glue and Amazon EMR discover, catalog, and process the inputs, combine batch and real-time data, and write processed data back to Amazon S3.
3. Schedule files are converted into individual flights and loaded into Amazon DynamoDB for direct lookup. AWS Lambda runs flight lookups and ingests and serves FLIFO events; DynamoDB Accelerator (DAX) provides in-memory caching for lookups.
4. Route data, including mileage, day of week, seasonality, and airline type, is loaded into Amazon Neptune for origin-and-destination route lookups.
5. Schedule building applies duration and mileage rules, combines flights with connection rules stored in DynamoDB, and uses Amazon ElastiCache for Redis for performance.
6. Amazon SageMaker AI is used to improve route building and schedule lookup performance. AWS does not specify the model, training data, or exact integration.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, AWS Glue, Amazon EMR, AWS Lambda, Amazon DynamoDB, Amazon DynamoDB Accelerator (DAX), Amazon Neptune, Amazon ElastiCache for Redis, Amazon SageMaker AI |
| Slots | **Airline Schedule Engine**, **Airline schedule and flight-data feeds**, and **Connection rules dashboard** systems; generic **Flight schedule consumer** and **Airline operations user** actors |
| Databases | Batch and real-time staging data, processed schedule data, flight data, connection rules, flight lookup cache, airline routes, schedule cache |

AWS names SSIM, SSM, and FLIFO data formats but does not identify feed providers, an external vendor product, or the dashboard's implementation. Those dependencies are represented as slots rather than invented technologies. The source also does not specify APIs, protocols, deployment topology, data schemas, retention, or the exact runtime for schedule composition. No technology or placement is asserted for the dashboard. The Airport Terminal Optimizer mentioned by AWS is context for schedule data, not a component of this architecture.

## What teams usually customize

- Map the generic feed, consumer, operations, dashboard, and engine slots to the project's actual systems and users; omit slots that do not apply.
- Select feed providers and define their integration protocols, validation, and failure handling.
- Decide the API and runtime boundaries for schedule composition and dashboard deployment, which AWS does not specify.
- Define table and graph schemas, data retention, cache behavior, and the SageMaker model and integration.
- Adapt the AWS zone and services to the project's existing platform and technology catalogs.

This is an architecture template, not deployable AWS infrastructure or a deployment specification.
