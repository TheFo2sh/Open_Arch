# AWS Connected Vehicle Reference Architecture

An M1Spec template based on the [AWS Connected Vehicle Reference Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-connected-vehicle/aws-connected-vehicle.html) in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source was published June 23, 2023 and updated January 17, 2024. AWS provides the [8-page PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aws-connected-vehicle/aws-connected-vehicle.pdf#aws-connected-vehicle) and five diagrams: [Modernization](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/aws-connected-vehicle/images/1-modernization.png), [Gather, process, and analyze](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/aws-connected-vehicle/images/2-gather-process-analyze-data.png), [Operational certificate lifecycle](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/aws-connected-vehicle/images/3-operational-certificate-lifecycle.png), [Encryption and monitoring security](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/aws-connected-vehicle/images/4-encryption-and-monitoring-security.png), and [Companion application](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/aws-connected-vehicle/images/5-companion-application.png).

## What it is for

The reference covers five related connected-vehicle capabilities: modernizing vehicle telemetry and remote commands, collecting and analyzing vehicle data, managing operational certificate lifecycles, protecting and monitoring vehicle communications, and building a companion application.

## How it works

1. **Modernize telemetry and messaging.** Vehicle devices use X.509 identities and MQTT over mutual TLS to connect through a private cellular network and AWS PrivateLink to AWS IoT Core. Shared subscriptions and topic aliases support high-volume telemetry. Amazon ECS client workers decode and process payloads; Amazon S3 holds descriptors used by IoT rules for compressed payloads. AWS IoT Core request/response topics support remote commands, message expiry, and retained OEM messages. The command flow uses AWS Amplify, Amazon API Gateway, Lambda, and DynamoDB.
2. **Gather and analyze vehicle data.** The AWS IoT FleetWise Edge Agent decodes vehicle signals and sends campaign data through AWS IoT Core. Amazon Route 53 selects a regional endpoint, and a Lambda registration function creates the IoT thing, policy, and certificate for first-time devices. FleetWise campaigns can deliver selected data to Amazon Timestream or Amazon S3. Amazon SageMaker AI supports ADAS/AV model improvement, and Amazon QuickSight visualizes near-real-time FleetWise data. AWS IoT Core device shadows expose vehicle state; AWS IoT Device Management supports OTA jobs and fleet indexing.
3. **Manage operational certificates.** An offline root CA signs a subordinate CA in AWS Private CA. A certificate broker receives a vehicle CSR authenticated by an attestation certificate and obtains a signed operational certificate. On first connection, AWS IoT Core creates a pending activation and publishes a reserved-topic event. A Lambda registration function can check a DynamoDB policy record and the AWS Private CA OCSP responder before creating the thing and policy and activating the certificate. AWS IoT Device Defender findings flow through AWS Security Hub CSPM and Amazon EventBridge to Step Functions and Lambda functions for certificate rotation or revocation; findings can also be sent to a vehicle security operations center.
4. **Encrypt and monitor.** AWS IoT Core validates certificate status and attached policies during the TLS handshake. AWS KMS supports service-side encryption and optional client-side encryption with the AWS Encryption SDK. Sensitive ciphertext can remain opaque through intermediate services until a Lambda function decrypts it. AWS IoT Device Defender detects certificate and behavior findings; Security Hub CSPM, EventBridge, and Step Functions can initiate policy changes or deactivate a certificate.
5. **Connect companion applications.** AWS Amplify applications send mutations over a secure WebSocket to AWS AppSync. AppSync and DynamoDB persist vehicle connection state and commands. Lifecycle events can enter an Amazon SQS delay queue before Lambda rechecks offline status. A Lambda vehicle-state function publishes commands to connected vehicles; for disconnected vehicles it can use Amazon SNS to send an SMS to the vehicle SIM. Vehicle responses enter an SQS FIFO queue and are processed by Lambda and AppSync, which fans out updated state to applications and vehicle-management platforms. Amazon S3 and CloudFront distribute static application assets.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | AWS IoT Core, AWS PrivateLink, Amazon ECS, Amazon S3, Amazon API Gateway, Amazon DynamoDB, Amazon Route 53, AWS Lambda, AWS IoT FleetWise, Amazon Timestream, Amazon SageMaker AI, Amazon QuickSight, AWS IoT Device Management, AWS Private Certificate Authority, AWS IoT Device Defender, AWS Security Hub CSPM, Amazon EventBridge, AWS Step Functions, AWS KMS, AWS AppSync, Amazon SQS, Amazon SNS, Amazon CloudFront |
| System slots | Connected vehicle and ECUs; companion applications; vehicle-management platform; fleet aggregators and external applications; certificate broker; private cellular network; vehicle security operations center; OEM operations; ECS telemetry workers; Lambda backend functions |
| User slots | Vehicle owner, data scientist |
| Client library | AWS Amplify for the companion applications; optional AWS IoT Device SDK and AWS Encryption SDK for vehicle clients |
| Databases | Telemetry descriptors, FleetWise campaign data, companion assets, Timestream campaign data, remote commands, vehicle state, and certificate policy records |

## Assumptions and details not specified by AWS

- The source does not name a cellular carrier, certificate-broker product, root-CA vendor, vehicle-management platform, companion-app implementation, fleet aggregator, or security operations center. These are represented as generic system slots; the private cellular network is listed as an unnamed third-party technology.
- AWS presents five related diagrams, not a single deployment. The blueprint combines their flows into one logical AWS zone to make the relationships understandable; it does not assert that they share an account, region, network, or deployment.
- The source names Amazon ECS workers that decode, process, and persist telemetry but does not identify the worker implementation or that flow's persistence destination. Those details are left open.
- AWS IoT Core device shadows, shared subscriptions, topic aliases, retained messages, message expiry, reserved topics, IoT rules, IoT jobs, fleet indexing, and the IoT credential provider are modeled as capabilities of the named services rather than separate catalog technologies.
- MQTT, MQTT 5, X.509, mutual TLS, OCSP, CSR, WebSockets, and the AWS Encryption SDK are called out where the source uses them. AWS does not specify payload schemas, topic naming beyond the cited lifecycle topic, certificate policies, the data model, encryption-key design, or the behavior of custom resolvers and Lambda functions.
- The diagrams show region selection and multiple vehicle/device roles but do not prescribe region count, account boundaries, network topology, scaling configuration, availability targets, retention, or service quotas.
- “FleetWise data to Timestream or S3” and “client-side encryption” are optional paths in the source; the corresponding data destinations and SDKs are not required for every deployment.
- The source includes partner products among possible Security Hub findings but names no required security partner service. No unnamed partner product is invented in this template.

## What teams usually customize

- Map vehicle, companion application, management, fleet aggregation, OEM, certificate-broker, and security-operations slots to the actual project systems and users.
- Choose a cellular carrier and define private APN, PrivateLink endpoint, device provisioning, and regional endpoint arrangements.
- Specify telemetry formats, IoT topics and rules, worker code, persistence destinations, data campaigns, and the schemas and retention for DynamoDB, S3, and Timestream.
- Define certificate issuance and rotation policies, root-CA ownership, OCSP checks, IoT policies, key management, and security-finding response.
- Select which remote-command and companion-application patterns to use, then implement APIs, authorization, retries, disconnected-device behavior, and application assets.
- Decide which optional SDKs, FleetWise campaigns, analytics, and encryption paths are needed for the target fleet.

This template describes an architecture blueprint; it does not deploy AWS infrastructure.
