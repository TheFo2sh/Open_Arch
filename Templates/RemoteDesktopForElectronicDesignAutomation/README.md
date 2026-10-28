# Remote Desktop for Electronic Design Automation

An AWS reference architecture for using [Xilinx Vivado](https://www.amd.com/en/products/software/adaptive-socs-and-fpgas/vivado.html) through a remote desktop, based on AWS's [Remote Desktop for Electronic Design Automation](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/remote-desktop-eda/remote-desktop-eda.html) architecture and [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/remote-desktop-eda/remote-desktop-eda.pdf).

## What it is for

This template represents an FPGA engineer's single-instance remote workstation on AWS, with Vivado already installed and a remote desktop connection through Amazon DCV.

## How it works

1. Subscribe to the FPGA Developer AMI in AWS Marketplace. AWS describes it as including Vivado pre-installed.
2. Launch the CloudFormation stack with the required VPC, subnet, and Availability Zone selections. The workstation runs on an EC2 instance in that VPC and is enclosed by a security group.
3. Optionally assign an Elastic IP address for a persistent IP.
4. Connect to Amazon DCV with its client or a web browser on port 8443. The engineer launches Vivado in the AMI's terminal, and the desktop is displayed locally.
5. Optionally configure access to an Amazon S3 bucket for design data.

## Assumptions and limits

- The source page does not specify the CloudFormation template, AWS region, instance type, network rules, IAM permissions, AMI listing seller/version/identifier, or Vivado licensing terms. This template does not invent those details.
- The source diagram shows a VPC, one Availability Zone, a security group, and one remote desktop instance; it does not describe high availability or backup behavior.
- Amazon DCV is modeled as remote desktop software on the workstation. The local client or browser is represented by the EDA engineer slot.
- The FPGA Developer AMI is an image/provisioning artifact, not a separately deployable software container. Its catalog entry records the source's named dependency; the Vivado container models the included design suite.
- Amazon S3 and an Elastic IP address are optional. The template includes the S3 service, while the optional Elastic IP is described in the technology catalog and deployment flow rather than as a required runtime element.
- This is an architecture template, not an infrastructure deployment.

## What teams usually customize

- Choose the target VPC, subnet, Availability Zone, EC2 instance type, and security-group access policy for the organization's environment.
- Confirm an appropriate FPGA Developer AMI listing and Vivado license before launch; AWS's architecture page does not identify a listing version or seller.
- Add or omit the optional Elastic IP and S3 access. Define bucket permissions and data handling if S3 is used.
- Adapt identity, authentication, network controls, persistence, and backup requirements; those details are not defined by the reference architecture.
