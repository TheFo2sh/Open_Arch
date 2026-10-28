# AI-Enabled Audio Insight Processing Pipeline

An AWS serverless pipeline for transcribing uploaded audio, translating the resulting text, extracting text insights, and finding matching files. This template follows the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ai-audio-insight-pipeline/ai-audio-insight-pipeline.html), its [linked diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ai-audio-insight-pipeline/ai-audio-insight-pipeline.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the diagram's initial publication to June 20, 2022.

## What it is for

Use this architecture when an application needs searchable, multilingual insights from uploaded audio and an API for retrieving files that match a request.

## How it works

1. A client uploads an audio file to an **Amazon S3** bucket. The bucket's object-created event starts an **AWS Lambda** transcription function.
2. The function calls **Amazon Transcribe**, writes the returned text to a transcribed-text S3 bucket, and creates a file-name and metadata entry in **Amazon DynamoDB**.
3. The transcribed-text upload starts a Lambda translation function. It calls **Amazon Translate**, writes translated text to a separate S3 bucket, and updates the DynamoDB entry with translation metadata.
4. The translated-text upload starts a Lambda text-insights function. It calls **Amazon Comprehend** for entity recognition, sentiment analysis, and key phrase extraction, then adds the results to DynamoDB.
5. **Amazon Kendra** indexes translated text from S3. A client HTTP GET match request goes through **Amazon API Gateway** to the Lambda match function, which asks Kendra for matching file IDs, looks up their insight metadata in DynamoDB, and returns the most suitable matches.

## Assumptions and unspecified details

- AWS describes S3 uploads as starting the successive Lambda jobs but does not specify the bucket notification configuration in the prose. The blueprint associates the translation trigger with the transcribed-text bucket and the insights trigger with the translated-text bucket, following the data flow.
- The reference does not specify Lambda runtimes or implementation languages, supported audio and text formats, input/output languages, bucket or table schemas, API request/response shapes, Kendra index configuration, or ranking logic. They are intentionally left open.
- AWS's description does not identify a third-party service, authentication mechanism, retention policy, network layout, or deployment configuration. None is added here.
- This is an architecture template, not deployable infrastructure. It does not prescribe event delivery/retry handling, permissions, encryption, monitoring, or service sizing.

## What teams usually customize

- Map the **Audio processing client** user and **Audio insight processing pipeline** system slots to the project's own users and systems.
- Choose supported languages, file formats, metadata schema, S3 bucket organization, and Kendra indexing strategy.
- Define the API contract, match/ranking behavior, authorization, error handling, and operational requirements.
- Add the infrastructure and security details appropriate to the deployment; they are outside the source architecture's stated scope.
