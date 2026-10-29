# Run Machine Learning Algorithms with Satellite Data

An M1Spec architecture template based on AWS's [Run Machine Learning Algorithms with Satellite Data reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ml-satellite-data/ml-satellite-data.html), its [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ml-satellite-data/images/ml-satellite-data.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ml-satellite-data/ml-satellite-data.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The reference was published May 24, 2021.

## What it is for

Ingest satellite imagery with AWS Ground Station, prepare and label images for machine learning, train and deploy a SageMaker model, and make image inferences and their metadata available to applications.

## How it works

The stages below follow AWS's numbered diagram and page description:

1. A satellite transmits data and imagery to an **AWS Ground Station** antenna.
2. Ground Station delivers baseband or digitized RF-over-IP data to an **Amazon EC2** instance.
3. The EC2 instance receives and processes the data, then stores the imagery in an **Amazon S3** bucket.
4. **Jupyter data-preparation notebooks** ingest imagery from S3 and prepare it for training.
5. **Amazon SageMaker Ground Truth** labels the images.
6. The labeled images are stored in S3.
7. **Jupyter training notebooks** host the training algorithm and code.
8. **Amazon SageMaker AI** runs the training algorithm on the data and trains the model.
9. SageMaker deploys the model to an inference endpoint.
10. The endpoint processes image data and stores generated inferences and metadata in **Amazon DynamoDB**.
11. New image data in S3 automatically triggers **AWS Lambda** to run machine-learning processing.
12. User applications use **AWS Amplify** to access the machine-learning algorithm and database.

The Ground Station portion of the diagram also depicts antenna control, contact scheduling, and demodulation or error correction as part of satellite data reception.

The blueprint keeps satellite ingestion, notebook preparation and labeling, model training and endpoint inference, the S3-triggered Lambda path, and application access as distinct paths. It models S3's ingested imagery and labeled training imagery as separate logical stores to reflect their different stages in the diagram; this does not prescribe bucket count or organization.

## Assumptions and unspecified details

- The satellite is an external system slot; AWS does not specify its owner, provider, orbit, transmission format, or contact schedule.
- AWS does not specify the EC2 instance type, processing software, notebook hosting environment, Jupyter implementation, training algorithm, model type, endpoint configuration, Lambda function details, or application framework.
- The source describes S3 buckets at different stages but does not specify bucket count, layout, naming, retention, or access controls. The two database elements in the blueprint are logical stage-specific stores, not a bucket deployment recommendation.
- The source does not specify image formats, labeling workflow or ground-truth schema, inference interface, DynamoDB schema, Amplify integration details, authentication, network design, or regional deployment.
- The architecture names no satellite operator or other required third-party service. Jupyter Notebook is the only separately cataloged third-party technology; the satellite itself is modeled as an external system slot, not as a named vendor or service.
- This is an architecture template, not deployable AWS infrastructure. Its system slots are mapped to a project's own systems when applied.

## What teams usually customize

- Map the satellite, data processor, notebook activities, inference function, and user applications to the project's actual systems; omit slots that do not apply.
- Choose EC2 processing software, notebook hosting, image and label formats, S3 organization, and data-retention policies.
- Specify the training code and model, endpoint invocation contract, Lambda event handling, and DynamoDB data model.
- Define the application framework, Amplify integration and access controls, and the operational security and networking appropriate to the deployment.
