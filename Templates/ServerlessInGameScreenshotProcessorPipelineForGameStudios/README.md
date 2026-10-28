# Serverless In-Game Screenshot Processor Pipeline for Game Studios

A serverless AWS pipeline for moderating and transforming in-game screenshots, storing their metadata and serving the resulting gallery. This template follows the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/serverless-in-game-screenshot-processor-pipeline-game-studios/serverless-in-game-screenshot-processor-pipeline-game-studios.html), published December 23, 2021. AWS provides the diagram as an image on that page and an editable PowerPoint in its linked ZIP.

## What it is for

Game studios can accept screenshots from game clients, check the images for inappropriate content, optionally notify players of the filtering result, and make processed images available to the game client and community site.

## How it works

1. The game client uploads a screenshot and player metadata to a REST API hosted by **Amazon API Gateway**. The community site also uses the API to request gallery metadata.
2. **Amazon Cognito** is AWS's recommended way to authenticate requests handled by API Gateway. AWS also describes a custom Lambda authorizer that can authenticate through an external identity provider; no provider is named or required by the reference.
3. API Gateway invokes an **AWS Lambda** image processor. During preprocessing it sends the image to **Amazon Rekognition**'s `DetectModerationLabels` API. A filtering-result notification can be sent with **Amazon SNS**.
4. The raw image can optionally be stored in an **Amazon S3** bucket. The processor can resize or otherwise transform the image and add a watermark, then upload the processed result to an S3 bucket for processed screenshots.
5. The processor extracts available game metadata (for example, player ID, timestamp, and in-game location) and stores it with the processed image's S3 key in **Amazon DynamoDB**.
6. To show a gallery, the game client or community site requests the screenshot metadata through API Gateway. A separate Lambda retrieval function reads the associated DynamoDB item; **Amazon DynamoDB Accelerator (DAX)** can optionally cache those reads.
7. The clients retrieve the images from **Amazon CloudFront**, which fronts the processed-screenshot S3 bucket.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | API Gateway, Cognito, Lambda, Rekognition, SNS, S3, DynamoDB, DynamoDB Accelerator, CloudFront |
| Slots | **Player**, **Game client**, **Community site**, the Lambda-hosted **Screenshot processing service**, and an optional external identity provider |
| Functions | **Image processor function**, **Image retrieval function**, and optional **Custom authorizer function** |
| Data stores | Optional raw-screenshot S3 bucket, processed-screenshot S3 bucket, DynamoDB screenshot metadata, and optional DAX read cache |

## Assumptions and details not specified by AWS

- The reference names no required third-party service. Cognito is recommended; an external identity provider is an optional alternative, but its vendor, protocol, and integration are not specified.
- The reference does not define API routes or request/response formats, image file formats or size limits, transformation rules, watermark content, moderation thresholds or rejection behavior, notification channels, or metadata schema and retention.
- The diagram's prose says the processed image's S3 key is stored in DynamoDB and that clients request the image from CloudFront; it does not specify how image URLs are created, signed, or authorized. Those access controls are intentionally not invented here.
- The raw-image bucket and DAX are optional. The template shows these as optional elements; omit them if the implementation does not need them.
- This is an M1Spec architecture template, not deployable AWS infrastructure. Network layout, IAM policies, encryption, retry behavior, scaling settings, and service configuration are not prescribed by the reference and remain implementation decisions.

## What teams usually customize

- Map the **Game client**, **Community site**, **Player**, and **Screenshot processing service** slots to the project's own systems and users; include the external identity provider only when using custom authorization.
- Choose whether to retain raw screenshots, use DAX, send filtering notifications, and use Cognito or an external identity provider.
- Define the upload/retrieval API, moderation and transformation behavior, metadata schema, URL/access model, and the AWS security and operational configuration for the use case.
