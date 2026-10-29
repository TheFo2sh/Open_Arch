# Financial Advisor Chat Assistant

A 24/7 conversational assistant that helps financial advisors find answers from financial-planning, product, tax, and Salesforce content.

## Sources

- AWS [Financial Advisor Chat Assistant](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/financial-advisor-chat-assistant/financial-advisor-chat-assistant.html), published January 10, 2022.
- [AWS architecture diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/financial-advisor-chat-assistant/images/financial-advisor-chat-assistant.png) and [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/financial-advisor-chat-assistant/financial-advisor-chat-assistant.pdf).
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## Use case

Financial advisors can ask questions outside normal business hours and retrieve answers from an Amazon Kendra index of organizational documents and Salesforce records.

## Architecture and data flow

1. The advisor's browser resolves the application domain through **Amazon Route 53** to **Amazon CloudFront** and **Amazon S3**. CloudFront serves the static HTML, CSS, and JavaScript application from S3.
2. **Amazon Cognito** authenticates the user and returns temporary credentials to the browser or app. AWS recommends a strong Cognito password policy. The browser uses its temporary credentials to access **Amazon Lex**.
3. **Amazon Lex** uses its built-in **Amazon Kendra** search intent to query Kendra.
4. **Amazon Kendra** indexes source objects from **Amazon S3** through its S3 connector. AWS recommends enabling S3 at-rest encryption.
5. Kendra indexes content from the external **Salesforce** organization through its Salesforce connector. The Salesforce organization must have an OAuth-enabled connected app; the connector uses Salesforce API v48 and its consumer key and secret.
6. **AWS Secrets Manager** stores and rotates the Salesforce keys. An **AWS Identity and Access Management (IAM)** role controls Kendra's access to its data sources.
7. AWS recommends **AWS CloudTrail** to track API usage, **Amazon CloudWatch** to monitor AWS resources, and **AWS Key Management Service (KMS)** to generate and manage encryption keys. It also recommends enabling secure headers in **AWS Amplify**. These are additional security and operations recommendations, not steps in the numbered request flow.
8. **AWS Amplify** manages Route 53, CloudFront, S3, and Cognito as shown by the diagram's boundary.

## Assumptions and unspecified details

- The advisor, browser application, and Salesforce organization are mapping slots. The template does not prescribe a project-specific user, application framework, Salesforce tenant, or deployment.
- The diagram lists the S3 source formats as HTML, Microsoft Word, PowerPoint, PDF, and TXT, and depicts financial planning guides, financial product guides, and local tax authority manuals. It does not specify exact files, Kendra index configuration, synchronization schedule, Salesforce fields, or answer-generation behavior.
- AWS does not specify the chatbot's intents, Lex/Kendra settings, Salesforce connected-app configuration beyond OAuth, credential rotation interval, IAM policy scope, password-policy values, AWS Region, network design, retention, or service sizing. Those are left to implementers.
- AWS recommends S3 encryption at rest and KMS for key management but does not state that this deployment uses a particular KMS key or encryption mode.
- The CloudTrail, CloudWatch, KMS, and Amplify secure-header guidance is presented as additional AWS advice; the source does not detail their configuration or connect them to individual runtime resources.
- S3 objects and the Kendra index are represented with the specification's `database` kind to show their data-hosting relationship. This blueprint is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Define the Lex intents, Kendra index and source synchronization, document scope, and how answers are presented to advisors.
- Configure the Salesforce connected app, API permissions, IAM role, secret rotation, Cognito password policy, and S3 encryption.
- Choose the web application implementation, AWS Region, networking, retention, monitoring, and security settings.
