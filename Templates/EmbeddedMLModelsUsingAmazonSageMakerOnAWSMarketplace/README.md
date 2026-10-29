# Embedded ML models using Amazon SageMaker AI on AWS Marketplace

An AWS reference architecture for letting a buyer use a seller's machine learning model in the buyer's VPC, with network isolation, subscription authorization, and buyer-controlled request and response handling.

Source: [Embedded ML models using Amazon SageMaker AI on AWS Marketplace](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/embedded-ml-models-using-sagemaker-on-aws-marketplace/embedded-ml-models-using-sagemaker-on-aws-marketplace.html) ([linked PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/embedded-ml-models-using-sagemaker-on-aws-marketplace/embedded-ml-models-using-sagemaker-on-aws-marketplace.pdf)).

## Use case

The buyer consumes a seller's model through AWS Marketplace without giving the seller direct access to the buyer's data. The seller's model code remains in a container image; the buyer invokes an Amazon SageMaker AI endpoint in network isolation mode from the buyer-side request flow.

## Architecture and data flow

1. The seller develops model code, packages it as a Docker image, pushes the image to Amazon ECR, and lists the model on AWS Marketplace.
2. The buyer subscribes to the listing using the AWS Management Console. Subscription provisions the model container and invocation endpoint in the buyer VPC.
3. The buyer runs an AWS CloudFormation template that deploys buyer-side AWS Lambda functions from a ZIP file in Amazon S3.
4. The buyer application calls the Lambda authorizer's initialization endpoint. The authorizer invokes the seller's Lambda authenticator in the seller/service provider VPC to validate the subscription and receive a time-limited authorization token.
5. The buyer application sends its data and token to the authorizer's `/request` endpoint. The authorizer validates the token and forwards the request to the Lambda proxy.
6. The proxy invokes the network-isolated SageMaker AI endpoint. The endpoint returns the processed data, which the proxy stores in Amazon S3 for the buyer application.

## Assumptions and unspecified details

- The blueprint separates the buyer VPC and seller/service provider VPC as shown. The AWS diagram also depicts Amazon S3 resources within the buyer boundary; the model treats S3 as an AWS storage service rather than implying that S3 buckets run inside a VPC.
- AWS does not specify the model, its framework or language, the contents of the CloudFormation template, the bucket and repository names, the endpoint configuration, or the token's validity duration. These remain intentionally generic.
- AWS describes subscription validation and token issuance but does not document the validation protocol, token format, or authorization implementation. No additional identity provider, API gateway, networking component, or security service is assumed.
- The architecture imports the AWS reference design as a template; it does not deploy infrastructure or prescribe production settings.

## What teams usually customize

- Map the buyer application and buyer/seller users to the project's own systems and users when applying the template.
- Choose the model, SageMaker instance and endpoint settings, container build, and the buyer's deployment package.
- Define the subscription validation protocol, token lifetime and handling, and how the buyer application reads stored responses.
- Add the infrastructure and operational details needed by the deployment, such as VPC networking, bucket policies, monitoring, and scaling; AWS's reference diagram does not specify them.
