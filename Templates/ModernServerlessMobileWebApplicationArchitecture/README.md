# Modern Serverless Mobile/Web Application Architecture

An M1Spec architecture template based on AWS's [Modern Serverless Mobile/Web Application Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/modern-serverless-mobile-web/modern-serverless-mobile-web.html), including its [linked PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/modern-serverless-mobile-web/modern-serverless-mobile-web.pdf#modern-serverless-mobile-web) and [diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/modern-serverless-mobile-web/images/modern-serverless-mobile-web.png). The AWS reference page was published May 10, 2021.

## What it is for

This architecture is a starting point for mobile and web applications using managed GraphQL and identity services, event-driven functions, containerized backend services, continuous delivery, and a separate analytics path. It describes an application pattern; it is not an AWS deployment or infrastructure configuration.

## How it works

1. **Client and identity.** AWS Amplify frameworks connect mobile and web clients to backend services. Amazon Cognito user pools authenticate users and issue JWTs and credentials for AWS service access.
2. **GraphQL and data.** Authenticated clients send queries, mutations, and subscriptions to AWS AppSync. Lambda resolvers receive the user's JWT and use temporary credentials from assumed IAM roles. AppSync can also connect directly to DynamoDB tables or use protected HTTP resolvers.
3. **Private container services.** The HTTP resolver forwards the JWT to Amazon API Gateway. AWS PrivateLink connects API Gateway to a Network Load Balancer and Amazon ECS on AWS Fargate services in private subnets across multiple Availability Zones. An interface endpoint provides private ECR API access. ECS workloads use DAX for frequently accessed DynamoDB data.
4. **Search and analytics.** DynamoDB table changes invoke Lambda to update an Amazon Elasticsearch Service domain. DynamoDB data is copied to Amazon Redshift for complex analytics. Application data is also streamed through Kinesis Data Firehose into an S3 data lake; AWS Glue and its Data Catalog register metadata for Athena queries, which QuickSight uses for dashboards.
5. **Delivery and engagement.** CodeCommit, CodePipeline, CodeBuild, CodeDeploy, and ECR provide the source-to-container-image deployment path to Fargate. Amazon Pinpoint supports segmented and personalized push, SMS, email, and voice campaigns.

## Source limits and assumptions

- The diagram and descriptions show two Availability Zones, private application and database subnets, security groups, and service ports, but do not specify VPC addressing, subnet layout, security-group rules, scaling values, application code, schemas, or IAM policies. Those deployment details are deliberately not invented here.
- AWS names Amazon Elasticsearch Service in the 2021 source. That name is retained for fidelity; verify the current AWS product and migration choices before implementation.
- AWS does not name an external SAML 2.0 identity provider. The blueprint includes an unspecified provider slot only to make the QuickSight federation dependency visible. The source says both QuickSight editions support SAML 2.0 federation; it does not require federation or select a provider.
- AWS lists iOS, Android, web, and React Native as possible client front ends, but does not choose a client framework beyond describing AWS Amplify. The template does not select one.
- The reference describes capabilities and flows, not a fully specified service configuration. The exact resolver mappings, API routes, data transformations, campaign settings, and delivery stages remain application-specific.

## What teams usually customize

- Map the mobile/web client, application services, source repository, delivery pipeline, dashboard, and user slots to the project's own systems and users.
- Choose the client platform and implementation, application service boundaries, API schema, resolver logic, data model, and search configuration.
- Set up the VPC, Availability Zones, subnets, endpoints, load-balancer ports, security groups, IAM roles, and scaling policies to match workload and security requirements.
- Decide which analytics and customer-engagement capabilities to use, and select an identity provider only if SAML federation is needed.
- Adapt the CI/CD stages, deployment strategy, observability, and operational controls to the team's standards.
