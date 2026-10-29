# Data Protection Reference Architectures with AWS Backup

An M1Spec template based on AWS's [Data Protection Reference Architectures with AWS Backup](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/data-protection-aws-backup/data-protection-aws-backup.html) and its [architecture diagrams PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/data-protection-aws-backup/data-protection-aws-backup.pdf). It brings together the four related AWS patterns: cloud-native backups, cross-account and Region copies, landing-zone integration, and immutable backup vaults.

## What it is for

Use the blueprint to describe an AWS Backup strategy from a single AWS account through organization-wide protection, centralized audit, cross-account copies, and a locked backup data bunker. The source diagrams are reference patterns, not an infrastructure deployment plan.

## How it works

1. **Cloud-native protection.** CloudFormation creates the AWS Backup resources. A backup plan defines schedule, retention, lifecycle, copy destination, resource selection, and backup window. Jobs create recovery points in a vault encrypted with KMS. IAM and vault policies control access. CloudTrail records Backup actions, CloudWatch monitors service metrics, EventBridge monitors events such as failed or deleted backups, and Backup Audit Manager tracks compliance and produces reports.
2. **Organization-wide protection.** AWS Organizations backup policies target accounts or organizational units; StackSets deploy resources across accounts. Service control policies protect backup resources. Member-account plans run scheduled jobs and create recovery points. Customer-managed KMS keys and vault permissions enable cross-account copies; a policy specifies the destination vault and account for cross-Region copies. EventBridge forwards events to a central event bus, and SNS triggers email notifications. Administrators monitor activity from the management account.
3. **Landing-zone integration.** Customizations for Control Tower (CfCT) integrates AWS Backup with the landing zone. Organizations and StackSets distribute guardrails and backup resources. CloudTrail, CloudWatch, and AWS Config support centralized audit; CloudTrail events and Config logs are stored in the Log Archive account's S3 bucket. IAM cross-account roles support shared KMS resources. Backup policies create plans in target accounts and OUs, Audit Manager monitors compliance, and backup copies and reports are centralized. Service Catalog offers predefined backup configuration for self-service.
4. **Immutable backup data bunker.** Member-account vault policies limit copy-out to the bunker account. The bunker vault uses Vault Lock and restricts copy-in to approved OUs or accounts. A separate Key Vault account shares a customer-managed KMS key with the central vault account, with additional controls such as MFA for critical key API calls. Service control policies, role restrictions, break-glass user access with MFA, federated STS temporary credentials, Audit Manager, and an organizational CloudTrail protect and monitor the bunker.

## What applying it brings

| | |
|---|---|
| Zones | Cloud-native AWS account, Organizations management account, member accounts, cross-Region backup destination, Log Archive account, central backup account, Backup Data Bunker account, and Key Vault account |
| Platforms | AWS Backup, CloudFormation/StackSets, IAM, KMS, CloudTrail, CloudWatch, EventBridge, Backup Audit Manager, Organizations, Control Tower, Service Catalog, S3, Config, SNS, and STS |
| Slots | Backup and recovery operators, administrative activities, and protected AWS resources |
| Databases | Backup vault/recovery points, centralized audit logs, central backup vault, and Vault Lock vault |

## Assumptions and details not specified by AWS

- The blueprint consolidates the four diagrams in the AWS guide. The AWS source does not say that the accounts, Regions, resources, or controls in separate diagrams must be deployed together.
- AWS leaves the compute, database, and storage services selected for backup unspecified in the cloud-native diagram. They are represented as a protected-resources slot rather than guessed AWS products.
- The landing-zone page omits the name of the SSO service after “by using”; it also does not identify the corporate identity provider. The template does not invent an identity product or third-party provider. Federation and the break-glass/MFA workflow remain described at the documented level.
- The guide describes the central backup account, Backup Data Bunker account, and Central Vault Account in different patterns; it does not say whether these are the same account. They are modeled as separate zones where needed and should be reconciled for a particular deployment.
- The architecture does not specify AWS Regions, account identifiers, resource tags, backup schedules, retention periods, lifecycle settings, vault names, key policies, exact IAM roles, or detailed SCP contents. It does not provide infrastructure code or deploy resources.
- AWS calls out CloudWatch monitoring in the cloud-native and landing-zone patterns; the cross-account diagram's centralized event bus and SNS notifications are represented separately from CloudWatch metrics.

## What teams usually customize

- Choose account and OU structure, AWS Regions, protected resources, resource-assignment tags, backup plan schedules, retention/lifecycle, copy destinations, and vault names.
- Define customer-managed KMS keys, cross-account key and vault policies, IAM roles, SCPs, break-glass access, and MFA requirements.
- Decide which audit logs and reports are centralized, how long they are retained, and who can access the Log Archive, central backup, and data bunker accounts.
- Select the landing-zone SSO/federation provider and resolve whether the central backup vault and data bunker are the same account.
