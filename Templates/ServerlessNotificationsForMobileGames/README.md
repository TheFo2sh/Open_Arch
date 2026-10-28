# Serverless Notifications for Mobile Games

A serverless notification pipeline for mobile games, based on AWS's [Serverless Notifications for Mobile Games](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-notifications-mobile-games/serverless-notifications-mobile-games.html) reference architecture. The linked [Step Functions diagram and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-notifications-mobile-games/serverless-notifications-step-functions.html) are the source for this blueprint.

## What it is for

The pipeline registers mobile devices, processes game-triggered and marketing-requested messages, and delivers push notifications to selected subscribers. AWS describes flash offers, in-game events, and segmented campaigns as use cases.

## How it works

1. A mobile game client registers devices or submits direct notification information to an Amazon API Gateway REST endpoint.
2. API Gateway starts the AWS Step Functions registration workflow. AWS Lambda performs registration logic, and endpoint data for Amazon SNS is stored in Amazon DynamoDB.
3. The game server starts the notification workflow when it receives information from the game client.
4. A marketing employee can request a campaign or one-off notification through API Gateway; Amazon Cognito handles authorization.
5. The notification workflow enriches the message and reads endpoint or recipient-segment information from DynamoDB.
6. The workflow can use Amazon Translate to translate notification content.
7. Amazon SNS sends messages to subscribers using mobile device tokens and push-provider credentials. AWS names Firebase and Apple Push Notification Service (APNs) as examples.
8. Raw data is sent to Amazon S3 for cold-data analytics.

## What applying it brings

| | |
|---|---|
| Zone | AWS |
| Platforms | API Gateway, Cognito, Step Functions registration and notification workflows, Lambda, DynamoDB, SNS, Translate, and S3 |
| Slots | **Mobile game client**, **Game server**, and **Marketing employee**; map these to the project's existing systems and user |
| Database | **Notification endpoint registry** on DynamoDB and **Raw notification data** on S3 |
| External services | Firebase Cloud Messaging and Apple Push Notification Service are provider examples used with SNS |

## Assumptions and scope

- The source URL redirects to the Step Functions diagram. AWS also publishes a separate [Amazon Pinpoint alternative](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-notifications-mobile-games/serverless-notifications-pinpoint.html); this template models the redirected Step Functions flow and does not combine the two alternatives.
- AWS does not specify API schemas, state-machine states, DynamoDB table keys, endpoint or segment data models, or the exact message-enrichment rules. The blueprint does not invent them.
- AWS identifies Cognito authorization for the marketing request but does not detail the identity configuration, roles, or API authorization policy.
- The source does not prescribe provider credentials or how device tokens are collected and refreshed. Firebase and APNs are examples; consumers choose supported providers and configure their SNS applications, topics, and subscriptions.
- The diagram also depicts other delivery paths, including ADM, MPNS, HTTP(S), SMS, and email. Their availability and configuration are not specified by the source narrative, so they are not modeled as required integrations here.
- This is an architecture template, not deployable AWS infrastructure. Network layout, IAM policies, encryption, retries, monitoring, data retention, and regional deployment remain implementation decisions.

## What teams usually customize

- API routes, request contracts, authentication, and the registration and notification state machines.
- The DynamoDB endpoint/recipient model, segment selection, message enrichment, and notification targeting.
- Push providers, credentials, SNS topics and subscriptions, localization rules, and delivery channels.
- What raw data is retained in S3, for how long, and which analytics services consume it.
