# Synchronous Data Mesh for GraphQL Queries

An API-composition pattern for querying data where it lives, without first moving it to a central data lake or warehouse. Domain teams expose data as products through GraphQL APIs, while clients compose the results they need.

Source: [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/synchronous-data-mesh-graphql/synchronous-data-mesh-graphql.html) and its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/synchronous-data-mesh-graphql/synchronous-data-mesh-graphql.pdf). The source was first published April 25, 2022.

## What it is for

Clients that need a synchronous response assembled from data owned by different domain teams can query each domain's GraphQL API. AWS AppSync exposes the API, and its resolvers obtain data from domain databases, a data lake, or external HTTP APIs. Large datasets are a separate AWS Data Exchange subscription path, not part of the synchronous GraphQL query.

## Architecture and data flow

1. A client sends a GraphQL query over HTTPS to the domain's **AWS AppSync** API. AppSync can use server-side caching.
2. AppSync composes resolver results. **AWS Lambda** functions can provide those resolvers.
3. For data in a lake, a Lambda resolver uses **Amazon Athena** to run SQL queries against data in **Amazon S3**, with table metadata from the **AWS Glue Data Catalog**. The source calls out the **athena-express** library for running Athena jobs asynchronously.
4. For database data, resolvers can access **Amazon Aurora** or **Amazon DynamoDB** directly from AppSync, or use Lambda functions as proxy resolvers.
5. Lambda resolvers can also fetch data by invoking remote HTTP APIs.
6. Other AWS domains can expose their own GraphQL APIs, and non-AWS domains can expose GraphQL APIs using other technologies. Clients can query those peer APIs as well.
7. Clients needing large datasets can subscribe through **AWS Data Exchange** instead of retrieving them through synchronous API queries.

## Assumptions and scope

- The blueprint models the AWS domain and the peer API patterns described by the reference. Client, domain API, resolver, peer API, remote HTTP API, and large-dataset consumer elements are slots, not prescribed application implementations.
- AWS does not specify the GraphQL schema, resolver code, database schemas, data formats, external API providers, non-AWS GraphQL technology, or the data-set delivery implementation. These are intentionally left open.
- The reference is an architecture pattern, not a deployment design. It does not specify accounts, regions, networking, identity and access management, authentication, or infrastructure configuration.
- Athena's asynchronous query behavior and use of athena-express are documented; the reference does not prescribe query-result storage or additional query lifecycle handling.

## What consumers usually customize

- Map the client and domain slots to their own users and systems; omit peer API or large-data subscription slots they do not need.
- Define the GraphQL schema, resolver behavior, cache settings, and which data sources each field uses.
- Choose database and data-lake layouts, remote API providers, and any non-AWS GraphQL implementation.
- Design deployment concerns such as identity, authorization, networking, regions, and infrastructure in the consuming architecture; they are outside this template.
