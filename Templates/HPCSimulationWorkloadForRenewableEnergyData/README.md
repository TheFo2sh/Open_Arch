# HPC Simulation Workload for Renewable Energy Data

An AWS architecture for ingesting renewable-energy telemetry, running HPC simulations, and analyzing results. It follows AWS's [HPC Simulation Workload for Renewable Energy Data reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/hpc-simulation-renewable-energy/hpc-simulation-renewable-energy.html), including the [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/hpc-simulation-renewable-energy/images/hpc-simulation-renewable-energy.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/hpc-simulation-renewable-energy/hpc-simulation-renewable-energy.pdf#hpc-simulation-renewable-energy). The architecture is listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Renewable-energy operators can collect data from solar panels, wind turbines, and weather stations, use it for high-performance simulation and AI/ML workloads, and analyze results through reports and dashboards.

## How it works

The numbered flow follows the AWS source page and diagram:

1. On-premises renewable-energy assets produce telemetry. Engineers access the cluster using browser-based tools, NICE DCV, or Secure Shell (SSH).
2. AWS IoT Core connects devices and routes messages through IoT rules. AWS IoT SiteWise collects and models industrial equipment data.
3. Amazon Kinesis Data Streams processes telemetry records in real time, and Amazon Data Firehose delivers processed records to storage.
4. Amazon S3 holds the central workload data lake. The diagram also shows Amazon S3 Glacier Deep Archive for long-term data retention.
5. AWS ParallelCluster and AWS CloudFormation create the HPC infrastructure. An EC2 head node coordinates simulation jobs on a scalable EC2 compute fleet managed by Amazon EC2 Auto Scaling. The head node uses Amazon EBS; compute nodes share Amazon FSx for Lustre. FSx integrates with S3 buckets for simulation inputs and outputs.
6. AWS Glue crawlers discover JSON and CSV schemas and register them in the AWS Glue Data Catalog. Amazon Athena prepares report data and builds views; Amazon QuickSight queries and visualizes the results.
7. Amazon CloudWatch is shown alongside the compute cluster for monitoring.

## Assumptions and unspecified details

- The source does not specify regions, networking, security controls, access policies, capacity, retention periods, or the exact S3 bucket layout. These remain open for the applying team.
- The source does not detail how IoT Core and SiteWise are configured together, or the exact data path from SiteWise into downstream processing. The blueprint shows the high-level telemetry flow without prescribing that integration.
- The source names HPC simulation and AI/ML workloads but does not identify a simulation package, job scheduler, ML framework, or model-training service. None is added here.
- The source shows ParallelCluster and CloudFormation creating the cluster but does not state where the ParallelCluster tooling runs; its placement is intentionally left unspecified.
- NICE DCV and SSH are the named remote-access options. The source does not identify a third-party provider, specific SSH client, or browser product.
- The diagram includes CloudWatch and S3 Glacier Deep Archive but does not specify monitoring metrics, alarm configuration, archive policies, or retrieval workflows.
- S3 buckets and service-managed stores are represented as `database` elements because the template specification has no separate object-store or dataset element kind. Systems and users are slots to map to the applying project's own systems and users.

This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the renewable-energy assets, HPC workload, head node, provisioning workflow, and engineer slots to their own systems and users.
- Choose simulation software, schedulers, compute sizing, ParallelCluster configuration, and the cluster's access method.
- Define telemetry models and routing, S3 bucket layout, simulation input/output exchange, retention and archive policies, and data formats.
- Configure AWS networking, security, CloudWatch metrics and alarms, crawler scope, Athena views, and QuickSight dashboards for the project.
