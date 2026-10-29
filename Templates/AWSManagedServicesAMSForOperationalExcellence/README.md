# AWS Managed Services (AMS) for Operational Excellence

This template models the six AWS reference architectures that describe how AWS Managed Services (AMS) provides helpdesk, proactive monitoring, security operations, logging, patching, and backup. It is a logical architecture template, not an infrastructure deployment.

## Sources

- [AWS reference architecture catalog entry](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/aws-managed-services-operational-excellence.html)
- [Consolidated architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/aws-managed-services-operational-excellence.pdf)
- [AMS for Helpdesk](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-helpdesk.html)
- [AMS for Proactive Monitoring](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-proactive-monitoring.html)
- [AMS for Security Operations](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-security-operations.html)
- [AMS for Logging](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-logging.html)
- [AMS for Patching](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-patching.html)
- [AMS for Backup](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-managed-services-operational-excellence/ams-backup.html)

The six pages and diagrams were validated by the AWS Managed Services team on September 20, 2022.

## What it is for

Organizations use AMS for round-the-clock operational support across AWS accounts. AMS provides helpdesk and incident management, baseline and custom monitoring, security-event handling, centralized logging, OS patch orchestration, and backup monitoring and restoration.

## Architecture and data flow

The blueprint separates AMS-managed application accounts, the AMS service account, centralized security and logging accounts, and AWS Support. These are logical account boundaries shown in the source; they are not deployment instructions.

1. **Helpdesk:** Customer governance and ITSM teams set service levels, policies, and tooling. Customers or partners raise incidents and requests through their ITSM integration or AWS Support APIs. AWS Support carries the requests and AMS updates. The AMS service account receives monitoring and security events; its Express Workflows investigate alarms, reduce noise, manage cases, remediate, and aggregate/report results. AMS Operations monitors customer environments 24x7, with dedicated security engineers and named cloud architect and service delivery manager roles.
2. **Proactive monitoring:** AMS provisions CloudWatch monitoring at OS, infrastructure, and account levels. CloudWatch metrics, alarms, rules, events, and dashboards cover resources including EC2, RDS, Elastic Load Balancing, VPN, and NAT Gateway. AWS Config and GuardDuty findings, custom PCI/NIST/CIS/HIPAA rules, and Alarm Manager support compliance and threat monitoring. Events flow to AMS automation and can trigger notifications or remediation.
3. **Security operations:** AMS enables security services and logs, including CloudTrail, VPC Flow Logs, AWS Config, GuardDuty, and optional Macie monitoring. Findings and noncompliant rules are aggregated into AMS operations for investigation, noise reduction, and remediation. Systems Manager and AWS Backup support incident remediation and restoration. AWS Security Hub can ingest security events from third-party tools.
4. **Logging:** CloudTrail API activity, CloudWatch OS/application logs, VPC Flow Logs, and Route 53 DNS logs are available in local CloudWatch Logs for search, alerts, and troubleshooting. AMS monitors local events and findings. Security events can be consolidated in a security account; local logs and events are streamed through Amazon Data Firehose (labeled Amazon Kinesis Data Firehose in the diagram) into Amazon OpenSearch Service for operational alerting, reporting, and dashboards.
5. **Patching:** Application and DevOps teams define patch groups, maintenance windows, baselines, and testing. AMS uses Systems Manager runbooks to patch OSs, with EventBridge and Step Functions orchestrating events and workflows. AWS Config and CloudWatch provide compliance and alarm coverage; the AMS Console provides patch coverage reporting, with Athena shown in the diagram.
6. **Backup:** Application and DevOps teams define backup windows, plans, recovery objectives, and disaster-recovery tests. AMS uses AWS Backup plans and vaults, with resource tagging, for supported services and resources including EC2, EBS, and EFS. EventBridge and Step Functions orchestrate backup events, while Config and CloudWatch support compliance, monitoring, alerting, coverage reporting, and failure remediation.

## Assumptions and boundaries

- The systems and users in the blueprint are mapping slots. Map them to the project's own workloads, ITSM system, users, and support roles when applying the template.
- AWS depicts application, AMS orchestrator, security, and logging VPC/account boundaries. Their topology, network controls, and deployment configuration are not specified here.
- ServiceNow and Jira SD are alternatives for the customer/partner ITSM integration, not mandatory dependencies. AWS Support APIs are another documented integration path.
- AWS says third-party security tools can send events to Security Hub but does not name vendors. The blueprint therefore uses an unnamed third-party system slot rather than inventing products.
- The source says AMS enables five of six essential log types but details only CloudTrail API, CloudWatch OS/application, and VPC Flow Logs in the prose. The remaining log types are not named here.
- AMS describes daily patch and backup coverage reporting, but does not specify report schemas, Athena queries, retention, or the underlying data stores. No such details are inferred.
- The diagrams show service integrations and operational flows, not a complete list of supported AWS resources or a prescriptive account topology. AMS coverage depends on the selected operations plan and supported services.

## What consumers usually customize

- Map the customer workload, ITSM, third-party security tool, and user slots to their own systems and roles.
- Select and configure the ITSM integration, security-event sources, policy frameworks, alarms, thresholds, and notification destinations.
- Define account boundaries, log types and retention, patch groups and windows, backup plans and vaults, recovery objectives, and disaster-recovery testing.
- Add deployment-specific network and service details only after confirming them against the chosen AMS operations plan and AWS account configuration.
