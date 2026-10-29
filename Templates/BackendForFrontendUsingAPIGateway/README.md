# Backend for Frontend Using API Gateway

AWS's serverless Backend for Frontend (BFF) pattern serves UI-ready data projections and refreshes frontend clients with event-driven notifications.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/backend-for-frontend-api-gateway/backend-for-frontend-api-gateway.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/backend-for-frontend-api-gateway/images/backend-for-frontend-api-gateway.png)
- [AWS architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/backend-for-frontend-api-gateway/backend-for-frontend-api-gateway.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## Use case

Use this pattern when a frontend needs API responses shaped for its UI and near-real-time updates after changes to application domain data. Purpose-built BFF event consumers keep denormalized DynamoDB projections current; API Gateway serves initial queries and WebSocket connections, while a Lambda stream handler pushes change notifications to connected clients.

## Architecture and data flow

1. Before a UI load, BFF event consumers receive relevant application microservice events and update denormalized projection tables in Amazon DynamoDB.
2. On UI load, frontend clients authenticate with Amazon Cognito and query the BFF through an Amazon API Gateway REST or HTTP API. The API can read DynamoDB directly or use a query handler built with AWS Lambda.
3. Clients connect to the BFF WebSocket endpoint provided by API Gateway. The connection event invokes a Lambda handler that updates the connected clients table.
4. BFF event consumers continue processing relevant application events and updating the frontend data projections.
5. Amazon DynamoDB Streams captures data changes in the BFF database. A Lambda trigger asynchronously invokes the BFF stream-handler function with new stream records.
6. The stream handler sends change notifications to clients connected to API Gateway WebSockets.
7. Frontend clients receive the notifications and refresh their UI content.

The template models the projection tables and connected clients table as separate logical databases hosted by DynamoDB. The application microservices and both BFF consumer/handler systems are slots to map to the consuming project's systems; no implementation language or event-broker technology is specified by AWS.

## Assumptions and unspecified details

The diagram names application microservices and BFF event consumers, but does not identify their runtime, deployment platform, event source/broker, event schema, or delivery guarantees. It also does not specify the projection schema or keys, API routes, exact Cognito authorization configuration, WebSocket message format, Lambda trigger settings, stream retention, network layout, regions, scaling, or operational/security controls. These details are intentionally left for consumers to choose; no additional third-party service is named in the reference architecture.

## What teams usually customize

- Map the frontend user and application/BFF system slots to the project's own domain systems.
- Define the event source, event contracts, projection shape, and rules for keeping projections current.
- Choose whether API queries read DynamoDB directly or through a Lambda query handler, and configure API routes and Cognito authorization.
- Define WebSocket connection lifecycle, client-record schema, notification payloads, and UI refresh behavior.
- Design deployment, networking, availability, access controls, monitoring, retries, and other operational concerns for the target environment.

This is an architecture template, not deployable AWS infrastructure.
