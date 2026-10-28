# Pull Request Continuous Integration

An AWS architecture for running continuous integration on pull requests before they are merged. This template models the documented design; it does not deploy AWS resources.

## Sources

- [AWS Pull Request Continuous Integration reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/pull-request-continuous-integration/pull-request-continuous-integration.html)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Use the pattern to give developers CI feedback on a proposed change before it reaches the mainline, while validating more than the build alone: validation, unit tests, an artifact build, a preview environment, and integration/end-to-end tests.

## How it works

1. A GitHub or Bitbucket webhook notifies AWS CodeBuild when a pull request is created or updated. AWS CodeCommit is an alternative source; its pull request events use a Lambda trigger.
2. CodeBuild archives the pull request source in the **Git Artifacts** S3 bucket and enqueues a ready message in SQS.
3. A consuming Lambda checks prerequisites, starts CI, copies the source into a separate **Pipeline Source** S3 bucket, and removes obsolete queued versions when an existing pull request is updated.
4. Amazon API Gateway coordinates validation, unit testing, artifact build, preview environment creation, and integration/end-to-end tests. API Gateway is retained as named in the AWS architecture.
5. Amazon EventBridge tracks stage changes. A status Lambda reports progress, failure, or success to the selected Git provider.

## Assumptions and details not specified

- The GitHub and Bitbucket paths are alternatives, as is the AWS CodeCommit source path; a deployment normally selects the provider it uses.
- AWS's architecture does not specify the webhook configuration or authentication, API routes and integrations, Lambda runtimes, SQS settings, source archive format, or bucket security and retention settings.
- The source names the CI stages but does not specify their individual implementation, the preview environment's hosting services or lifetime, test frameworks, stage ordering or parallelism, or artifact contents. These are deliberately not modeled as additional services.
- The model distinguishes Git Artifacts from Pipeline Source because they have different roles. Their account/Region placement, access policies, and copy mechanics are not specified.
- The architecture does not define the producers or schema of EventBridge stage events, status callback API, provider credentials, retry behavior, IAM permissions, networking, or deployment topology; consumers decide these details.

## What teams usually customize

- Select GitHub, Bitbucket, or CodeCommit and configure its webhook or source trigger and status callback.
- Define the API Gateway integration and the implementation and ordering of validation, unit, artifact, preview, and integration/end-to-end stages.
- Configure the queue, Lambda behavior, and handling of pull request updates and obsolete messages.
- Choose bucket access, encryption, retention, and artifact policies, and design the preview environment.
- Add the team's required identity, permissions, networking, account boundaries, and operational controls.
