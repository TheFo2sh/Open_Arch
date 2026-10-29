# Running SAS Grid on AWS

An AWS reference architecture for SAS Grid compute and shared file storage, based on AWS's [Running SAS Grid on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/sas-grid-on-aws/sas-grid-on-aws.html) reference (published July 25, 2022).

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/sas-grid-on-aws/sas-grid-on-aws.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/sas-grid-on-aws/images/running-sas-grid-on-aws-ra.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/sas-grid-on-aws/sas-grid-on-aws.pdf#sas-grid-on-aws)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

This template provides a starting point for running SAS Grid on Amazon EC2 with shared, high-performance FSx for Lustre storage. SAS clients, the mid-tier, metadata tier, and compute tier are slots to map to a project's systems and users when applying the template. The blueprint models the architecture; it does not deploy AWS resources.

## How it works

1. SAS clients access the mid-tier, which runs SAS Platform Web Services (PWS) and the Load Sharing Facility (LSF) client.
2. The metadata tier runs on Amazon EC2. AWS suggests r5 instances for the mid-tier and metadata servers. For metadata-server memory, AWS recommends the larger of 8 GB per physical core or 24 GB; additional instances are optional for high availability.
3. Amazon EC2 compute nodes run the LSF platform. AWS suggests 8 GB of memory per physical core and 100–125 MB/s of file-system performance per core. It recommends m5n or r5n instances when SASDATA, SASWORK, and UTILLOC use FSx for Lustre, or i3en instances when SASWORK is offloaded to local instance storage.
4. The FSx for Lustre file system is reached through an elastic network interface in the VPC. Standard VPC security groups control access.
5. A persistent FSx for Lustre file system hosts the shared SASDATA, SASWORK, and UTILLOC libraries. AWS describes FSx for Lustre as a managed file system with submillisecond latency, high throughput and IOPS, and encryption at rest and in transit.
6. Standalone FSx for Lustre file systems can create automatic, durable, incremental, file-system-consistent backups in Amazon S3.

## Assumptions and details not specified

- The instance families and memory/throughput figures are AWS's July 2022 guidance, not universal or current sizing requirements. Validate sizing against the SAS release, workload, physical-core count, and measured I/O needs.
- The source does not prescribe instance sizes, storage capacity or throughput settings, Regions, subnet layout, security-group rules, encryption configuration, or a particular SAS/LSF release. These remain deployment choices.
- The source describes automatic backups for standalone FSx for Lustre file systems. The blueprint does not assume that every FSx deployment has this backup configuration.
- Local SASWORK is an optional alternative to shared FSx SASWORK, not an additional required copy. The FSx SASWORK database describes the shared-storage option.
- The diagram also depicts client connectivity and network/management components such as VPN or Direct Connect, gateways, a bastion host, and a remote desktop gateway. This blueprint focuses on the numbered SAS/FSx architecture flow and leaves those deployment-specific components to the adopting team.
- The metadata-server software and its relationships to the shared libraries are not specified in the source, so no additional software or data flow is assumed for that tier.

## What teams usually customize

- Choose EC2 families, instance counts, memory, and FSx capacity/throughput for the target SAS release and measured workload; add mid-tier or metadata instances if high availability is required.
- Decide whether SASWORK belongs on shared FSx storage or local instance store, and determine the resulting recovery and persistence requirements.
- Set up VPC connectivity, subnets, security groups, identity and access controls, encryption, and backup retention.
- Select and configure the SAS Grid, PWS, and LSF versions and define any metadata-server/library flows not covered by the reference.
