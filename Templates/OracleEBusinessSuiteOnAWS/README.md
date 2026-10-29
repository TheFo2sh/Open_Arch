# Oracle E-Business Suite on AWS

An M1Spec architecture template based on the AWS [Oracle E-Business Suite on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/oracle-e-business-suite-on-aws/oracle-e-business-suite-on-aws.html), its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/oracle-e-business-suite-on-aws/images/oracle-e-business-suite-on-aws.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/oracle-e-business-suite-on-aws/oracle-e-business-suite-on-aws.pdf). See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Use this blueprint as a starting point for a resilient Oracle E-Business Suite deployment in one AWS Region and VPC. It represents the application and Oracle database tiers across Availability Zones, plus the AWS services named in the reference.

## Architecture and data flow

1. The design uses one AWS Region and one VPC. The diagram shows multiple Availability Zones, public and private subnets, an internet gateway, and a NAT gateway in each AZ.
2. An external Application Load Balancer distributes incoming application traffic across the DMZ APPL_TOP instances. AWS WAF protects the application endpoint, and Route 53 provides DNS.
3. The DMZ tier forwards application requests to an internal Application Load Balancer, which distributes them across the private application-tier APPL_TOP instances.
4. The Oracle E-Business Suite application tier uses the Oracle database tier. The diagram shows Oracle database EC2 instances in private subnets across AZs and synchronous replication with Oracle Data Guard.
5. Amazon WorkSpaces provides users with cloud desktops; AWS Directory Service authenticates users.
6. Amazon S3 stores backups, files, and objects. Amazon CloudWatch provides application logging, monitoring, and alarms.
7. AWS Systems Manager provides management and bastion-less access to private instances. AWS Backup centralizes and automates data protection for AWS and on-premises workloads.
8. AWS CloudFormation is also depicted in the diagram, but the source text does not describe its role.

## What applying it brings

| | |
|---|---|
| Zone | **AWS Region**, on the AWS platform |
| Platforms | Amazon VPC, Internet Gateway, NAT Gateways, external and internal Application Load Balancers, Amazon EC2, Route 53, WAF, WorkSpaces, Directory Service, S3, CloudWatch, Systems Manager, AWS Backup, and CloudFormation |
| Slots | **Oracle E-Business Suite**, the project's application system; **Users**, mapped to the project's users |
| Containers | **DMZ application tier** and **Application tier**, both using Oracle E-Business Suite |
| Databases | Primary and standby Oracle databases on Amazon EC2 |

## Assumptions and unspecified details

- The diagram depicts two AZs, EC2 APPL_TOP instances in public and private subnets, Oracle database instances in private subnets, and synchronous Oracle Data Guard replication. The blueprint captures those depicted roles, not an exact instance count, sizing, database edition, storage design, or failover configuration.
- The diagram does not label the request path between the DMZ tier and internal load balancer. The blueprint represents the DMZ tier forwarding application requests to that load balancer as an architectural assumption; protocols and routing are left to the consuming team.
- AWS does not specify the VPC address ranges, subnet and route-table configuration, NAT egress paths, security-group rules, or load-balancer listeners and health checks.
- AWS does not identify the S3 bucket's individual consumers or contents beyond backups, files, and objects; nor does it state AWS Backup selections, schedules, retention, or recovery objectives.
- Directory topology, WorkSpaces settings, DNS records, WAF rules, CloudWatch metrics and alarms, and Systems Manager policies are not specified.
- CloudFormation appears in the diagram, but AWS provides no accompanying description of its use in this architecture. The template does not assign it a deployment workflow.
- This is an architecture template, not deployable infrastructure. The source does not prescribe a particular implementation of the omitted configuration.

## What teams usually customize

- Choose the Region, AZ count, subnet layout, and routing policy to fit resilience and network requirements.
- Set the Oracle E-Business Suite application and database instance counts, sizing, licensing, storage, and Data Guard failover approach.
- Define DNS, WAF, load-balancer, Directory Service, WorkSpaces, Systems Manager, logging, backup, retention, and recovery policies.
- Specify how the application uses S3 and whether CloudFormation is part of the deployment process.
