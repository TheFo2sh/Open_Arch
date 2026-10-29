# Plagiarism Detection Architecture

An M1Spec architecture template based on AWS's [Plagiarism Detection Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/plagiarism-detection-architecture/plagiarism-detection-architecture.html) ([diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/plagiarism-detection-architecture/images/plagiarism-detection-architecture.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/plagiarism-detection-architecture/plagiarism-detection-architecture.pdf#plagiarism-detection-architecture)). The source was published July 26, 2021 and is listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Process a submitted document and identify passages that may be similar to pre-processed works. The documented flow uses AWS Step Functions and AWS Lambda to extract text with Apache Tika, generate BERT-based word embeddings through Amazon SageMaker AI, search an Amazon OpenSearch Service index, and raise a potential-match event through Amazon EventBridge.

## How it works

1. A user uploads a document to **Amazon S3**.
2. An S3 event starts the **AWS Step Functions** workflow.
3. **AWS Lambda** reads the document and uses the third-party **Apache Tika** toolkit to extract text and metadata.
4. For each paragraph, a Lambda function sends text to a pre-trained **BERT-based model** on **Amazon SageMaker AI** and receives word-embedding vectors.
5. A Lambda function in the diagram's **Amazon VPC** runs a K-Nearest Neighbor search using cosine similarity for each vector.
6. **Amazon OpenSearch Service**, also shown inside the VPC, stores an index of pre-processed works converted to word-embedding vectors.
7. A Lambda function compares the OpenSearch result score with a configured similarity threshold and raises an **Amazon EventBridge** event describing a possible match, its source document, and relevant works.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Amazon S3, Step Functions, Lambda, SageMaker AI, VPC, OpenSearch Service, EventBridge |
| Slots | **Document submitter** and **Source document uploader** (the uploader is a placeholder because AWS does not specify an application) |
| Systems | **Document processing functions** on Lambda, **Pre-trained BERT-based model** on SageMaker AI, and **Similarity assessment function** on Lambda in the VPC |
| Containers and components | Text extraction with Apache Tika, paragraph embedding requests, similarity search and event publication; the BERT-based model is represented as a model component |
| Databases | **Submitted documents** on S3 and **Pre-processed works embedding index** on OpenSearch Service |

## Assumptions and details AWS does not specify

This template describes the architecture; it does not deploy infrastructure. The source does not identify an uploader application, the BERT model publisher or variant, SageMaker serving configuration, document retention, the source corpus or its indexing pipeline, OpenSearch index mapping, similarity-threshold value, event schema or subscribers, or the Lambda runtimes and Step Functions state-machine definition. Those remain consumer choices.

The diagram places the similarity-search Lambda function and OpenSearch domain inside a VPC, but AWS does not specify VPC networking details. Tika is modeled as a third-party library used by Lambda, not as a separate hosted service. K-Nearest Neighbor and cosine similarity are algorithms rather than separately named services or products.

## What teams usually customize

- Map the document submitter, uploader, processing functions, model, and similarity assessment slots onto existing project systems and users; combine or omit slots where appropriate.
- Choose the uploader and source-document lifecycle, and provide the workflow that pre-processes and indexes reference works.
- Select the BERT model and SageMaker deployment, document formats and Tika configuration, KNN settings, and similarity threshold.
- Define the event contract and consumers, as well as security, VPC connectivity, storage and index retention, error handling, and operational settings.
