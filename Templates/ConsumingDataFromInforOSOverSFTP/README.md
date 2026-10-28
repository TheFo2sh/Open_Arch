# Consuming Data from InforOS over SFTP

An AWS reference architecture for integrating Infor CloudSuite applications with AWS data consumers using bulk file transfer over SFTP. It uses AWS Transfer Family as the managed SFTP server and Amazon S3 for object storage.

Sources:

- [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consuming-data-from-inforos/consuming-data-from-inforos.html)
- [Architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consuming-data-from-inforos/images/consuming-data-from-infor-over-sftp-ra.png)
- [Architecture PDF](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/consuming-data-from-inforos/consuming-data-from-inforos.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The architecture transfers bulk data produced by Infor CloudSuite applications into Amazon S3, where AWS services can notify downstream systems and example consumers can read the stored objects. AWS published this reference architecture on March 20, 2021.

## How it works

The numbered steps follow AWS's description and diagram:

1. Infor CloudSuite applications, including Infor M3, Infor WMS, Infor EAM, and others, produce data.
2. Infor ION acts as an SFTP client and polls the AWS Transfer Family server for new data.
3. An administrator creates an SFTP user in Transfer Family and gives the credentials to Infor ION.
4. Files are transferred over SFTP and stored in Amazon S3. AWS lists BOD/XML, delimiter-separated, JSON, and schema-free formats.
5. Amazon S3 event notifications can send notifications for new objects to Amazon SQS, AWS Lambda, or Amazon SNS.
6. Example consumers read data from S3: Amazon API Gateway, Amazon EMR, and Amazon EC2 through AWS PrivateLink.

The AWS page does not specify whether all three event-notification destinations are configured together; the blueprint shows them as alternatives. It also does not describe what the example consumers do with the data.

## Assumptions and unspecified details

- Infor CloudSuite applications and Infor ION are modeled as external system slots. AWS identifies these third-party systems but does not detail their internal deployment or the way applications hand data to ION.
- The architecture does not specify Transfer Family authentication implementation beyond an administrator-created SFTP user and credentials passed to ION.
- AWS does not specify bucket configuration, object naming, event filters, SQS/Lambda/SNS processing behavior, data transformations, or the purpose of the API Gateway consumer.
- The VPC, EC2, EMR, and PrivateLink are shown as examples. The diagram does not define their network configuration, access policies, or deployment details.
- This is an architecture template, not an infrastructure deployment plan; it does not prescribe regions, availability, encryption, or operational controls.

## What teams usually customize

- Configure the SFTP users, credentials, and access controls to match their Infor environment.
- Decide which file formats, object organization, and S3 notification destinations fit their consumers.
- Replace, map, or omit the example API Gateway, EMR, and EC2 consumers when applying the template.
- Specify the bucket policies, VPC connectivity, PrivateLink setup, processing behavior, and operational requirements omitted from the reference architecture.
