# IBM Planning Analytics with Watson on AWS

An AWS reference architecture for increasing availability of IBM Planning Analytics by running IBM TM1 Server on AWS. This template follows the [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-planning-analytics-with-watson/ibm-planning-analytics-with-watson.html), its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/ibm-planning-analytics-with-watson/images/ibm-planning-analytics-with-watson.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ibm-planning-analytics-with-watson/ibm-planning-analytics-with-watson.pdf). The page was published May 16, 2023.

## What it is for

Planning Analytics Workspace and TM1 Web provide the user-facing capabilities. A primary TM1 data tier serves requests while a standby tier, in another Availability Zone, can take over after a site reliability engineer initiates failover.

## Architecture and data flow

1. Corporate users reach AWS over a private connection using AWS Direct Connect and AWS Transit Gateway.
2. Planning Analytics Workspace runs on Red Hat OpenShift Service on AWS and provides modeling, reporting, and administration. IBM TM1 Web runs on EC2 instances across multiple Availability Zones and gives users access to cubes and websheets. The diagram shows an Application Load Balancer in the private application path.
3. Planning Analytics Workspace and TM1 Web use a Route 53 Private Hosted Zone to locate the active TM1 server. During failover, the DNS record redirects users to the standby server.
4. The TM1 data tier places TM1 Server and TM1 Admin Server on the same EC2 instance. They operate in active/passive mode; the admin server tracks active TM1 servers, and TM1 Server manages client access to its data directory.
5. Amazon EBS holds TM1 binaries, the data directory, transaction and application logs, and dumps. TM1 loads cubes, dimensions, and system information into memory at startup. Cube changes are held in memory and the transaction log, and are saved to disk when TM1 shuts down or is stopped by an administrator or batch process.
6. Backup jobs snapshot the binaries, data, and transaction-log volumes. Those snapshots are used to restore volumes on the standby EC2 instance. Amazon FSx for Windows File Server replicates saved TM1 data across Availability Zones so the standby can rebuild in-memory cubes when it starts.
7. Amazon CloudWatch receives TM1 logs and metrics and evaluates failure alerts. Alerts are sent through Amazon SNS; site reliability engineers receive the notifications and start failover.

## Applying the template

| | |
|---|---|
| Zone | AWS |
| Platforms | Direct Connect, Transit Gateway, VPC, Application Load Balancer, Route 53 Private Hosted Zone, Red Hat OpenShift Service on AWS, EC2, EBS, FSx for Windows File Server, CloudWatch, SNS |
| System slots | Planning Analytics Workspace, TM1 Web tier, TM1 data tier |
| User slots | Corporate users, site reliability engineers |
| Data stores | Primary and standby TM1 EBS volumes; primary and standby TM1 file systems |

This is an architecture template, not deployable infrastructure. It describes only the components and behavior documented in the AWS source; it does not prescribe a network topology or deployment configuration.

## Assumptions and unspecified details

- The source shows a VPC, private subnets, and multiple Availability Zones, but does not specify their count, CIDRs, region, security groups, or routing configuration.
- The source does not identify the operating system, instance sizes, software versions, OpenShift sizing, or detailed Application Load Balancer listeners and targets.
- It does not specify backup frequency or retention, CloudWatch metric names or alert thresholds, or the procedure for changing the Route 53 record and promoting the standby. Failover is human-initiated; this template does not imply automatic promotion.
- The source describes private access and a Route 53 Private Hosted Zone but does not document authentication, encryption settings, or the corporate network's exact connection design.
- EBS snapshots are modeled as an EBS backup/restore relationship, not as an additional AWS service. The template does not add a separate snapshot storage service.

## What teams usually customize

- Match the corporate users, SRE role, and three system slots to the project's existing systems and users.
- Specify the deployment details omitted by the AWS reference, including network/subnet design, sizing, software versions, monitoring thresholds, backup policies, and failover runbooks.
- Adapt the private connectivity, DNS, and application ingress relationships to the team's actual network and routing design.
