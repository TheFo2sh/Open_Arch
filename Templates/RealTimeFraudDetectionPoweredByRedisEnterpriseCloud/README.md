# Real-Time Fraud Detection Powered by Redis Enterprise Cloud

This template follows AWS's [Real-Time Fraud Detection Powered by Redis Enterprise Cloud](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/realtime-fraud-detection-redis/realtime-fraud-detection-redis.html) reference architecture. It uses Redis Enterprise Cloud on AWS as a transaction database and online feature store, with Amazon SageMaker AI for model inference, Amazon Kinesis Data Streams for event capture, and AWS Lambda for processing.

The AWS page links the [architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/realtime-fraud-detection-redis/images/realtime-fraud-detection-redis.png); it does not link a PDF.

## What it is for

Score payment transactions for fraud in real time, using an anomaly-detection model and a fraud-classification model. Historical transaction data supports model development and scoring, while Redis Enterprise Cloud provides low-latency transaction persistence and online features.

## How it works

1. Historical credit-card transactions are stored in **Amazon S3** and used by a **SageMaker AI** notebook to train the models.
2. The reference identifies a **Random Cut Forest** anomaly-detection model and an **XGBoost** fraud-classification model, exposed as SageMaker inference endpoints.
3. **AWS Lambda** processes historical transactions and invokes both endpoints to obtain anomaly and classification scores.
4. Web and mobile clients send signed HTTP requests to an **Amazon API Gateway** REST API.
5. **Amazon Kinesis Data Streams** captures the real-time transaction events for Lambda processing.
6. A Lambda function consumes the stream, persists transaction data in the RedisJSON-enabled Redis Enterprise Cloud database, and retrieves online features from Redis Enterprise Cloud.
7. The Lambda function invokes the SageMaker endpoints and persists prediction results in Redis Enterprise Cloud. AWS notes that using Redis Enterprise Cloud as the feature store does not itself require Redis modules.
8. Optionally, transaction details and prediction results are stored in **RedisTimeSeries** and visualized with **Amazon Managed Service for Grafana**.
9. Optionally, **Amazon Data Firehose** delivers prediction results to **Amazon S3**, where **Amazon QuickSight** can use them for visualizations and analytics.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3, Amazon SageMaker AI, AWS Lambda, Amazon API Gateway, Amazon Kinesis Data Streams, Redis Enterprise Cloud, Amazon Data Firehose, Amazon QuickSight, Amazon Managed Service for Grafana |
| Slots | **Web and mobile clients**, the consumers of the prediction API; **Fraud model development**, **Anomaly detection model**, **Fraud classification model**, **Historical transaction processor**, and **Real-time transaction processor** |
| Databases | Historical transaction data and optional prediction exports on S3; transaction event stream on Kinesis; transaction records, online feature store, and optional prediction time series on Redis Enterprise Cloud |

## Assumptions and scope

- The blueprint models the logical services and numbered data flow shown by AWS; it does not specify networking, credentials, API payload schemas, retention, throughput, or deployment settings.
- Redis Enterprise Cloud is modeled as a managed data platform hosted on AWS. AWS identifies RedisJSON for transaction persistence, RediSearch for the online feature store, and RedisTimeSeries for optional visualizations; the feature-store behavior itself does not require Redis modules.
- The source calls for signed HTTP requests but does not name a signing mechanism, client identity provider, or authorization design, so none is prescribed here.
- RedisTimeSeries/Grafana and Firehose/S3/QuickSight are optional paths, not prerequisites for real-time scoring.
- The diagram's historical-data flow does not specify whether model training and Lambda-based historical scoring share datasets or execution schedules; consumers should define those details for their use case.
- This is an architecture template, not deployable infrastructure.

## What teams usually customize

- Choose how clients authenticate and sign requests, and define the REST API contract and transaction schema.
- Select Redis Enterprise Cloud sizing, persistence, high availability, data structures, and the feature-generation and update strategy.
- Set model training, validation, deployment, and inference policies for the SageMaker endpoints.
- Decide whether to enable the optional time-series dashboards and S3 analytics export, and configure retention and access controls.
- Add the networking, encryption, monitoring, and operational details appropriate to the deployment.
