# Connected Home: Machine Learning at the Edge

An AWS reference architecture for training compact machine-learning models in the cloud and running inference locally on IoT video cameras and other connected-home devices.

Source: [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-home-ml-edge/connected-home-ml-edge.html) and its [linked diagram/PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-home-ml-edge/connected-home-ml-edge.pdf#connected-home-ml-edge). The diagram was first published July 13, 2021.

## How it works

1. An IoT video camera running AWS IoT Greengrass publishes training data to AWS IoT Core.
2. An AWS IoT rule forwards camera messages through Amazon Kinesis Data Firehose to Amazon S3.
3. Amazon SageMaker AI trains and optimizes models to use less than one tenth of the memory footprint on resource-constrained devices such as cameras.
4. SageMaker AI outputs the trained models to Amazon S3 for delivery to the camera.
5. The AWS IoT Greengrass cloud service orchestrates deployment of the model and application logic to the camera. The source names an AWS Lambda function or a Docker container as examples of application logic.
6. A Lambda function runs locally on the camera and performs inference using the latest trained model.
7. The camera video stream is made available through Amazon Kinesis Video Streams for viewing in a mobile application.

## What applying it brings

- **Zones:** Connected Home (device edge) and AWS Cloud.
- **Platforms:** AWS IoT Core, its rules engine, Amazon Kinesis Data Firehose, Amazon S3, Amazon SageMaker AI, AWS IoT Greengrass, and Amazon Kinesis Video Streams.
- **Slots:** An IoT video camera, a mobile application, and a home user. Systems and users are slots for mapping to a project's own systems and users.
- **Database artifacts:** Camera training data and trained model artifacts on Amazon S3. These are storage abstractions, not prescribed database engines.
- **Edge workload:** A local inference function and its trained model, deployed to the camera through Greengrass.

This is an architecture template, not an AWS deployment. It does not prescribe a network, infrastructure configuration, service sizing, or deployment automation.

## Assumptions and unspecified details

- AWS does not identify a camera/device manufacturer, operating system, sensor model, or mobile application provider. The template represents the camera and mobile app as generic project slots and does not add a third-party service.
- AWS does not specify training-data formats, schemas, volumes, S3 layout or retention, IoT rule filters, Firehose buffering/delivery settings, model framework or format, or SageMaker training configuration.
- The source does not detail how the model artifact is fetched from S3 by Greengrass, how deployment authorization works, or how the model and Lambda function versions are coordinated. The blueprint shows the documented artifact-storage and Greengrass-orchestration responsibilities without prescribing those mechanisms.
- The source gives Docker containers as an alternative application payload; the diagram depicts the Lambda function path. Docker is therefore listed as an optional technology and is not modeled as a deployed workload.
- Security controls, connectivity, availability, video-stream access control, and the mobile app's integration details are not specified by the source.

## What teams usually customize

- Map the camera, mobile application, and home-user slots to their own systems and users.
- Select the actual camera hardware, operating system, sensors, app, and any external provider.
- Define the event and video formats, storage/retention policies, rule conditions, training pipeline, model versioning, and Greengrass deployment process.
- Choose whether to deploy a Lambda function or a Docker container and how the mobile app authenticates and consumes the video stream.
- Add the networking, security, availability, capacity, and operational details required by their AWS environment.
