# Element Analytics Unify on AWS

A historical M1Spec template based on AWS's [Element Analytics Unify on AWS reference page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/element-analytics-unify-on-aws/element-analytics-unify-on-aws.html) and its [AWS-hosted archived PDF](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/centralized-it-ot-management-element-unify-aws-industrial-ra.pdf). The PDF is titled *Centralized IT/OT Data Management Using Element Unify and AWS Industrial Machine Connectivity* and was reviewed May 20, 2021. The AWS page now explicitly marks the diagram archived. See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

This template represents that dated reference only; it is not a current AWS recommendation, a claim of ongoing product support, or an infrastructure deployment plan.

## Use case

Contextualize industrial operational, engineering, and enterprise data with Element Unify; synchronize asset models with PI Asset Framework and AWS IoT SiteWise; and analyze industrial property data in AWS.

## Architecture and data flow

1. **Industrial ingestion.** Ignition and KepServerEX on industrial PCs ingest PLC and historian telemetry and asset metadata. PI connectors feed telemetry into the PI Server.
2. **Contextualization.** Element Unify ingests edge tag lists and P&ID engineering assets. SAP, EAM, and ERP information reaches Unify through an iPaaS. Unify contextualizes and governs the models; its AF tool manages PI AF models, and Unify synchronizes bidirectionally with PI AF and AWS IoT SiteWise.
3. **AWS telemetry path.** AWS IoT SiteWise processes and stores time-series values, then emits MQTT property updates to AWS IoT Core. IoT rules route updates to Amazon Data Firehose, which transforms and delivers them to an Amazon S3 industrial data lake.
4. **Equipment analytics.** Amazon Lookout for Equipment reads lake data to detect abnormal equipment behavior and writes computed metrics back to the lake.
5. **Dashboards.** Amazon Athena queries the lake and Amazon QuickSight presents dashboards.

## Assumptions and limits

- The architecture and service names describe the archived reference reviewed May 20, 2021; this template does not assert that these products or integrations remain supported or that the design is current.
- The source does not specify hosting locations or deployment topology for Unify, PI, the iPaaS, or the enterprise systems. Their system elements are unplaced slots rather than claims about where they run.
- The reference does not identify Ignition/KepServerEX configurations, PI connector products, iPaaS provider, SAP/EAM/ERP products, or P&ID storage and formats. The catalog leaves provider/version specifics open where not named.
- It does not prescribe protocols beyond MQTT property updates, API or model schemas, synchronization conflict handling, network connectivity, security controls, regions, accounts, availability, sizing, retention, or service configuration. These are implementation decisions, not inferred properties of the reference.
- No PLC actuation or command path is modeled; none is described in the supplied flow.
- Systems in this blueprint are slots to map to the adopting project's systems when the template is applied.

## What consumers usually customize

- Map the industrial source, edge, PI, Unify, iPaaS, and enterprise-system slots to the actual products and boundaries in their environment.
- Specify asset-model ownership, schemas, PI AF/SiteWise synchronization behavior, tag mapping, and iPaaS interfaces.
- Define the data lake layout, retention and access, Firehose transformations, Lookout inputs and metrics, Athena queries, and QuickSight dashboards.
- Add the networking, identity, security, monitoring, availability, and deployment design required for the actual environment.
