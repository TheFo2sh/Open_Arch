# Edit in the Cloud on AWS

A virtual video-editing environment on AWS for editors and creative professionals, modeled after [AWS's reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/edit-in-cloud-on-aws/edit-in-cloud-on-aws.html). The source also publishes a [diagram image](https://docs.aws.amazon.com/architecture-diagrams/latest/edit-in-cloud-on-aws/images/edit-in-cloud-on-aws.png) and an [editable PowerPoint](https://docs.aws.amazon.com/architecture-diagrams/latest/edit-in-cloud-on-aws/samples/edit-in-cloud-on-aws.zip).

## What it is for

Editors connect to a Windows workstation in AWS, use their chosen non-linear editing (NLE) software, and work with media on shared Amazon FSx for Windows File Server storage. AWS Directory Service provides directory-based authentication.

## How it works

1. An editor connects to the workstation with either a NICE DCV client or a Teradici PCoIP client. The workstation uses Windows Server 2019 and NVIDIA T4 GPU drivers.
2. The workstation authenticates editor logins through AWS Directory Service.
3. The workstation accesses the media assets on Amazon FSx for Windows File Server, which the AWS reference page describes as being mounted when the workstation starts.
4. The NLE product is chosen by the team; the AWS reference page does not specify or bundle one.

The remote display products are alternatives, not services that must be installed together. The AWS implementation guidance says Teradici CAS requires a subscription; its guidance for NICE DCV does not require a license server on EC2. Confirm current product and licensing terms before choosing.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Amazon EC2, AWS Directory Service, Amazon FSx for Windows File Server |
| Slots | **Edit workstation**, mapped to the project's editing system; **Editor**, mapped to one of its users |
| Containers | **Video editing environment** (Windows Server 2019 and NVIDIA T4 GPU drivers); **Remote display access** (NICE DCV or Teradici CAS) |
| Databases | **Editor directory** on AWS Directory Service; **Media asset share** on FSx for Windows File Server |

## Assumptions and limits

- The blueprint follows the AWS reference page's published description. It does not choose an NLE or assume a particular directory configuration, EC2 instance size, network layout, FSx capacity or deployment mode, media-ingest process, or backup/retention policy.
- AWS's [implementation guidance](https://github.com/aws-solutions-library-samples/guidance-for-edit-in-the-cloud-on-aws) describes a concrete deployment, including Managed Microsoft AD and configurable infrastructure. Those deployment details are not treated as requirements of this architecture template.
- This is an M1Spec architecture template, not an AWS CloudFormation deployment or a complete editing pipeline.

## What teams usually customize

- **Editing software and workstation capacity.** Choose the NLE and size the EC2 workstation and GPU resources for the actual media and workload.
- **Remote access.** Select NICE DCV or Teradici CAS, then configure the corresponding client, connectivity, and licensing.
- **Identity and storage.** Choose how the workstation joins the directory and set the FSx configuration, capacity, availability, access controls, and backup policy.
- **The surrounding workflow.** Add the network, media ingest, collaboration, and other services required by the production environment.
