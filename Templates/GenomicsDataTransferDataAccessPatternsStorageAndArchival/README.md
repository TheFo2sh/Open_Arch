# Genomics Data Transfer, Data Access Patterns, Storage, and Archival

An AWS reference architecture for transferring raw genomics data and clinical or annotation files to Amazon S3, providing file and parallel-filesystem access for bioinformatics workloads, and archiving data based on access patterns.

Sources: [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/), [architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/genomics-data-transfer-storage-archival/genomics-data-transfer-storage-archival.html), [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/genomics-data-transfer-storage-archival/images/genomics-data-transfer-storage-archival.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/genomics-data-transfer-storage-archival/genomics-data-transfer-storage-archival.pdf).

## What it is for

This pattern addresses distinct paths for raw sequencing data, clinical and annotation uploads, file access to S3, burst or cloud compute on shared storage, and long-term archival. It includes both on-premises and AWS-account data access.

## How it works

1. A sequencing technician loads a sample. The sequencer writes output to on-premises local storage, and AWS DataSync synchronizes raw data to an S3 bucket.
2. The research community and clinical researchers upload separate annotation and clinical files to S3 using AWS Transfer Family over FTP, SFTP, or FTPS.
3. Existing bioinformatics tools access S3 data through Amazon S3 File Gateway using NFS or SMB. Applications on-premises and in an AWS account can access S3 data.
4. Compute clusters use Amazon FSx for Lustre as a shared high-throughput parallel file system. They can use existing S3 data or support bursting from on-premises; compute may remain on-premises or run on EC2 instances managed through AWS Batch.
5. Instrument run data is written to an S3 bucket configured for infrequent access. S3 lifecycle policies transition archival data to Amazon S3 Glacier according to identified access patterns.

## What applying it brings

| | |
|---|---|
| Zones | **On-premises** and **AWS** |
| Services and platforms | AWS DataSync, AWS Transfer Family, Amazon S3, Amazon S3 File Gateway, Amazon FSx for Lustre, AWS Batch, Amazon EC2, Amazon S3 Glacier |
| User slots | Sequencing technician, research community, clinical researchers, research scientist, data scientist, bioinformatics scientist |
| System slots | Sequencer and local storage, clinical and annotation data uploads, existing bioinformatics applications, on-premises compute cluster, AWS-account research applications, AWS bioinformatics compute cluster |
| Databases | Raw genomics data bucket, clinical and annotation data bucket, infrequent-access instrument run data, shared parallel file system, genomics data archive |

## Assumptions and limits

The AWS source does not specify regions, account layout, network topology, security controls, encryption settings, throughput or capacity, retention periods, lifecycle thresholds, bucket naming, or the exact DataSync agent placement. Those are intentionally not prescribed here. The source names existing bioinformatics tools but no vendor or product; the template therefore uses system slots rather than inventing a third-party technology. The upload client implementation and the detailed relationship between compute clusters, Batch, and filesystem mounts also depend on a consumer's environment.

This is an architecture template, not an infrastructure deployment plan.

## What teams usually customize

- Map the system and user slots to the project's actual sequencers, users, bioinformatics applications, and compute environments, or leave out slots that do not apply.
- Choose S3 bucket boundaries, storage classes, access patterns, lifecycle transitions, retention, and any additional data governance or protection measures.
- Decide the DataSync agent location and the Transfer Family endpoint, supported protocols, identity integration, and upload workflow.
- Select the FSx for Lustre deployment and S3 data association, and determine whether workloads run on-premises, on EC2 through AWS Batch, or both.
- Add the networking, identity, security, monitoring, and operational details required by the deployment; they are outside the source diagram's scope.
