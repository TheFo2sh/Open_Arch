# DescribeForMe Web App

An image-description web app for visually impaired users. It sends a submitted image through an AWS AI/ML workflow and returns an MP3 caption to play in the mobile browser.

## Source

This template is based on AWS's [DescribeForMe Web App reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/describe-for-me-web-app/describe-for-me-web-app.html), first published September 1, 2023. The page links the [embedded architecture diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/describe-for-me-web-app/images/describe-for-me-web-app.png) and an [editable diagram ZIP](https://docs.aws.amazon.com/architecture-diagrams/latest/describe-for-me-web-app/samples/describe-for-me-web-app.zip).

The AWS Docs host and its image/download endpoints were unavailable while this template was prepared. The numbered page description was cross-checked against this [public mirror of the AWS page](https://github.com/groovy-sky/aws-docs/blob/2ef144870dfe7c0adf323acafeed96fc6623f139/docs/services/architecture-diagrams/latest/describe-for-me-web-app/describe-for-me-web-app.md). The blueprint models the prose-verified flow; diagram-only annotations could not be independently checked.

## Use case

A mobile user submits an image and receives a clear spoken description. AWS describes output in multiple languages and dialects but does not list which are supported.

## Architecture and data flow

1. **AWS Amplify** distributes the HTML, JavaScript, and CSS web app to the mobile device.
2. The browser uses **Amazon Cognito** identity-pool credentials for temporary access to an **Amazon S3** bucket, then uploads an image using the AWS SDK.
3. The web app sends the S3 object key to **Amazon API Gateway**. API Gateway starts an **AWS Step Functions** state machine.
4. Step Functions orchestrates **Amazon Rekognition**, **Amazon SageMaker AI**, **Amazon Textract**, **Amazon Translate**, and **Amazon Polly** using **AWS Lambda** functions.
5. The workflow stores its MP3 output in S3. API Gateway returns a pre-signed URL to the browser, which plays the audio from S3.

## Assumptions and unspecified details

- The blueprint includes only the AWS services named by the source and the generic AWS SDK used by the web app. The source does not identify a separate third-party AI, speech, or storage provider; its DescribeForMe.com link identifies the app, not an external service dependency.
- The source does not specify the SageMaker model or service responsibilities, Lambda function count, workflow state sequence, API contract beyond the S3 object key and pre-signed URL, supported languages, or AWS region.
- Bucket naming, encryption, retention, access-policy details, URL expiry, networking, and deployment settings are not specified. They are intentionally not modeled.
- The architecture specification has a database element for representing stored data. Here, **Image and audio objects** represents S3 objects; it is not a relational database.

## What teams usually customize

- Select the AI/ML models, service responsibilities, workflow steps, and supported languages for the product.
- Define the upload and response API contract, identity-pool configuration, S3 permissions, retention, encryption, and pre-signed URL lifetime.
- Adapt the mobile experience, accessibility behavior, and deployment settings to the team's application and AWS account.

This template is an architecture blueprint, not a deployable AWS configuration.
