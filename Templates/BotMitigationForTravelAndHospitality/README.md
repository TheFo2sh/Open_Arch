# Bot Mitigation for Travel and Hospitality

A serverless edge architecture for detecting and mitigating bots on travel and hospitality websites, based on AWS's [Bot Mitigation for Travel and Hospitality reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/bot-mitigation-travel-hospitality/bot-mitigation-travel-hospitality.html) and its [linked PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/bot-mitigation-travel-hospitality/bot-mitigation-travel-hospitality.pdf#bot-mitigation-travel-hospitality).

## What it is for

The design filters malicious traffic and can reduce price scraping and automated purchases before requests reach a travel or hospitality website. It is an architecture template, not deployable AWS infrastructure.

## How it works

1. Website or mobile-app endpoints send HTTP requests through **Amazon CloudFront**. Travelers and automated bots or scrapers are represented as user slots.
2. **AWS WAF** uses rules to block common attack patterns, including known bad IP lists, HTTP headers, and URI strings. AWS says these rules can be updated programmatically.
3. **AWS Lambda@Edge** intercepts CloudFront requests. Custom logic can inspect requester signals, make external HTTP/API calls to AWS services, and process or reject requests.
4. The custom validation logic can use **Amazon DynamoDB** to store requester fingerprints. AWS describes this as one option; alternatively, the solution can integrate with an **AWS Partner Network (APN)** bot mitigation offering.
5. Requests that pass validation continue through CloudFront to the configured origin: an **Amazon S3 website** or an HTTP endpoint. Rejected requests do not continue.
6. CloudFront logs can be streamed in real time to **Amazon Kinesis** for traffic analytics.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | CloudFront, AWS WAF, Lambda@Edge, DynamoDB, Kinesis Data Streams, and optionally S3 |
| Slots | **Travel and hospitality endpoints**, **APN bot mitigation partner**, and **HTTP website origin** systems; **Traveler or guest** and **Bot or scraper** users |
| Database | **Requester fingerprints** on DynamoDB, for the custom-service option |

Systems and users are slots: when applying the template, map them to the project's own systems and users or leave them out. The partner integration and origin options are alternatives, not services that AWS requires to be deployed together.

## Assumptions and unspecified details

AWS does not name an APN partner, define the partner API, provide the Lambda@Edge code or bot-scoring thresholds, or specify the fingerprint schema and retention. It also leaves the website/mobile-app implementation and HTTP origin unspecified. The blueprint therefore describes an optional partner slot and selectable S3/HTTP origins without choosing a vendor, protocol, schema, or implementation. AWS notes that rules can be updated programmatically but does not identify a rule-management service in this architecture.

## What teams usually customize

- Choose the origin that matches the application: an S3 website or an existing HTTP endpoint.
- Choose either custom fingerprint storage in DynamoDB or a specific APN partner, and map the partner slot to the chosen integration.
- Implement and tune the Lambda@Edge request validation and AWS WAF rules for the site's traffic, bot signals, and false-positive tolerance.
- Decide which CloudFront logs to stream and how Kinesis data will be analyzed, retained, and consumed.
- Map the endpoint, traveler, and bot slots to the project's own software systems and user types.
