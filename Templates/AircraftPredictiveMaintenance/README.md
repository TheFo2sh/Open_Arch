# Aircraft Predictive Maintenance

An M1Spec architecture template based on AWS's [Aircraft Predictive Maintenance reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aircraft-predictive-maintenance/aircraft-predictive-maintenance.html), published in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The page links to the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/aircraft-predictive-maintenance/images/travel-ra-predictive-maintenance.png).

## What it is for

The architecture uses aircraft fault, QAR, maintenance, and flight data to predict component failures before they cause delays or cancellations.

## Architecture and data flow

The blueprint models the AWS services shown in the source diagram. Airline systems are system slots to map to the project's own systems when applying the template; AWS does not specify their implementations.

1. **Collect inputs.** ACARS supplies current fault logs and pilot reports to Kinesis. QAR events and batch files arrive through a QAR processor, with upload frequency depending on aircraft connectivity. Maintenance and engineering systems periodically provide maintenance history, part removals, and repair history. Flight operations supplies scheduled and actual flight information.
2. **Remove identifying information.** AWS requires identifying information to be removed from QAR data before use. The diagram shows event processing with Lambda and batch processing with Glue; it does not prescribe the de-identification method.
3. **Stage and process data.** Kinesis Data Firehose and S3 provide the depicted staging flow. AWS Glue transforms the staged data into aircraft data, with DynamoDB also shown for aircraft data used by the application.
4. **Analyze turn data.** The diagram includes Glue Data Catalog, EMR, Redshift, Athena, and QuickSight for data processing and turn analytics.
5. **Train and tune the model.** SageMaker correlates the inputs with delays and cancellations, identifies useful component features, and predicts failures. Tune models periodically to improve predictions and reduce false positives; the diagram also shows S3 prediction data.
6. **Serve the application.** The predictive maintenance app and dashboard call API Gateway, which routes requests to Lambda functions backed by DynamoDB.

## Assumptions and limits

- The diagram labels an external SITA/ARINC ACARS source. The template retains that as an external system slot; AWS does not specify its integration interface or implementation.
- ACARS, the QAR processor, maintenance and engineering systems, and flight operations are external systems, not defined third-party products. Their APIs, protocols, payloads, and schemas are unspecified.
- AWS does not specify how identifying information is detected or removed, the data retention policy, model implementation, training cadence, application runtime, authentication, or the network and security configuration.
- The source diagram does not provide deployable infrastructure settings. This template describes the architecture and is not an AWS deployment.

## What consumers usually customize

Map the external source-system slots and the predictive maintenance app and dashboard to the project's systems. Define the ACARS and QAR integrations, data formats and retention, the QAR de-identification policy, model evaluation and tuning cadence, and API behavior, authentication, and security controls. Confirm which data stores and analytics services are needed for the project's use case.
