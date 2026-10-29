# Cloud-native Contact Center for Multilingual IT Service Desk

An omnichannel Amazon Connect IT service desk with conversational self-service, multilingual call analysis, and contact analytics.

**AWS sources:** [Reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cloud-native-contact-center-multilingual/cloud-native-contact-center-multilingual.html), [diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/cloud-native-contact-center-multilingual/images/cloud-native-contact-center-multilingual.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/cloud-native-contact-center-multilingual/cloud-native-contact-center-multilingual.pdf#cloud-native-contact-center-multilingual), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source was published January 6, 2021.

## What it is for

An IT service desk that receives employee contacts through voice, web chat, or mobile chat and routes them to self-service or service desk agents. Amazon Connect supplies omnichannel contact handling and skills-based routing; supporting AWS services integrate ticketing, automate conversational support, analyze recordings, and report on contact activity.

## How it works

The sequence follows the AWS page's numbered flow and the diagram:

1. **Users and agents connect through different channels.** End users use voice (PSTN or softphone), web chat, or a smartphone. Service desk agents use the browser-based Contact Control Panel (CCP).
2. **Amazon Connect handles contacts.** It provides inbound and outbound voice, web chat, mobile chat, and skills-based routing. Configure phone numbers, support queues, contact flows, and routing profiles.
3. **Connect integrates with customer systems.** CRM or ITSM ticketing integrations can use AWS Partner connectors or custom AWS Lambda integrations. The source illustrates ServiceNow and also names Salesforce and Zendesk as CRM examples; these are optional third-party products, not required AWS services.
4. **Amazon Lex automates conversational contacts.** The diagram shows Lambda functions, DynamoDB, and SMS events in the bot channel. AWS does not specify the bot data schema, SMS product, or exact function logic.
5. **Connect recordings support speech and text analysis.** Amazon Connect stores call recordings in Amazon S3. Use Amazon Transcribe and Amazon Translate for speech-to-text conversion and translation, and Amazon Comprehend to analyze topics and sentiment.
6. **Amazon Macie and Athena support data protection and analysis.** Macie protects sensitive data in call recordings; Athena analyzes relationships in converted text.
7. **Contact activity supports analytics and reporting.** Amazon Connect provides real-time metrics and contact trace records (CTRs). Amazon Kinesis Data Streams and Lambda process CTRs, with Amazon Kinesis Data Firehose, Amazon S3, and Amazon Redshift shown in the diagram; Amazon QuickSight displays dashboards.

## Architecture and data flow

The blueprint has an AWS zone and a customer-workloads zone. Amazon Connect is the service desk entry point; Lambda holds slots for customer-defined integration, chatbot, and CTR-processing functions. Lex and DynamoDB represent the bot channel. S3 databases represent call recordings and the additional text and analytics stores shown in the AWS diagram. Transcribe, Translate, Comprehend, Macie, Athena, Kinesis Data Streams, Firehose, Redshift, and QuickSight model the documented analysis and reporting flow.

Customer CRM, ITSM, and BI systems are generic system slots. The catalog also lists ServiceNow, Salesforce, and Zendesk as third-party examples, but the blueprint does not require any one provider. AWS Direct Connect, Site-to-Site VPN, and an Internet Gateway appear in the source diagram; they are included as AWS platforms without inferring VPC layout, routes, or connectivity targets.

## Assumptions and details AWS does not specify

- The diagram and text do not define VPCs, subnets, network routes, gateway configuration, or the precise role of the Direct Connect and VPN paths.
- The AWS page identifies the integration options but does not specify connector products, API contracts, CRM/ITSM data mappings, or whether the consumer uses a partner connector or Lambda.
- The source diagram labels an “Amazon SMS Events” node but does not identify the SMS product, event trigger, or message flow implementation.
- DynamoDB is shown with the chatbot, but its schema and exact role are not described.
- The source does not define recording retention, encryption or access policies, transcript storage format, translation language pairs, analytics schemas, CTR processing rules, dashboards, or service availability requirements. The additional S3 stores are represented as shown; their contents are not inferred beyond the documented text and analytics flows.
- PSTN, browsers, and smartphone clients are channels or endpoints, not separately modeled product choices. This template describes an architecture blueprint; it does not deploy AWS infrastructure.

## What teams usually customize

- Contact flows, phone numbers, queues, routing profiles, supported locales, and how contacts escalate to agents.
- CRM/ITSM providers, partner connectors, Lambda integration behavior, and ticket/customer data mappings.
- Lex intents, bot responses, SMS handling, DynamoDB data, and agent handoff rules.
- Recording access and retention, supported transcription/translation languages, sensitive-data controls, analytics datasets, and QuickSight dashboards.
- Network topology and connectivity after selecting the target AWS environment.
