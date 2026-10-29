# Expose Your Data Lake as a GraphQL API

An AWS reference architecture for automatically generating and deploying a self-documented GraphQL API from a data lake's catalog, then allowing authorized external clients to query the lake over HTTPS.

Sources: [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-lake-graphql-api/data-lake-graphql-api.html), [diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-lake-graphql-api/images/data-lake-graphql-api.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/data-lake-graphql-api/data-lake-graphql-api.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The architecture was first published April 25, 2022.

## What it is for

Expose a governed S3 data lake through a GraphQL API without manually maintaining its schema and resolvers as catalog metadata changes. AWS Glue crawlers create the catalog, and a reactive Lambda and CI/CD pipeline generate and deploy updated AppSync API and Lambda resolver code.

## Architecture and data flow

1. **AWS Lake Formation** and **Amazon S3** are used to set up and govern the data lake.
2. **AWS Glue crawlers** scan the S3 buckets and build the **AWS Glue Data Catalog**.
3. **Amazon CloudWatch** monitors catalog changes and triggers an **AWS Lambda** schema generator.
4. The generator reads the latest catalog and security settings, generates API schema and resolver source code, and commits it to **AWS CodeCommit**.
5. A CodeCommit update starts **AWS CodePipeline**.
6. CodePipeline uses **AWS CodeBuild** to build the new API version and **AWS CodeDeploy** to deploy the updated **AWS AppSync** GraphQL API and Lambda query resolvers.
7. Authorized clients invoke the API over HTTPS using the chosen authentication mechanism. AppSync server-side caching is activated.
8. The Lambda resolvers translate GraphQL queries into SQL supported by **Amazon Athena**.
9. Athena jobs run synchronously through the **athena-express** library, with appropriate timeouts and result limits. Athena reads lake data and catalog metadata and writes its query results to S3.

## Assumptions and scope

- The GraphQL clients, API, and Lambda functions are slots to map to a consumer's own users and systems; their implementation is not prescribed.
- AWS does not specify the GraphQL schema, generated source-code format, resolver implementation, catalog-change event configuration, or CI/CD build and deployment settings.
- The reference says clients use a chosen authentication mechanism but does not name one. It also does not specify IAM policies, authorization details, network layout, accounts, or regions.
- The data formats and layout, Lake Formation permissions, Glue crawler configuration, Athena workgroup, S3 bucket configuration, cache policy, timeout values, and result limits are not specified.
- The architecture imports a template blueprint; it does not deploy AWS infrastructure.

## What consumers usually customize

- Map the client, API, and Lambda-function slots to the project's own users and systems.
- Define the GraphQL schema, authentication and authorization, resolver behavior, cache policy, and catalog-change trigger.
- Configure the data lake, Lake Formation permissions, crawler, Athena workgroup, S3 results location, query timeouts, and result limits.
- Adapt the source generation and CI/CD pipeline to the team's repository, build process, and deployment strategy.
