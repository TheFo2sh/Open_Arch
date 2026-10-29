# iOS CI/CD Build and Test Pipeline

An AWS reference architecture for automating iOS application builds on Amazon EC2 Mac instances and testing the resulting artifacts with AWS Device Farm.

## What it is for

Use this blueprint as a starting point for a pipeline that builds an iOS application when its source changes, then runs tests on multiple real devices. It describes an architecture template, not deployable AWS infrastructure.

## How it works

1. A developer pushes an iOS application code change to **AWS CodeCommit**.
2. The page says **Amazon API Gateway** detects the CodeCommit change and invokes **AWS Step Functions** to start a build.
3. **AWS Lambda** loads the required build scripts from an **Amazon S3** bucket and triggers an **AWS Systems Manager Run Command**.
4. The scripts initiate an iOS build on an **Amazon EC2 Mac** instance and place the resulting `.ipa` and `.zip` build artifacts in an Amazon S3 bucket.
5. Systems Manager Run Command runs the scripts on the Mac instance and sends execution logs to **Amazon CloudWatch**.
6. The page says API Gateway detects the S3 build artifacts and starts **AWS Device Farm**. The diagram shows Device Farm retrieving the build artifact from S3 to test it on multiple real devices.
7. Device Farm generates test results, logs, and recordings. A manager can review them in the Device Farm console or use Amazon S3 pre-signed URLs.

## Source notes and assumptions

AWS's [architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-cicd-build-test-pipeline/ios-cicd-build-test-pipeline.html) supplies the numbered flow above. Its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ios-cicd-build-test-pipeline/images/ios-cicd-build-test-pipeline.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ios-cicd-build-test-pipeline/ios-cicd-build-test-pipeline.pdf) show an AWS CodePipeline-labeled dashed boundary, but do not show API Gateway or explain CodePipeline's role. The page's prose names API Gateway, while the diagram depicts the S3 artifact transfer directly to Device Farm. The blueprint retains these documented page and diagram details without inferring an undocumented CodePipeline role or additional triggering mechanism.

AWS does not specify the build script contents, the source/artifact bucket configuration, the Mac instance configuration, the iOS build toolchain, Device Farm test configuration, or the permissions and networking that connect the services. Those are left to consumers rather than filled in with assumptions. The two S3 elements represent the distinct script and artifact buckets shown in the diagram; neither is modeled as a database.

See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/) for the source collection.

## What teams usually customize

- **Source and build behavior:** connect the blueprint's iOS application and build-worker slots to project systems, and supply the build scripts and build toolchain.
- **Storage and artifacts:** choose bucket names, access controls, retention, and how test results, logs, and recordings are exposed.
- **Build and test execution:** configure the EC2 Mac instance, Systems Manager commands, Device Farm project, device selection, and test suites.
- **Workflow integration:** determine the event and orchestration details for the services in the source; AWS's page and diagram do not explain the CodePipeline label or API Gateway wiring.
