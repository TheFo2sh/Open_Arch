# Guidance for Contextual Intelligence for Advertising

An event-driven, serverless architecture for extracting contextual metadata from publisher content, mapping it to an industry taxonomy, and enriching programmatic advertising bids. This template follows AWS's [architecture guidance](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/contextual-intelligence-advertising/contextual-intelligence-advertising.html), [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/contextual-intelligence-advertising/images/guidance-for-contextual-intelligence-for-advertising-ra.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/contextual-intelligence-advertising/contextual-intelligence-advertising.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the architecture's initial publication to April 6, 2022.

## What it is for

Demand-side platforms, supply-side platforms, and publishers can use contextual signals from the content people consume to inform advertising audiences without relying on third-party cookies. The pipeline uses AWS AI and machine-learning services to analyze content and map the results to a taxonomy such as the IAB Content Taxonomy.

## How it works

1. DSPs, SSPs, or publishers invoke **Amazon API Gateway** to trigger content discovery and fetch text, images, audio, and video from the supplied content.
2. A serverless crawler, orchestrated by **AWS Step Functions**, explores and downloads content. **Amazon DynamoDB** stores ephemeral discovery data.
3. The crawler or an existing content-management-system API extracts media and stores it in **Amazon S3**.
4. S3 stores discovered content, including text, images, and video; available metadata is stored in DynamoDB for analysis.
5. A content-discovery completion event starts controller orchestration using Step Functions, **AWS Lambda**, and **Amazon SNS**.
6. SNS events invoke Lambda functions for content analysis with **Amazon Comprehend**, **Amazon Rekognition**, and **Amazon Transcribe**.
7. DynamoDB stores analysis results such as topics, sentiment, and object labels.
8. The **Contextual Intelligence Taxonomy Mapper (CITM)** uses a **BERT** model hosted on **Amazon SageMaker AI** to map DynamoDB metadata to an industry-standard taxonomy, for example the IAB Content Taxonomy.
9. A Lambda function gets the mapping and stores it in DynamoDB for the category service.
10. Bidding servers invoke an API built on API Gateway to fetch categories from DynamoDB and use them to inform bids.

## Assumptions and unspecified details

- The external DSPs, SSPs, publishers, bidding servers, optional CMS, and taxonomy are modeled as system slots. AWS does not name specific organizations, CMS products, or taxonomy-access services.
- The IAB Content Taxonomy is an example of a mapping target, not a specified runtime API or third-party hosted service. The blueprint does not prescribe how taxonomy data is acquired, licensed, versioned, or synchronized.
- AWS does not specify crawler implementation, the content-discovery API contract, event schemas, DynamoDB table design, BERT variant or training, analysis configuration, error handling, retries, or the exact trigger wiring. The separate DynamoDB elements represent logical data sets, not a prescribed physical table layout.
- The source does not define regions, networking, identity and access management, encryption, retention, observability, deployment tooling, or service sizing. None is added here.
- This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the advertising-partner, bidding-server, CMS, and taxonomy system slots to the systems in the project; omit the optional CMS slot if content comes only from the crawler.
- Select the content sources, taxonomy and BERT model configuration, and the mapping and category data formats.
- Define API contracts, event schemas, access controls, retention, resiliency, and operational requirements for the actual deployment.
