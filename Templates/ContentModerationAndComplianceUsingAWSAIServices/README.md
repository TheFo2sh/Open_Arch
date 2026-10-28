# Content Moderation and Compliance Using AWS AI Services

A customizable serverless workflow for AI-based content moderation across multiple media types, modeled from AWS's reference architecture.

Sources:

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/content-moderation-compliance/content-moderation-compliance.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/content-moderation-compliance/images/content-moderation-compliance.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/content-moderation-compliance/content-moderation-compliance.pdf)
- [AWS reference architecture diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The architecture provides reusable serverless workflows to analyze uploaded image, video, audio, text, and document content. AWS AI services automate content analysis, while Ground Truth and Amazon A2I bring human workers into labeling and review where appropriate.

## How it works

The numbered stages below follow AWS's description and diagram:

1. **Content ingestion.** End users upload content into the AWS Cloud. The diagram groups AWS Amplify, Amazon API Gateway, Amazon CloudFront, and Amazon Kinesis Video Streams as ingestion services.
2. **Content staging.** Amazon S3 securely persists image, audio, video, text, and document content.
3. **Workflow integration.** AWS Step Functions, Amazon EventBridge, Amazon SQS, and AWS Lambda support workflows, publisher/subscription patterns, and custom moderation code.
4. **Image and video moderation.** Amazon Transcribe and Amazon Rekognition process audio streams within video and extract moderation categories through APIs. The diagram also shows Amazon Translate and Amazon Comprehend in this path.
5. **Audio moderation.** Amazon Transcribe converts audio to text; Amazon Translate and Amazon Comprehend provide translation and natural language processing for analysis.
6. **Text and document moderation.** Amazon Textract extracts document content, then Amazon Translate and Amazon Comprehend are shown in the analysis path.
7. **Data labeling.** Amazon SageMaker Ground Truth integrates human workforces to customize model vocabularies and image labels.
8. **Human review.** Amazon A2I brings people into the loop for scenarios that are not fully automatable.

## Assumptions and boundaries

- The blueprint represents logical stages and interactions, not a deployable AWS infrastructure design.
- AWS groups the ingestion and integration services and shows the moderation paths, but does not specify every service-to-service connection, trigger, queue configuration, API operation, or event schema. The relationships summarize those stages; they do not prescribe exact wiring.
- The source says content persists in an S3 bucket or another data store. The diagram depicts Amazon S3, so this template models S3 only.
- AWS names a human workforce but does not identify its provider. No third-party service is shown as a required dependency; teams choose and configure workforce arrangements separately.
- The source does not specify moderation thresholds, model configuration, storage retention or encryption, deployment topology, or the implementation language and libraries for custom code. These remain implementation decisions.
- This template does not deploy infrastructure.

## What teams usually customize

- Select the ingestion services and connect them to the organization's upload clients and content sources.
- Define the event, queue, workflow, retry, and failure-handling behavior between staging, moderation, and review.
- Configure moderation categories, translations, model vocabulary, image labels, and escalation criteria for human review.
- Choose the human workforce arrangement and review process.
- Set storage, security, retention, and audit requirements, and implement the custom code in the team's preferred runtime.
