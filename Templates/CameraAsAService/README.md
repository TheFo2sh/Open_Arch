# Camera as a Service

An AWS reference architecture for consuming live video and machine-learning inference from IoT-enabled cameras in near real time, based on AWS's [Camera as a Service architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/camera-as-a-service/camera-as-a-service.html) and its [linked diagram and PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/camera-as-a-service/camera-as-a-service.pdf#camera-as-a-service). AWS published the diagram on January 25, 2023.

## What it is for

The pattern ingests camera video, extracts images for inference, and exposes both the live feed and inference to an end user through APIs. It also includes an admin application for governance, onboarding and operational insights.

## How it works

1. IoT-enabled cameras generate video using the Amazon Kinesis Video Streams Producer Libraries and publish it to **Amazon Kinesis Video Streams**.
2. An on-demand or automated feature converts the live feed into images and sends them to **Amazon S3**. AWS does not specify this feature's implementation or where it runs.
3. An S3 write event invokes **AWS Lambda**, which sends the image to **Amazon Rekognition** for inference. The inference and its metadata are stored in **Amazon DynamoDB**. AWS does not identify the component that writes the results to DynamoDB.
4. The **user application** on **Amazon EKS** consumes live video from Kinesis Video Streams and fetches inference from DynamoDB. It exposes REST APIs through **Amazon API Gateway**. End users consume video using HLS, MPEG-DASH or GetMedia streaming, and consume inference through a separate API.
5. The **admin application**, also on EKS, handles governance, administrative and user APIs, camera onboarding, metrics and insights.
6. **Amazon CloudWatch** stores logs and metrics from the complete stack. **Amazon Cognito** secures the API feed exposed by API Gateway.

AWS names no third-party service in this architecture. HLS, MPEG-DASH and GetMedia are video delivery options, not specified third-party services. The producer-library implementation and the image-extraction feature are not specified.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Kinesis Video Streams, S3, Lambda, Rekognition, DynamoDB, EKS, API Gateway, CloudWatch and Cognito |
| Slots | **IoT-enabled camera**, a camera device system; **User application** and **Admin application**, software systems; **End user**, a user |
| Databases | Extracted video images on S3; inference and metadata on DynamoDB |
| Libraries | Amazon Kinesis Video Streams Producer Libraries |

This is an architecture template, not an AWS deployment specification. It does not prescribe networking, IAM policies, retention, camera hardware, application frameworks, EKS topology, or the implementation of image extraction and inference-result persistence.

## What teams usually change

- Map the camera, user and admin application slots to the project's existing systems and users.
- Choose the producer SDK for the camera hardware and define where and how video is converted into images.
- Specify the inference-result write path, API contracts, authorization details, data retention and monitoring sources.
- Choose deployment details such as EKS topology and AWS networking, which the reference does not define.
