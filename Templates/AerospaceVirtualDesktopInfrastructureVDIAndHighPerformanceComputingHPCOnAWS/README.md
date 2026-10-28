# Aerospace Virtual Desktop Infrastructure (VDI) and High Performance Computing (HPC) on AWS

This template models AWS's [Aerospace VDI and HPC reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-aerospace-vdi-reference-architecture/aws-aerospace-vdi-reference-architecture.html), including its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aws-aerospace-vdi-reference-architecture/aws-aerospace-vdi-reference-architecture.pdf). The source is listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

An aerospace engineering environment for computer-aided engineering (CAE) visualization and HPC computations. Users access Windows or Linux virtual desktops with NICE DCV, submit and monitor HPC jobs, and exchange files between on-premises and the cluster.

## How it works

1. An engineer uses browser/API, NICE DCV, SSH, and SFTP clients in the on-premises environment. Elastic Load Balancing routes NICE DCV sessions to the Windows and Linux VDI.
2. The HPC cluster head node supports job submission and monitoring and starts or stops Amazon EC2 HPC compute nodes through Auto Scaling groups.
3. AWS Directory Service provides centralized user management. The head node, both VDI types, and HPC compute nodes join the Active Directory domain.
4. AWS Transfer Family provides SFTP data exchange between on-premises and the cluster. FSx for NetApp ONTAP provides user data accessible from both VDI types and shares data with on-premises. HPC nodes use FSx for Lustre during computations.
5. Amazon OpenSearch Service stores HPC job and host information. The diagram also includes Amazon EFS in the cluster filesystem group; AWS does not assign it a specific data set or access pattern in the accompanying text.
6. EC2 Image Builder builds specialized Linux and Windows AMIs for the environment.

## Assumptions and unspecified details

The template represents only the elements and relationships described or shown in the AWS source. AWS does not specify the VDI or HPC instance sizes, operating system versions or Linux distribution, specialized CAE applications, job scheduler, web/API implementation, Directory Service configuration, network topology, security settings, deployment scale, or exact EFS use. These are intentionally left open. The source mentions Scale-Out Computing on AWS as a possible foundation, not a required component. It does not name a separate third-party CAE application or HPC scheduler; NICE DCV is the named remote-display software.

This is an architecture template, not deployable infrastructure or an AWS deployment guide.

## What teams usually customize

- Map the aerospace engineer, on-premises environment, VDI, head node, and HPC compute-node slots to the project's own users and systems.
- Choose the VDI/HPC images, CAE applications, scheduler, job interface, Directory Service configuration, and network/security design.
- Decide the role and configuration of EFS and FSx storage, along with capacity, performance, and data lifecycle policies.
- Adapt the access path, file transfer, and whether to use the Scale-Out Computing on AWS solution as an implementation foundation.
