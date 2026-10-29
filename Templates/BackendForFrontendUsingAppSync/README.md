# Backend for Frontend Using AppSync

A serverless Backend for Frontend (BFF) that gives frontend clients UI-ready data projections and refreshes the UI with event-driven notifications. This template follows AWS's [Backend for Frontend Using AppSync reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/backend-for-frontend-appsync/backend-for-frontend-appsync.html), published May 6, 2022.

Sources: [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/backend-for-frontend-appsync/backend-for-frontend-appsync.html), [diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/backend-for-frontend-appsync/images/backend-for-frontend-appsync.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/backend-for-frontend-appsync/backend-for-frontend-appsync.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Use a BFF when frontend clients need a purpose-built, denormalized view of domain data and real-time notifications when that view changes. Amazon AppSync provides the GraphQL API and subscriptions; AWS Lambda and Amazon DynamoDB support event processing and the projection store.

## How it works

The sequence below follows AWS's numbered diagram and accompanying description:

1. Purpose-built BFF event consumers catch events from existing application microservices and update denormalized data in Amazon DynamoDB for frontend use.
2. On UI load, frontend clients authenticate with Amazon Cognito, then query the AppSync GraphQL API. AppSync reads DynamoDB directly or uses an optional AWS Lambda BFF query handler.
3. Frontend clients subscribe to later data changes using AppSync subscriptions over WebSockets.
4. Event consumers continue processing relevant application events and updating the projection.
5. Amazon DynamoDB Streams captures changes to the BFF tables and asynchronously triggers a Lambda stream-handler function.
6. The stream handler invokes an empty mutation on the AppSync GraphQL schema to trigger the subscription.
7. AppSync sends a change notification to connected clients, which refresh their UI content.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Amazon Cognito, AWS AppSync, AWS Lambda, Amazon DynamoDB, Amazon DynamoDB Streams |
| Slots | **Frontend client applications**, which authenticate, query and subscribe; **Application microservices**, which emit domain events; **Frontend user** |
| BFF slot | **BFF handlers**, running on AWS Lambda, for event consumers, an optional query handler and a stream handler |
| Database | **BFF projection tables** on Amazon DynamoDB |

No separate third-party product is identified in AWS's diagram or description. The application microservices are shown as generic event sources, not as a named vendor service.

## Assumptions and unspecified details

- The frontend applications and domain microservices are existing project systems, so they are modeled as system slots rather than as deployed implementations.
- AWS documents the roles and flow, but does not specify a language/runtime, event bus or transport, event schema, projection/table design, GraphQL schema/resolvers, authorization configuration, or deployment/network topology. This template does not choose those details.
- The query handler is optional: AWS describes AppSync reading DynamoDB directly **or** through a Lambda handler.
- The diagram shows DynamoDB Streams as the source of the asynchronous Lambda trigger; operational settings such as stream view type, retries, and retention are not specified.
- The architecture is a blueprint only; it does not deploy infrastructure.

## What teams usually customize

- Map the frontend, domain microservices and BFF handler slots to the project's actual systems.
- Decide which AppSync reads use direct DynamoDB access and which need a Lambda query handler.
- Define the domain events, projection shape, table keys, GraphQL schema and resolver behavior.
- Configure Cognito authorization, Lambda runtime and permissions, stream processing behavior, and the network/deployment details for the workload.
