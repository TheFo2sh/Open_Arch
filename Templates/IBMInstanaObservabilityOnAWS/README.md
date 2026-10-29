# IBM Instana Observability on AWS

Hybrid observability for AWS workloads and corporate data-center hosts using IBM Instana host agents, dynamically loaded sensors, CloudWatch telemetry, and the Instana SaaS backend. This is an architecture template; it does not deploy AWS infrastructure.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-instana-observability/ibm-instana-observability.html)
- [AWS architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-instana-observability/images/ibm-instana-observability.png)
- [AWS PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ibm-instana-observability/ibm-instana-observability.pdf#ibm-instana-observability)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

Site reliability engineers and developers use Instana dashboards to troubleshoot applications and identify optimization opportunities across AWS workloads and corporate data-center hosts.

## How it works

1. SREs and developers access IBM Instana dashboards.
2. One Instana host agent runs on each monitored host. AWS host options shown are Amazon EC2, Amazon EKS, Amazon ECS, and Red Hat OpenShift Service on AWS (ROSA); agents can also run on corporate data-center hosts.
3. Agents dynamically obtain technology-specific sensors from sensor repositories. The reference says the repositories cover more than 300 technologies.
4. Sensors collect traces and metrics for AWS services through Amazon CloudWatch, including Amazon SQS, Amazon MSK, Amazon S3, Amazon Aurora, DynamoDB, and AWS Lambda.
5. Sensors also collect workload telemetry, including ROSA, IBM Db2, and IBM MQ.
6. Host agents aggregate sensor data and send it to the IBM Instana backend.
7. Corporate data-center agents send their collected telemetry to the same backend.
8. The backend delivers alerts and events through APIs, webhooks, email, or instant messaging.

## Assumptions and details not specified

- The diagram depicts IBM Instana SaaS within an AWS boundary, but does not identify its underlying AWS hosting products or deployment topology. The blueprint therefore shows the SaaS boundary and backend as logical elements without inventing infrastructure.
- The reference does not specify AWS accounts, Regions, networks, permissions, agent installation settings, sensor protocols, or the CloudWatch access path.
- ROSA, IBM Db2, and IBM MQ are shown as monitored workload examples. Their deployment configuration and individual telemetry settings are not described.
- Alert destination providers, endpoints, and delivery configuration are unspecified; the blueprint keeps these methods vendor-neutral.
- AWS managed services are represented as telemetry sources, not as specific provisioned instances or database contents.

## What teams usually customize

- Choose which AWS host types and corporate data-center hosts to monitor, and map the workload slots to the project's systems.
- Select the AWS managed services and workloads covered by sensors, then configure agent rollout, permissions, and telemetry collection.
- Define Instana backend tenancy/hosting details if they are needed for implementation; AWS does not detail them in this reference.
- Configure dashboards, alert rules, recipients, and the chosen API, webhook, email, or messaging integrations.
