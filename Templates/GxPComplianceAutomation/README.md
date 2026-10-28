# GxP Compliance Automation

An M1Spec template based on AWS's [GxP Compliance Automation reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/gxp-compliance-automation/gxp-compliance-automation.html), its [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/gxp-compliance-automation/gxp-compliance-automation.pdf#gxp-compliance-automation), and the [Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS published the reference on May 6, 2021.

This is an architecture blueprint, not deployment code or a claim that applying it makes a workload compliant with GxP requirements.

## What it is for

The reference describes a secure AWS environment where administrators publish approved infrastructure products, developers modify application code under source control, and AWS services automate provisioning, qualification evidence, compliance monitoring, and audit-log review.

## How it works

1. AWS Landing Zone automates the setup of a secure, scalable environment. A security administrator defines an approved AWS Service Catalog product from AWS CloudFormation templates and publishes it for developers.
2. Developers manage application changes in AWS CodeCommit and use the Service Catalog product to launch a CloudFormation stack. CloudFormation provisions the resources described by the committed code.
3. Automated testing and installation qualification can use AWS Lambda or Python. The process creates a test summary and qualification report in Amazon S3.
4. AWS CloudTrail logs, Amazon VPC Flow Logs, and AWS Config changes are aggregated into an Amazon S3 bucket in a separate AWS account.
5. AWS Config tracks stack changes and out-of-compliance events. Amazon CloudWatch monitors stack health and changes, while CloudWatch Events alerts administrators about changes that could cause non-compliance. CloudWatch alarms depend on rules the consumer designs.
6. Amazon Athena queries the log data for audits and can convert results to formats such as CSV. Amazon QuickSight visualizes AWS CloudTrail logs.

## What the template represents

- **Zones:** the GxP workload account and a separate central logging account, both on AWS.
- **Users:** security administrator and developer slots.
- **Systems:** GxP application, compliance monitoring and response, and two alternative qualification approaches. Map the applicable slots to systems in the consuming project; the Lambda and Python options are not intended to imply both must be deployed.
- **Platforms:** AWS Landing Zone, Service Catalog, CloudFormation, CodeCommit, Lambda, S3, CloudTrail, VPC Flow Logs, Config, CloudWatch, CloudWatch Events, Athena, and QuickSight.
- **Databases:** qualification reports in the workload account’s S3 bucket and centralized audit/configuration logs in the separate account’s S3 bucket.

The AWS description does not identify a required third-party hosted service. Python is listed as an implementation alternative, not as an external service.

## What AWS does not specify

The reference does not define the GxP application's runtime or provisioned resources; the Python execution environment; the qualification test suite, criteria, or report schema; the Service Catalog product contents; the cross-account log-delivery configuration; the dashboard implementation; alert rules or notification channels; or network, identity, retention, and encryption settings. The blueprint leaves these details open rather than prescribing them.

## What teams usually customize

- Map the GxP application, compliance operations, and user slots to the project's actual systems and roles.
- Select either the Lambda or Python qualification approach and add its concrete implementation and qualification evidence requirements.
- Define the Service Catalog products, CloudFormation resources, and application runtime.
- Specify the cross-account S3 access controls, log retention, encryption, dashboard, alert rules, and notification destinations.
- Add the network, identity, and other deployment details required by the project's own security and validation process.
