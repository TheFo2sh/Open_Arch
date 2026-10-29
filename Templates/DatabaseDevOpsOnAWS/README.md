# Database DevOps on AWS

An M1Spec template based on AWS's [Database DevOps on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/) reference architecture. AWS documents separate development and production workflows for automating database changes alongside application code.

## What it is for

Use this as a starting point for teams that want source control, joint application/database reviews, automated build and test actions, coordinated application and database deployments, and event-driven operations notifications.

## Architecture and data flow

The source describes these development workflow steps:

1. A developer checks application and database code into AWS CodeCommit.
2. CodeCommit approval rules enforce code reviews on push requests.
3. Amazon CodeGuru Reviewer evaluates code changes and offers recommendations.
4. CodeCommit initiates AWS CodePipeline.
5. The pipeline's Source action checks out application and database code.
6. Its Build action invokes a build management tool to start the build phase.
7. The build tool calls a database change tool, which downloads database scripts and runs them against the development database.
8. The build tool calls database test scripts and validates their output.
9. The pipeline's Deploy action deploys code to the target environment.
10. Build artifacts are published to AWS CodeArtifact.
11. Optionally, Amazon RDS Performance Insights and Amazon DevOps Guru detect performance bottlenecks and operational issues.
12. Amazon EventBridge captures events and sends them to an Amazon SNS topic for notifications.

For production, a release manager issues a deployment request. CodePipeline invokes the build and database change tools; the database change tool runs scripts against the production Amazon RDS database; and the pipeline deploys code to the target environment. Performance Insights and DevOps Guru are optional here as well. EventBridge sends captured events to SNS for notifications and corrective action by appointed teams.

The source diagram also shows Amazon EC2 hosting the database change management tool and Amazon CloudWatch in the development workflow. AWS does not describe CloudWatch's role or specify its event sources, so the blueprint does not infer a connection for it. The diagram names Maven as a build-tool example and Flyway or Liquibase as database-change-tool examples; none is a prescribed product.

## Applying it

| | |
|---|---|
| Zone | AWS |
| Slots | Developer, application/database code reviewers, release manager, DevOps team/release managers, application, and operations/release management |
| Platforms | CodeCommit, CodeGuru Reviewer, CodePipeline, CodeBuild, CodeDeploy, CodeArtifact, EC2, RDS, Performance Insights, DevOps Guru, CloudWatch, EventBridge, and SNS |
| Databases | Development and production databases hosted on Amazon RDS |

## Assumptions and limits

- The source does not specify the database engine, schema, runtime or hosting platform for the target application, network layout, or the configuration of development and production environments.
- Build management and database change tools are named by role rather than selected product. Maven, Flyway, and Liquibase are examples in the diagram, not requirements; the technology catalog records them as candidate third-party tools.
- The source does not specify database test frameworks/scripts, artifact formats, the CodePipeline event configuration, the events observed by EventBridge, or how CloudWatch participates. CloudWatch is shown in the diagram, but its specific behavior is not explained.
- Performance Insights and DevOps Guru are optional. The template does not invent a direct integration or alert path between them.
- This is an architecture template, not deployable AWS infrastructure or an implementation guide.

## What teams usually customize

- Choose the build management and database change tools, along with database test scripts.
- Map the application and operations slots to existing project systems and users.
- Specify the database engine, target application environments, deployment mechanism, artifact formats, and environment-specific safeguards.
- Decide which optional monitoring services and event sources to use, then document the actual event and notification flows.

## Sources

- [AWS Database DevOps on AWS landing page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [Development Workflow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/database-devops-development.html)
- [Production Workflow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/database-devops-production.html)
- [PDF containing both workflow diagrams](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/database-devops/database-devops.pdf)
- [Development workflow diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/images/database-devops-1.png) · [Production workflow diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/database-devops/images/database-devops-2.png)
