# Cross-Account Amazon EC2 Status Monitoring for HPC Clusters

This template models AWS's [Cross-Account Amazon EC2 Status Monitoring for HPC Clusters](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/hpc-cluster-monitoring/hpc-cluster-monitoring.html) reference architecture. The [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/hpc-cluster-monitoring/hpc-cluster-monitoring.pdf#hpc-cluster-monitoring) contains the same architecture diagram.

## What it is for

The design gives a central IT group one view of EC2 state changes across multiple HPC cluster accounts. AWS also describes an optional partner use case: a third-party HPC provider can monitor relevant customer HPC resources without receiving all account logs and activity. The partner is an actor, not a third-party software service in the diagram; the documented architecture uses AWS services only.

## How it works

1. EC2 instances in each HPC cluster account emit state-change events (start, stop, and terminate) to Amazon EventBridge.
2. AWS Lambda processes the events and filters them by an EC2 tag. Only events matching the tag are sent onward; AWS says the default tag is `HPC`.
3. The matching events are logged in Amazon CloudWatch Logs in the HPC cluster account. CloudWatch cross-account observability shares those logs with the centralized monitoring account.
4. A preconfigured Amazon CloudWatch dashboard in the centralized account shows the latest cluster status and each individual EC2 instance's status.

## What applying it brings

- Two AWS zones: representative HPC cluster account(s) and a centralized monitoring account. Repeat the cluster-account side for each participating account as needed.
- Technology platforms for Amazon EC2, Amazon EventBridge, AWS Lambda, Amazon CloudWatch Logs, and Amazon CloudWatch.
- Slots for the HPC cluster, event processor, dashboard, cluster operator, central monitoring operator, and optional HPC service partner.
- Log databases representing the tagged events and their centralized cross-account visibility.

## Assumptions and unspecified details

The AWS page and diagram describe the flow and services, but do not specify the Lambda implementation or runtime, exact EventBridge rules and tag-matching configuration, IAM roles and permissions, log-group names or retention, cross-account observability setup details, or dashboard widgets and metrics. The template does not invent these. The centralized log relationship represents shared visibility; it does not prescribe a log-copying or replication mechanism. AWS does not identify a required third-party service; the partner is an optional role in one use case.

This is an architecture template, not deployable infrastructure. It does not specify account count, HPC scheduler or application, network design, or deployment automation.

## What teams usually customize

- Map the cluster and monitoring slots to the project's existing systems and users; add or repeat cluster-account coverage to match the organization.
- Choose the HPC tag, event filters, log configuration, cross-account permissions, and dashboard contents for the environment.
- Include the partner role only when an external HPC provider participates, and define the customer's desired access boundaries.
- Add the HPC scheduler, workload software, networking, and deployment mechanisms if they are in scope for the project architecture.
