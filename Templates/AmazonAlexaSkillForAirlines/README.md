# Amazon Alexa Skill for Airlines

A conversational airline experience on AWS, based on the [Amazon Alexa Skill for Airlines reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/alexa-skill-airlines/alexa-skill-airlines.html) and its [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/alexa-skill-airlines/alexa-skill-airlines.pdf#alexa-skill-airlines). AWS describes using an airline's Amazon Alexa skill to book and manage air travel and integrating with Passenger Service System (PSS) providers such as Amadeus, Sabre, and Navitaire.

## What it is for

The template captures the AWS-described building blocks for an airline voice experience: customer authentication and account linking, natural-language understanding, access to skill content and conversation state, application logging, and analytics. It is an architecture blueprint for adapting in M1Spec, not an AWS deployment or a complete implementation design.

## How it works

1. A traveler invokes the airline skill through Amazon Alexa. On first interaction, the skill prompts for authentication and sends an authentication card to the Amazon Alexa app.
2. The authentication flow uses Amazon S3, API Gateway, and Lambda to retrieve authentication-provider information. Amazon Cognito authenticates the customer, and CloudFront is used to improve network latency. AWS does not specify the exact request path or account-linking protocol.
3. API Gateway, an Application Load Balancer, and Amazon ECS provide the NLU integrations layer. DynamoDB and ElastiCache provide low-latency access to skill content and conversation state.
4. CloudWatch Logs, Amazon Data Firehose (called Amazon Kinesis Data Firehose in the original diagram), and S3 capture and store application logs. Lambda performs real-time analytics with results in Aurora. SageMaker AI runs models on conversation trends and stores inference results in DynamoDB.
5. An S3 object PUT starts a Step Functions workflow that updates application content and Alexa skill configuration.
6. The airline skill integrates with a PSS provider. AWS gives Amadeus, Sabre, and Navitaire as examples but does not select a provider or specify the integration interface.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | API Gateway, Lambda, Cognito, CloudFront, S3, ECS, Application Load Balancer, DynamoDB, ElastiCache, CloudWatch Logs, Data Firehose, Aurora, SageMaker AI, Step Functions |
| Slots | **Airline traveler**; **Airline Alexa Skill backend**; **Natural-language understanding engine**; **Real-time application analytics**; **Conversation trend models**; **Airline Passenger Service System (PSS)** |
| Databases | Skill content and inference results on DynamoDB; conversation state on ElastiCache; real-time analytics results on Aurora |
| External services | Amazon Alexa and the airline-selected PSS provider; the catalog lists Amadeus, Sabre, and Navitaire as alternatives named by AWS |

## Assumptions and unspecified details

The AWS page and diagram do not define the selected PSS vendor, API contracts or protocols, identity-provider configuration format, authentication scopes, individual Lambda functions, ECS task topology, NLU implementation, data schemas, cache policy, Aurora engine, S3 bucket layout, logging retention, or the SageMaker input and training pipeline. The diagram also does not specify regions, availability, network boundaries, IAM policies, scaling settings, or deployment automation. The blueprint does not add those details or infer a booking, payment, or airline operations workflow beyond the source description.

The SageMaker result is shown in DynamoDB because AWS explicitly says inference results are stored there; the source does not identify where conversation trends originate, so no input data-flow edge is asserted. Likewise, the providers are modeled as an airline-selected PSS slot rather than as simultaneous integrations.

## What teams usually customize

- **The airline's systems.** Map the skill, NLU, analytics, model, and PSS slots to the systems in the project, or omit slots that do not apply.
- **The PSS integration.** Select the provider and specify the airline's supported APIs, authentication, and data mapping.
- **Identity and the Alexa experience.** Choose the account-linking and customer identity details, interaction model, and authentication-card behavior.
- **Data and operations.** Define schemas, retention, caching, network placement, IAM, observability, capacity, and deployment settings for the intended AWS environment.
