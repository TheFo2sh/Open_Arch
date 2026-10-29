# Architecture of Crew Management System

A multi-Region crew trip update and retrieve architecture based on AWS's [Architecture of Crew Management System](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/crew-management-architecture/crew-management-architecture.html), published November 29, 2021. The source page links to this [architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/crew-management-architecture/images/architecture_of_crew_management_ra.png) and [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/crew-management-architecture/crew-management-architecture.pdf), and describes an extension of [Architecture for Airline Crew Management Systems](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/crew-management-systems/crew-management-systems.html).

## What it is for

The template models AWS's multi-Region architecture for crew apps and corporate crew schedulers. It is an M1Spec blueprint to adapt to a project's systems; it is not an AWS deployment or infrastructure plan.

## How it works

1. Crew members use a browser or mobile app. Route 53 resolves their app domains to the nearest Region and CloudFront distribution. CloudFront serves static pages from S3; regional API Gateway endpoints provide access to read crew trip data.
2. Aurora Global Database provides cross-Region availability and low latency with Aurora Replicas. With write forwarding enabled, applications can send writes to any Global Database replica.
3. The application is deployed in multiple Regions using CloudFormation for single-click deployment. Fully managed EKS clusters host Trip Retrieve and Trip Update services, and Network Load Balancers route traffic to those services.
4. Corporate users and systems connect through AWS Direct Connect. Private API Gateway endpoints provide crew schedulers with trip read and update operations.
5. CloudWatch and monitoring tools support operational-health optimization.
6. AWS cloud security services support at-rest and end-to-end encryption. The diagram names AWS KMS, Certificate Manager, Secrets Manager, Cognito, and IAM in its security group.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Route 53, CloudFront, S3, WAF, regional and private API Gateway, Network Load Balancers, EKS, Aurora Global Database, Direct Connect Gateway, Direct Connect, CloudFormation, CloudWatch, CloudTrail, AWS Public Health Dashboard, KMS, Certificate Manager, Secrets Manager, Cognito, and IAM |
| Slots | **Crew member**, **Corporate user**, **Corporate systems**, and **Crew management services** |
| Containers | **Trip Retrieve Service** and **Trip Update Service** |
| Database | **Crew trip data** on Aurora Global Database; **Static pages** on S3 |

## Assumptions and unspecified details

- The blueprint consolidates the repeated regional EKS clusters, API Gateway endpoints, and Network Load Balancers into logical multi-Region platforms. AWS does not name the Regions, and they are not modeled as separate deployment zones.
- The source diagram shows a corporate data center with a crew scheduler and other systems but does not identify vendors or products. These remain user/system slots; no third-party service is named by AWS.
- The diagram includes CloudTrail and AWS Public Health Dashboard, but the page does not describe their exact role in this application flow. They are listed without inferred relationships.
- AWS refers to monitoring tools generically but does not identify products beyond CloudWatch in the diagram. No additional monitoring product is invented.
- The security group includes KMS, Certificate Manager, Secrets Manager, Cognito, and IAM, and the page calls for at-rest and end-to-end encryption. It does not specify which resource uses each service or detail identity, key, certificate, or secrets configuration.
- The source does not specify API contracts, trip-data schema, service internals, authentication flows, network topology, scaling configuration, or the exact CloudFormation templates. The diagram's VPCs are not expanded into infrastructure details.

## What teams usually customize

- Map the crew member, corporate user, corporate systems, and crew management services slots to the adopting project's own elements.
- Define the regional deployment topology, API contracts, and the data model for trip retrieval and updates.
- Choose the corporate connectivity, identity, encryption, and observability configuration that fits the environment.
- Specify CloudFormation templates, network boundaries, service scaling, and operational policies before implementation.
