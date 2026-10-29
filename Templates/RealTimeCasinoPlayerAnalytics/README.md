# Real-Time Casino Player Analytics

A real-time casino telemetry and personalization pipeline based on AWS's [Real-Time Casino Player Analytics reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/real-time-player-casino-analytics/real-time-player-casino-analytics.html), published April 19, 2022.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/real-time-player-casino-analytics/real-time-player-casino-analytics.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/real-time-player-casino-analytics/images/real-time-player-casino-analytics.png)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/real-time-player-casino-analytics/real-time-player-casino-analytics.pdf#real-time-player-casino-analytics)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Casino operators and game developers can calculate player ratings in real time, predict personalized offers for use during play, and analyze shuffler telemetry to recommend proactive maintenance.

## How it works

1. Slot-machine telemetry reaches **Amazon API Gateway** over the casino's private network; shuffler telemetry enters **AWS IoT Core**.
2. Both streams are sent to **Amazon Kinesis Data Streams** and remain distinct as slot and shuffler paths.
3. **AWS Lambda** processes slot data to calculate customer ratings and retains raw slot records in **Amazon S3**. Raw shuffler records are also retained in S3.
4. **AWS Glue** transforms and deduplicates raw slot and shuffler records into refined S3 data.
5. Refined slot data trains and updates a player-offer model in **Amazon SageMaker AI**, which predicts offers for individual customers.
6. Customer profiles, ratings, and offers are updated in **Amazon DynamoDB** for quick retrieval by slot machines, a customer rating application, games, and other applications.
7. Refined shuffler data is stored in **Amazon Aurora** for aggregation and retrieval.
8. Refined shuffler data also supports metrics and a failure-prediction model; predicted failures inform proactive maintenance recommendations.
9. Games and applications consume profiles, ratings, and offers to promote offers during a game or session. **Amazon CloudWatch logging** also appears in the diagram.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | API Gateway, IoT Core, Kinesis Data Streams, Lambda, S3, Glue, SageMaker AI, DynamoDB, Aurora, and CloudWatch |
| Slots | **Casino slot and gaming machines**, **Casino shuffler system**, **Customer rating application**, and **Games and applications** map to the project's systems; **Casino player** maps to a project user |
| Data stores | Slot and shuffler telemetry streams on Kinesis; raw and refined slot/shuffler data on S3; player profiles, ratings, and offers on DynamoDB; shuffler analytics data on Aurora |
| Processing | Lambda calculates player ratings; SageMaker AI trains and updates the offer and failure-prediction models |

## Assumptions and details not specified by AWS

- The blueprint keeps slot and shuffler streams and their refined S3 data distinct to make the two documented processing paths clear. AWS does not prescribe schemas, partitioning, retention, or exact stream and bucket layouts.
- The source calls out a private casino-floor network but does not specify its topology, protocols, or how the VPC and private connectivity are configured.
- The diagram shows CloudWatch logging without identifying log sources or configuration; no log flow is inferred in the blueprint.
- AWS does not specify the Aurora engine or schema, the rating formula, model features or training schedule, offer-ranking logic, maintenance recommendation destination, or API contracts.
- The source names no required third-party service. These are architecture slots and managed-service relationships, not a deployment plan; IAM, encryption, availability, scaling, and operational settings remain implementation decisions.

## What teams usually customize

- Map the machine, shuffler, rating-application, game/application, and player slots to their own systems and users; omit slots that do not apply.
- Define telemetry schemas, stream and bucket organization, deduplication rules, retention, and the private-network integration.
- Set rating calculations, SageMaker training and inference behavior, offer rules, and how recommendations reach maintenance teams.
- Choose the Aurora engine and data model, DynamoDB keys and access patterns, API contracts, and logging sources.
