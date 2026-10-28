# Fast Backup and Restore of TiDB on AWS

An M1Spec architecture template for the AWS reference architecture [Fast Backup and Restore of TiDB on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tidb-backup-restore/tidb-backup-restore.html), published February 16, 2023. It models TiDB Operator, TiDB and TiKV alongside Amazon EKS, EC2, EBS, and S3. AWS describes using EBS snapshots to back up and restore several terabytes in one hour without impacting cluster performance.

This is an architecture blueprint, not an AWS deployment or a guarantee of backup duration.

## What it is for

Use the pattern to understand a fast backup and restore flow for a TiDB cluster on AWS. TiDB Operator coordinates jobs that snapshot TiKV's EBS-backed data and store the related metadata in S3.

## How it works

The flow follows the four steps in AWS's [reference page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/tidb-backup-restore/tidb-backup-restore.html) and its [architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/tidb-backup-restore/tidb-backup-restore.pdf):

1. A user requests a backup. TiDB Operator checks and collects information about the volumes mounted to TiKV, creates a backup job, and the job pauses the scheduler and garbage collection.
2. The job asks AWS to create an EBS snapshot, then resumes the schedulers and garbage collection. Once the snapshot completes, the job saves its metadata to S3.
3. For a restore request, the backup job creates a restore job. It retrieves metadata from S3, extracts snapshot information, asks the AWS API to create EBS volumes from the snapshot, and returns the created volume information to TiDB Operator.
4. TiDB Operator configures EKS and mounts the restored volumes to their corresponding nodes. After restoration, the TiDB cluster exits restore mode and starts all TiDB nodes to serve requests.

The diagram depicts two EC2 TiDB nodes, each associated with a TiKV EBS volume, plus an EBS snapshot between the backup and restore clusters. This depiction does not establish a required cluster size.

## Assumptions and unspecified details

- The blueprint treats the TiDB Operator, TiDB cluster, and operator user as architecture slots where applicable; consumers map the systems and user to their own project.
- EBS volumes and snapshots are shown as storage for TiKV data. The source does not specify the snapshot implementation beyond Amazon EBS snapshots.
- The source does not define IAM policies, bucket layout, metadata format, snapshot retention or encryption, job scheduling, cluster sizing, network topology, or recovery objectives. None are prescribed here.
- The source describes scheduler and garbage-collection pause/resume behavior but does not detail the consistency protocol or failure handling.
- TiDB Operator, TiDB, and TiKV are the third-party software named or required by the described architecture; the blueprint does not add other software components.

## What teams usually customize

- Set the cluster size, node types, volume sizes, and AWS region to match workload requirements.
- Define least-privilege AWS permissions, S3 bucket policies, encryption, metadata organization, and snapshot retention.
- Specify when jobs run, operational monitoring, recovery objectives, and failure handling.
- Adapt the EKS and EC2 arrangement to the team's Kubernetes and networking design.
