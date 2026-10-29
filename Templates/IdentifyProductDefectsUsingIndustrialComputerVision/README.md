# Identify Product Defects using Industrial Computer Vision

An M1Spec template based on AWS's [Identify Product Defects using Industrial Computer Vision](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/identify-product-defects-computer-vision/identify-product-defects-computer-vision.html), published October 10, 2024. Sources: the [AWS architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/identify-product-defects-computer-vision/images/identify-product-defects-using-industrial-computer-vision-ra.png), its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/identify-product-defects-computer-vision/identify-product-defects-computer-vision.pdf), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Inspect manufactured products for anomalies such as casting defects, damage, and irregularities in X-ray images using Amazon Lookout for Vision, product-image datasets, serverless inference, human review, and results sent to the shop-floor manufacturing execution system (MES).

## How it works

The flow follows the nine numbered steps on the AWS page and its linked diagram:

1. **Capture.** X-ray machines, cameras, and other shop-floor devices capture images under consistent conditions.
2. **Transfer.** AWS Transfer Family, AWS DataSync, or AWS IoT Greengrass for edge devices are documented image-transfer options.
3. **Store datasets.** Amazon S3 stores product images in separate training and testing datasets.
4. **Train the model.** Amazon Lookout for Vision labels, trains, tunes, and deploys the defect detection model using the training dataset.
5. **Manage the model.** Amazon API Gateway and AWS Lambda expose model management to administrators and data scientists.
6. **Run interactive inference.** Lambda starts the deployed model; AWS Step Functions and Lambda coordinate the serverless inference workflow.
7. **Run batch inference.** A Lambda function submits an AWS Batch job that uses AWS Fargate for compute.
8. **Review confidence.** Amazon SNS notifies users about confidence levels. When confidence is below the required minimum, users provide labels for undetected data; this feedback supports the model-training loop.
9. **Deliver results.** Amazon S3 stores final results for Amazon QuickSight visualization, and Lambda writes results back to the shop-floor MES.

The blueprint keeps model management, Step Functions runtime orchestration, and AWS Batch/Fargate inference as distinct paths. The diagram does not specify whether a particular transfer option is selected, or the exact handoff of labeled feedback into training.

## What applying it brings

| | |
|---|---|
| Zones | **Shop floor**, **Edge tier**, and **AWS Cloud** |
| Platforms | AWS Transfer Family, AWS DataSync, AWS IoT Greengrass, Amazon S3, Amazon Lookout for Vision, AWS Lambda, Amazon API Gateway, AWS Step Functions, AWS Batch, AWS Fargate, Amazon Simple Notification Service, and Amazon QuickSight |
| Slots | **Product imaging devices**, **Manufacturing execution system (MES)**, **Administrators**, **Data scientists**, and **Business users** |
| Systems | Edge image transfer, model management functions, runtime and batch launcher functions, inference function, confidence notification function, inference result publisher, MES result writeback function, runtime inference workflow, batch inference job, confidence review and labeling, and defect results dashboard |
| Databases | **Product image train and test datasets** and **Final inference results** on Amazon S3 |

The MES is the only external business system named by the source, and AWS does not identify its vendor or interface. No third-party service provider or product is specified. The cameras, X-ray machines, and other capture devices are generic shop-floor equipment.

## Assumptions and unspecified details

AWS dates this diagram to October 10, 2024. The template records the services and flow shown in that dated reference; in particular, its inclusion of Amazon Lookout for Vision is not a current procurement recommendation or a statement about present-day service availability.

AWS does not specify the image-transfer protocols or which transfer option a deployment uses; the image formats, S3 bucket layout, retention, or dataset schema; the model configuration, confidence scoring, or minimum threshold; the API contract or permissions; the Lambda code or Step Functions state-machine definition; AWS Batch job parameters; or how human labels are persisted and returned to training. The blueprint represents the confidence feedback loop at a logical level and connects it to the training dataset without prescribing its implementation.

The MES vendor, API, protocol, payload, and failure handling are not identified. The reference does not prescribe an AWS Region, network topology, security controls, service configuration, high-availability design, or infrastructure-as-code. This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the imaging-device, MES, edge-transfer, model-management, and business-user slots to their own systems and people.
- Select and configure an image-transfer option, image/data contracts, and the S3 dataset layout.
- Define model lifecycle, inference thresholds, low-confidence review, label feedback, and retraining behavior.
- Choose the management API, Step Functions workflow, batch job shape, and result-retention policy.
- Configure QuickSight views and the MES integration, including its endpoint, authentication, and error handling.
- Assess the dated reference's service choices and design the networking, security, availability, and deployment details required by their environment.
