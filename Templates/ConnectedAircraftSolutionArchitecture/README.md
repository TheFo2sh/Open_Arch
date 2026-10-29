# Connected Aircraft Solution Architecture

An M1Spec architecture template based on AWS's [Connected Aircraft Solution Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-aircraft-solution-architecture/connected-aircraft-solution-architecture.html), published in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The source page links to the [architecture diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/connected-aircraft-solution-architecture/images/connected-aircraft-solution-architecture.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/connected-aircraft-solution-architecture/connected-aircraft-solution-architecture.pdf).

## What it is for

The architecture supports fleet-wide flight-data collection and analytics, including fuel-burn optimization, fault analysis, engine-health monitoring, and predictive maintenance. It also describes using flight data to build connected-ecosystem applications and offering anonymized data to third-party developers by subscription.

## How it works

1. **Collect at the edge.** AWS IoT Greengrass runs on the aircraft flight-data acquisition unit and collects avionics and telemetry data.
2. **Send and offload data.** Near-real-time events are anonymized and sent to Flight Operations on the ground. Flight data is offloaded to Amazon S3 when an aircraft is at the gate, where the Flight Operations team analyzes it.
3. **Analyze engine data.** Amazon Managed Service for Apache Flink processes and analyzes engine flight data for engine-health maintenance. Flight Operations is notified of anomalies.
4. **Build the data lake and models.** Amazon Athena aggregates anonymized flight and fault data into an Amazon S3 data lake. Models trained from the aggregated data are deployed to AWS IoT Greengrass on aircraft for inference supporting predictive maintenance. Amazon SageMaker AI is named in the source introduction; the source does not detail its exact role in model training.
5. **Support applications and subscriptions.** App developers use Amazon API Gateway, AWS Lambda, and Athena to build connected-ecosystem solutions. AWS Data Exchange offers anonymized data to third-party developers on a subscription basis.
6. **Run fleet analytics.** The Engine Health Management team queries processed flight data using Amazon Quick and Athena.

## What applying it brings

| | |
|---|---|
| Zones | **Aircraft** (platform `other`) and **AWS** |
| Platforms | AWS IoT Greengrass, Amazon S3, Amazon Managed Service for Apache Flink, Amazon SageMaker AI, Amazon Athena, Amazon API Gateway, AWS Lambda, AWS Data Exchange, Amazon Quick |
| User slots | Flight Operations Team, Engine Health Management Team, app developers, third-party developers |
| System slots | Onboard flight-data collection, engine flight-data processing, connected ecosystem applications, Flight Operations analysis, fleet-wide analytics, third-party data subscription |
| Database | Flight data lake on Amazon S3 |

## Assumptions and details not specified by AWS

- The source names no specific non-AWS vendor, aircraft manufacturer integration, or third-party software/service. Third-party developers are consumers of anonymized data through AWS Data Exchange, not a named external service.
- The source does not specify aircraft connectivity or transport protocols, data schemas, the anonymization method, security controls, ingestion services beyond Greengrass, processing thresholds, the anomaly notification channel, model-training details, API behavior or authentication, or the packaging and delivery of Data Exchange products.
- SageMaker AI appears in the source introduction, but the numbered flow does not explicitly assign model training to SageMaker. The blueprint shows the data lake and SageMaker in the model-training flow as an architectural interpretation, not a detail guaranteed by the source.
- “Amazon Quick” is the name used by the source and is retained here.
- This is a conceptual architecture template, not deployable AWS infrastructure. The source does not prescribe account layout, networking, availability, or a particular implementation for the named systems.

## What teams usually customize

- **Aircraft integration.** Map the onboard collection slot to the project's system and specify its connectivity, data formats, and security controls.
- **Data governance.** Define the anonymization policy, retention, access controls, data schemas, and lake organization.
- **Processing and operations.** Choose the ingestion and streaming details, processing thresholds, and anomaly notification channel; none are prescribed by the source.
- **Machine learning.** Clarify where models are trained, how they are evaluated and deployed, and how aircraft inference is managed.
- **Applications and sharing.** Specify the API contract, authentication, and Data Exchange subscription and delivery model, including any external systems the project actually uses.
