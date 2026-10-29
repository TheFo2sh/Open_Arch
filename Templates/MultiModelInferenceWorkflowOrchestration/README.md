# Multi-Model Inference Workflow Orchestration

An AWS architecture for accepting inference jobs, orchestrating multiple machine-learning models in parallel, and returning aggregated insights. It is based on AWS's [Multi-Model Inference Workflow Orchestration reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/multi-model-inference-orchestration/multi-model-inference-orchestration.html), published March 28, 2022.

## Source material

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/multi-model-inference-orchestration/multi-model-inference-orchestration.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/multi-model-inference-orchestration/images/multi-model-inference-orchestration.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/multi-model-inference-orchestration/multi-model-inference-orchestration.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Use this pattern when a request needs insights from multiple category-specific inference models and the results should be collected into one job result. Users and administrators submit and monitor jobs through a REST API; AWS Step Functions coordinates parallel inference against Amazon SageMaker AI endpoints.

## How it works

1. **Amazon Cognito user pools** authenticate users and administrators accessing the **Amazon API Gateway** REST API.
2. `POST /create-job` invokes an **AWS Lambda** function.
3. The create-job function stores the submitted data object in **Amazon S3** and records job information in a **DynamoDB** job status table.
4. Lambda functions also handle job cancellation, status monitoring, and result retrieval through the API.
5. A new job-table item is published through **DynamoDB Streams**, which triggers the inference workflow.
6. **AWS Step Functions** orchestrates the inference work for the submitted input.
7. The workflow reads model endpoint metadata from a separate DynamoDB table.
8. A Step Functions Map state invokes the selected endpoints concurrently and collects their outputs.
9. **Amazon SageMaker AI** endpoints host the models invoked for each category. Optional multi-model endpoints can further specialize a category, for example by language.
10. The workflow stores the aggregated insights in Amazon S3.
11. `GET /get-job-results` invokes a Lambda function that reads the results from S3.

## Assumptions and source boundaries

- The blueprint separates S3 input and results into logical storage roles. AWS does not specify whether they are separate buckets or prefixes in one bucket.
- AWS does not prescribe the request and result formats, job identifiers or status schema, stream filtering, endpoint metadata schema, category selection rules, endpoint configuration, or workflow error and retry behavior. Those are implementation choices for the consuming project.
- The source diagram names a cancel-job Lambda function but does not detail its cancellation semantics or data interactions.
- No third-party service is shown or required by the source architecture; none is added to the template.
- This is an M1Spec architecture template, not deployable AWS infrastructure. Network layout, IAM policies, encryption, scaling settings, and service configuration are not specified.

## What teams usually customize

- Map the user slot and the inference job API system to the project's users and existing API/application system.
- Choose whether S3 input and results use separate buckets or prefixes, and define retention and access controls.
- Define job states, endpoint metadata, model categories, API payloads, result formats, cancellation behavior, and workflow failure handling.
- Select the SageMaker endpoint and multi-model endpoint design, including whether category-specific language or other specializations are needed.
