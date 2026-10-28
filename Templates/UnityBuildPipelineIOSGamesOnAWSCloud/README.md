# Unity Build Pipeline: iOS Games on AWS Cloud

An M1Spec architecture template for AWS's [Unity Build Pipeline: iOS Games on AWS Cloud](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/unity-build-pipeline-ios/unity-build-pipeline-ios.html). The AWS [architecture diagram PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/unity-build-pipeline-ios-games-on-aws-cloud-ra.pdf) is the primary reference. The [Jenkins companion article](https://www.jenkins.io/blog/2022/09/14/create-ios-unity-build-pipelines-on-aws-with-jenkins-and-ec2-mac-instances/) documents the two-stage build and links to the same diagram.

This template describes an architecture; it does not provision AWS resources. During this import the AWS documentation and PDF endpoints could not be retrieved, so the model is limited to details verified in the AWS-authored companion article. Check the linked diagram before treating any omitted implementation detail as part of the reference.

## What it is for

A CI/CD pipeline for building iOS games made with Unity. Splitting the work lets the compute-heavy Unity project preparation run on Linux EC2 Spot workers while the final Xcode build and signing run on macOS.

## How it works

1. A developer starts a build through Jenkins, which schedules the pipeline stages and connects to the workers.
2. Linux workers in an EC2 Auto Scaling group run a Dockerized Unity Editor build to prepare the Xcode project. The reference describes EC2 Spot capacity for this stage.
3. Jenkins hands the prepared project to an EC2 Mac build agent on a dedicated host. Xcode performs the final iOS build and signing.
4. The macOS stage retrieves signing material, such as a certificate and provisioning profile, from AWS Secrets Manager. A Unity Build Server license service is optional and applies when that licensing model is chosen.
5. Amazon S3 is a possible artifact destination. The Jenkins article recommends it over storing artifacts in Jenkins, but does not show a complete artifact upload or App Store submission flow.

The companion article describes a VPC with public and private subnets, Jenkins and worker nodes in private subnets, a bastion for access, and NAT gateways for outbound connectivity. The blueprint shows only the VPC and NAT-gateway boundary; exact subnet topology, security rules, IAM policies, scaling settings, and regional choices remain implementation-specific.

## Assumptions and limits

- The Jenkins article says the associated diagram assumes source code and Docker images are within the AWS account, to reduce transfer cost and latency. It does not identify a required source-control or image-registry service in that statement.
- EC2 Mac capacity uses dedicated hosts; the article notes a 24-hour minimum host allocation and that this setup does not dynamically provision Mac instances through Auto Scaling groups.
- Unity Build Server licensing is optional. Unity version, licensing plan, EC2 Mac architecture, worker concurrency, and build configuration are not prescribed here.
- Signing requires Apple-issued signing assets and an Apple Developer account. App Store publishing and the final distribution destination are outside the demonstrated flow.
- Jenkins, Unity, Docker, Xcode, and Apple are third-party technologies. They are cataloged in `technologies.yaml`; the repository schema only allows libraries in `metadata.uses` on systems and containers, so these tools are described on their respective slots instead.

## What teams usually customize

- Choose the source repository and Docker image registry, and decide whether to keep them in the AWS account.
- Select Unity and Xcode versions, licensing model, Mac architecture, signing identities, and provisioning profiles.
- Set worker capacity and concurrency, EC2 Mac host allocation, network layout, access controls, and IAM permissions.
- Choose whether Jenkins or S3 retains build artifacts and implement any required App Store distribution steps.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/unity-build-pipeline-ios/unity-build-pipeline-ios.html)
- [AWS architecture diagram PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/unity-build-pipeline-ios-games-on-aws-cloud-ra.pdf)
- [Jenkins companion article](https://www.jenkins.io/blog/2022/09/14/create-ios-unity-build-pipelines-on-aws-with-jenkins-and-ec2-mac-instances/)
- [AWS sample build-farm repository](https://github.com/aws-samples/unity-aws-ec2-mac-build-farm) (implementation example; its choices are not all requirements of this template)
