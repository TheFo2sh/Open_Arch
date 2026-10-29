# DynamoDB Global Replication with Data Localization

An M1Spec architecture template based on AWS's [DynamoDB Global Replication with Data Localization](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/dynamodb-global-replication/dynamodb-global-replication.html), published March 10, 2023. AWS's [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/dynamodb-global-replication/images/dynamodb-global-replication.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/dynamodb-global-replication/dynamodb-global-replication.pdf) are linked from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Replicate global DynamoDB items across Regions while restricting localized items to their designated Region. The design uses an authority-to-Region map, selective event routing, and origin-side anonymization for moved localized items. It models custom item-level replication, not DynamoDB Global Tables.

## How it works

The blueprint depicts Region A as the origin/service Region and Region B as one destination, following the AWS diagram. The numbered flow follows AWS's description:

1. Regional application services write items with a localization-authority field to the origin Region's DynamoDB table.
2. DynamoDB Streams captures mutations and triggers an AWS Lambda event-listener function.
3. The listener reads the authority-to-Region map from AWS AppConfig. It filters out items localized in the current Region and items already moved.
4. For eligible mutations, the listener publishes item details and the localization Region to the origin Region's Amazon EventBridge bus.
5. EventBridge rules route global items to all participating Regions and localized items only to the Region identified in the event.
6. In a destination Region, an EventBridge rule delivers received item details to an AWS Lambda replicator function.
7. The replicator writes the items to that Region's DynamoDB table, then publishes a completion event for the origin Region.
8. EventBridge routes the completion event back to the origin, where a rule invokes the anonymizer Lambda function.
9. The anonymizer removes sensitive information from moved localized items and stamps the destination Region. It leaves global items unchanged.
10. Services update global items and localized items in the Region where those items are stored.
11. When a localized item has already moved, a service makes a cross-Region call to the authoritative Region's DynamoDB table to update it. The diagram also shows services writing remotely localized items to the destination table.

## What applying it brings

| | |
|---|---|
| Zones | **Region A - service region** and **Region B - data-localization region**, both on AWS |
| Platforms | Amazon DynamoDB, DynamoDB Streams, AWS Lambda, AWS AppConfig, and Amazon EventBridge |
| Slots | **Regional services**, **Event-listener function**, **Replicator function**, and **Anonymizer function** |
| Databases | A regional DynamoDB table in each Region |

The AWS source does not identify a third-party service, so this template does not add one.

## Assumptions and unspecified details

- The blueprint uses Region A and Region B as the source diagram's origin and one destination. Repeat destination-region components and routing rules for additional participating Regions; the diagram does not prescribe a Region count.
- AWS draws AppConfig above the Region swim lanes. The blueprint places the authority map in Region A because the depicted origin listener reads it; AWS does not specify whether the configuration is shared or separately deployed.
- The source does not specify table keys or schemas, stream view type, event schema, authority-map values, EventBridge rule patterns, delivery/retry and idempotency behavior, or the exact sensitive fields and anonymization policy. Define these to match the application and its localization requirements.
- The diagram describes a reference flow, not a deployment. It does not prescribe account boundaries, network topology, IAM policies, encryption settings, or operational monitoring; those are not modeled here.

## What teams usually customize

- Map Region A and Region B to the project's AWS Regions, add the other Regions in scope, and map each localization authority to its authoritative Region.
- Adapt the source and destination table schemas, event payloads, and service slots to the project's systems.
- Define which fields are sensitive, how moved records are anonymized, and how the destination stamp affects reads and writes.
- Specify event delivery, failure handling, idempotency, access control, networking, encryption, and observability for the target environment.
