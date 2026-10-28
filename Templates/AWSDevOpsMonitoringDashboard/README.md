# AWS DevOps Monitoring Dashboard

An AWS architecture for ingesting CI/CD events and metrics, transforming and querying that data, and visualizing DevOps metrics with Amazon QuickSight. This template models the architecture; it does not deploy AWS resources.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-devops-monitoring-dashboard/aws-devops-monitoring-dashboard.html) and its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aws-devops-monitoring-dashboard/aws-devops-monitoring-dashboard.pdf#aws-devops-monitoring-dashboard).
- [AWS DevOps Monitoring Dashboard solution architecture description](https://github.com/aws-solutions/aws-devops-monitoring-dashboard#architecture-diagram), used for the named CI/CD event sources and flow details.

## What it is for

The architecture gathers CI/CD pipeline activity and build metrics so teams can visualize measures such as change failure rate, deployment activity, code-change volume, and mean time to recovery (MTTR).

## How it works

1. Developers initiate activity in AWS CodeCommit, CodeBuild, CodeDeploy, and CodePipeline. EventBridge rules match events from sources and send them to Amazon Data Firehose. CodeBuild metrics are captured by CloudWatch Metric Streams and delivered to Firehose.
2. For GitHub repositories, push events are posted to an Amazon API endpoint and delivered to Firehose.
3. Optionally, a CloudWatch alarm monitors an Amazon CloudWatch Synthetics canary or CodePipeline. EventBridge captures alarm events for the MTTR data path.
4. Firehose invokes an AWS Lambda transformation function, which extracts relevant metric data and writes it to an S3 bucket in the monitoring account.
5. Amazon Athena queries the S3 data. Amazon QuickSight uses the query results to build dashboard visualizations for management teams.

## Assumptions and details not specified

- The blueprint names the AWS monitoring account but does not choose a Region or specify network boundaries, account layout, or deployment configuration. The source describes multi-account, multi-Region events as an optional feature.
- The canary and its alarm, or the CodePipeline alarm, are optional prerequisites for the MTTR event path.
- AWS does not specify the event-pattern contents, GitHub endpoint authentication, alarm thresholds, metric formulas beyond the named examples, S3 retention or encryption settings, or access policies in the reference architecture. These are intentionally left for the adopting team to decide.
- GitHub is represented as an external system using a textual technology label because the repository blueprint vocabulary has no third-party system element; the catalog still identifies GitHub as a third-party technology.

## What teams usually customize

- Select the CI/CD event sources and event patterns relevant to the team's tools and repositories.
- Configure GitHub webhook authentication, AWS account/Region boundaries, IAM permissions, and network/security controls.
- Decide whether to enable the optional canary or pipeline alarm path and define the MTTR calculation.
- Adapt the Lambda transformation, S3 data lifecycle, Athena catalog and queries, and QuickSight datasets and dashboards to the team's metric definitions.
