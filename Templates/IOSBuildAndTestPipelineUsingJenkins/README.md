# iOS Build and Test Pipeline Using Jenkins

An M1Spec architecture template for AWS's [iOS Build and Test Pipeline Using Jenkins](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/ios-build-test-pipeline-jenkins.html), first published November 23, 2021. The source [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/images/ios-build-test-pipeline-jenkins.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/ios-build-test-pipeline-jenkins.pdf) are linked from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

This template describes an architecture; it does not deploy AWS infrastructure.

## What it is for

Automating iOS app builds and tests: a developer change starts a Jenkins job on an Amazon EC2 Mac instance, the build produces `.ipa` artifacts, and AWS Device Farm tests those artifacts on multiple real devices.

## How it works

1. A developer pushes a code change to **AWS CodeCommit**.
2. **AWS CodePipeline** detects the change and creates a Jenkins job.
3. **Jenkins**, running on an **Amazon EC2 Mac** instance, uses the AWS CodePipeline plugin to poll for jobs, download the source, and start the build project.
4. The EC2 Mac instance builds `.ipa` artifacts. The Jenkins plugin compresses and uploads them to **Amazon S3**, which is managed by CodePipeline.
5. CodePipeline runs the test stage on **AWS Device Farm**.
6. Device Farm fetches the artifacts from S3, runs test cases on real devices, and records the results.
7. A manager reviews the results, logs, and recordings through the Device Farm console or Amazon S3 pre-signed URLs.

The source page's step 2 calls the service “Amazon API Gateway,” but its link points to CodePipeline documentation and the diagram shows AWS CodePipeline, not API Gateway. This template follows the linked documentation and diagram; it does not add a separate API Gateway.

## Assumptions and unspecified details

AWS identifies Jenkins and the CodePipeline plugin but does not specify Jenkins configuration or version, EC2 Mac instance configuration, build project details, signing setup, test framework, device selection, or S3 bucket policy and retention. These are implementation choices, not additional components inferred by this template. The results-review system in the blueprint is a conceptual slot for the documented console or pre-signed URL access path, not a separately specified application.

## What teams usually customize

- Select the source repository, branch-change trigger, and CodePipeline/Jenkins integration settings.
- Configure the EC2 Mac image, Jenkins installation, build project, iOS signing, and artifact format.
- Choose S3 storage, permissions, and retention, and configure Device Farm test suites and devices.
- Decide how managers access and retain test results, logs, and recordings.

## Sources

- [AWS architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/ios-build-test-pipeline-jenkins.html)
- [AWS diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/images/ios-build-test-pipeline-jenkins.png)
- [AWS diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ios-build-test-pipeline-jenkins/ios-build-test-pipeline-jenkins.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
