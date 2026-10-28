# Innovation Sandbox on AWS

An AWS solution for giving teams governed, temporary sandbox accounts to experiment in. It automates lease management, policy enforcement, spend and duration monitoring, and account cleanup. It manages and recycles existing AWS accounts; it does not create or close accounts.

Sources:

- [AWS reference architecture diagram catalog entry](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aws-innovation-sandbox/aws-innovation-sandbox.html)
- [AWS implementation guide: architecture overview](https://docs.aws.amazon.com/solutions/latest/innovation-sandbox-on-aws/architecture-overview.html)
- [AWS implementation guide PDF](https://docs.aws.amazon.com/pdfs/solutions/latest/innovation-sandbox-on-aws/innovation-sandbox-on-aws.pdf#architecture-overview)
- [AWS solution source code](https://github.com/aws-solutions/innovation-sandbox-on-aws)

The catalog entry now resolves to AWS's current solution page. This template follows the linked implementation guide and its high-level architecture diagram.

## What it is for

Organizations use the solution to let developers, students, or other teams experiment in production-isolated AWS accounts without relying on administrators to provision and manually reclaim every environment. Account leases can be limited by configured duration and spend thresholds, and account cleanup returns an account to the available pool only after validation; accounts that fail validation can be quarantined.

## How it works

1. Administrators, managers, and sandbox users sign in through Amazon Cognito, federated with AWS IAM Identity Center using SAML 2.0. IAM Identity Center can use its built-in user store or an external identity provider.
2. Amazon CloudFront delivers the web interface from an Amazon S3 bucket. The UI obtains temporary credentials from Cognito and signs REST API requests with AWS Signature Version 4.
3. AWS WAF protects the Amazon API Gateway REST API. API Gateway uses IAM authorization and routes requests to AWS Lambda functions, which enforce role-based access using IAM Identity Center group assignments.
4. Lambda reads and writes configuration and operational data in Amazon DynamoDB, including lease preferences, cleanup and email settings, leases, accounts, templates, and principals. It manages existing accounts through AWS Organizations; organizational units and service control policies provide account guardrails.
5. Amazon EventBridge routes domain events. Lease budget or duration threshold events can trigger Amazon Simple Email Service notifications and Lambda lifecycle actions. AWS Step Functions orchestrates longer blueprint deployment and assignment workflows.
6. For account recycling, Lambda invokes an AWS CodeBuild project that runs the third-party AWS Nuke tool. AWS AppConfig supplies its resource filter and the post-cleanup validation exclusions. A validated account returns to the available pool; an account that fails validation is quarantined.
7. Amazon CloudWatch retains compute logs for 90 days, then archives them to Amazon S3 using S3 Standard for one year and S3 Glacier for additional years. Users access assigned accounts through the IAM Identity Center access portal or programmatically.

## Assumptions and boundaries

- The blueprint describes the solution's logical services and flows, not a deployable infrastructure design. It does not specify VPCs, subnet layouts, network controls, or CloudFormation stack boundaries.
- The source calls out lease budget thresholds but does not identify a separate budgeting service, so none is inferred here.
- AWS Nuke is the required third-party cleanup tool explicitly named by AWS. Okta and Microsoft Entra ID are optional identity-provider examples and are not modeled as required dependencies.
- The source does not specify the web UI framework, Lambda runtime, database table schemas, or exact account and OU topology; these are left unspecified.
- The static frontend and archived logs are shown as S3-hosted data stores. Details such as bucket policies, encryption, and log lifecycle configuration remain deployment choices.

## What teams usually customize

- Map the portal, lifecycle backend, cleanup job, and user slots to the systems and user roles in the consuming project.
- Choose an identity provider and adapt federation, user groups, and role-based access to local identity governance.
- Define lease thresholds, account pool and OU structure, service control policies, cleanup exclusions, email preferences, and quarantine procedures.
- Customize the frontend and API, operational data model, logging retention, and S3 archival policies for organizational needs.
- Add the deployment-specific network and security design; this template intentionally does not prescribe infrastructure.
