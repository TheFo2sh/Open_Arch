# EDA on AWS with IBM Spectrum LSF

This template models AWS's [EDA on AWS with IBM Spectrum LSF](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/eda-ibm-spectrum-lsf/eda-ibm-spectrum-lsf.html) reference architecture. The source is part of the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Run electronic design automation (EDA) simulation jobs on dynamic Amazon EC2 execution hosts. IBM Spectrum LSF manages the job queue and elastic hosts, while Xilinx Vivado performs the design simulations using data on shared Amazon EFS storage.

## How it works

1. Corporate engineers log in to the EDA login server and submit simulation jobs.
2. IBM Spectrum LSF queues jobs. Its Resource Connector provisions dynamic EC2 execution hosts, joins them to the cluster, and LSF dispatches queued work.
3. Each execution host loads the prelicensed Xilinx Vivado Design Suite from the FPGA Developer AMI.
4. Vivado reads designs and IP from `/ec2-nfs/proj` and writes runtime data and results to `/ec2-nfs/scratch`.
5. Amazon EFS also holds the LSF binaries, configuration, and logs.
6. IBM Spectrum LSF terminates dynamic EC2 execution hosts after their jobs complete.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon EC2 and Amazon Elastic File System |
| Slots | **Corporate EDA engineer** and **EDA simulation environment** |
| Containers | **EDA login server**, **IBM Spectrum LSF job scheduler**, and **Dynamic EC2 execution hosts** |
| Component | **IBM Spectrum LSF Resource Connector** in the scheduler |
| Shared data | EDA project designs and IP, scratch/runtime data and results, and LSF binaries, configuration, and logs on EFS |
| Named products | IBM Spectrum LSF, IBM Spectrum LSF Resource Connector, FPGA Developer AMI, and Xilinx Vivado Design Suite |

## Assumptions and unspecified details

This is an architecture template, not deployable AWS infrastructure. AWS's numbered flow identifies the roles and shared paths above but does not specify the VPC and network design, login or scheduler host sizing, whether the scheduler shares a host with the login server, operating system, EC2 instance types or fleet size, LSF configuration, job resource requirements, EFS performance settings, or access controls. The blueprint groups the roles into one logical EDA system and does not infer a particular host layout.

The source identifies the FPGA Developer AMI as providing prelicensed Vivado, but does not identify an AMI version, listing, license terms, or host configuration. The source does not specify job scripts, data formats, retention, backup, or detailed mount and security settings. These details are left open rather than inferred.

## What teams usually customize

- Map the engineer and EDA system slots to the project's people and existing systems.
- Choose EC2 sizing, capacity limits, network placement, and the LSF login and scheduler host layout.
- Configure LSF queues, Resource Connector policies, and job requirements for the workload.
- Select the FPGA Developer AMI version and validate licensing and compatibility with the organization's Vivado workflow.
- Adapt the EFS directories, performance, access, retention, and backup policies for project data, scratch/results, and LSF files.
