# Multi-region API Gateway with CloudFront

A globally accessible, multi-region API based on AWS's [Multi-region API Gateway with CloudFront reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/multi-region-api-gateway-with-cloudfront/multi-region-api-gateway-with-cloudfront.html). The source is part of the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS also links the [architecture diagram PNG](https://docs.aws.amazon.com/architecture-diagrams/latest/multi-region-api-gateway-with-cloudfront/images/multi-region-gateway.png) and an [editable PowerPoint diagram ZIP](https://docs.aws.amazon.com/architecture-diagrams/latest/multi-region-api-gateway-with-cloudfront/samples/multi-region-api-gateway.zip).

## What it is for

An API that presents clients with one global endpoint while directing requests to a regional API Gateway endpoint based on client latency. Regional Lambda functions handle requests against an Aurora Global Database, which replicates data between Regions.

## How it works

1. Clients call the API through Amazon CloudFront. AWS Certificate Manager supplies the SSL/TLS certificate attached to the CloudFront distribution.
2. Lambda@Edge queries Route 53 to select the regional API endpoint with the lowest latency for the client. AWS describes this edge logic as abstracting endpoint-specific authorization so clients can authenticate seamlessly to regional endpoints.
3. CloudFront forwards the request to the selected regional Amazon API Gateway endpoint, which invokes the API handler running on AWS Lambda in that Region.
4. Each regional handler accesses its Aurora Global Database cluster. Aurora routes writes to the primary cluster and replicates changes to clusters in other Regions.

The template models the source's multi-region pattern with a primary and a secondary Region. It does not specify actual Region names or imply that two Regions are the only supported configuration.

## What applying it brings

| | |
|---|---|
| Zones | AWS global services, a primary AWS Region, and a secondary AWS Region |
| Platforms | CloudFront, Route 53, AWS Certificate Manager, Lambda@Edge, API Gateway in each Region, Lambda in each Region, and Aurora Global Database clusters |
| Slot | **API client**, mapped to a system in the project |
| Databases | Primary and secondary regional Aurora clusters |

AWS does not identify a third-party service in this architecture. The template does not add one.

## Assumptions and scope

- The source describes multiple Regions without naming them; the primary/secondary labels here are generic.
- The source describes Aurora as a relational database but does not name its database engine, schema, or workload.
- The source explains global writes and cross-region replication but does not provide replication-lag guarantees, consistency behavior, or failover and promotion procedures.
- The source does not specify Lambda implementation details, API configuration, networking, security controls beyond the certificate and authorization description, monitoring, or operational procedures. These are not invented or modeled here.
- This is an architecture template, not deployable AWS infrastructure. It contains no account, Region, VPC, API route, or CloudFront configuration.

## What teams usually customize

- Map **API client** to the appropriate project system and replace the generic primary/secondary Regions with the intended deployment topology.
- Decide the API Gateway configuration, Lambda handlers and runtimes, Aurora engine and schema, network boundaries, and the security and operational controls required by the workload.
- Define the regional read/write behavior, failover and promotion process, and acceptable replication lag based on the application's consistency requirements.
- Adjust Route 53 latency-based routing and CloudFront/Lambda@Edge behavior for the actual domain, request patterns, and authorization design.
