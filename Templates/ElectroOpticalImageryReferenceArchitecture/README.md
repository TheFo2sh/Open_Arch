# Electro-Optical Imagery Reference Architecture

An AWS architecture for processing satellite electro-optical imagery, based on the [AWS Electro-Optical Imagery Reference Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/electro-optical-imagery/electro-optical-imagery.html) and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The flow below follows the verified notes for AWS's numbered architecture; the source does not identify a third-party provider or implementation for its abstract provenance log.

## What it is for

The workflow converts satellite signals and imagery into quality-checked, preprocessed, postprocessed imagery and analytics for customer dissemination. It also describes an optional variant with immutable cryptographic provenance and transfers to appropriate Regions for classified processing.

## How it works

1. A generic satellite imagery source supplies signals or imagery. The provider, sensor, and transfer method are not identified.
2. Signal preparation demodulates and decodes the input, removes forward error correction, and decommutates and decrypts signal frames into raw sensor data.
3. Quality assurance checks whether the raw sensor data is suitable for processing.
4. Parallel AWS Batch jobs, using the documented Fargate and Lambda compute options, perform sensor correction, orthorectification, georeferencing, and thumbnail generation. The source does not map particular processing stages to a runtime.
5. Amazon S3 stores collection location, Region, date, and time metadata together with preprocessed imagery in appropriate storage tiers.
6. Postprocessing extracts features, names and tags them, and organizes results as time series. Final imagery and analytics are stored for dissemination to customers.
7. In the optional second variant, an abstract transaction-log role records immutable cryptographic provenance. Imagery may also be transferred to appropriate Regions for classified processing.

## What applying it brings

| | |
|---|---|
| Zone | AWS processing Region; an optional Region for classified processing |
| Platforms | AWS Batch, AWS Fargate, AWS Lambda, and Amazon S3 |
| Slots | **Satellite imagery source**, a generic external system; **Electro-optical imagery processing**, the processing workflow; **Classified processing destination**, optional; **Imagery customer**, a user |
| Containers | Signal preparation, imagery quality assurance, parallel imagery preprocessing, imagery postprocessing, and imagery dissemination |
| Data stores | Collection metadata, preprocessed imagery, and final imagery and analytics on Amazon S3 |
| Optional provenance | Abstract cryptographic provenance log; no implementation is specified |

## Assumptions and boundaries

- The architecture is a template, not deployable AWS infrastructure. It does not create AWS resources or specify an implementation.
- AWS does not name an upstream imagery provider, sensor, protocol, or customer-facing delivery service. The generic source and customer are slots to map to project systems and users; no vendor is implied.
- The source names AWS Batch, Fargate, and Lambda but does not state which processing stages run on each compute option. The blueprint therefore shows the documented services without assigning specific stages to a runtime.
- AWS does not specify S3 storage classes, bucket layout, retention, metadata schema, feature schema, naming/tagging rules, or the time-series representation. S3 data stores in the blueprint represent logical datasets, not prescribed buckets or database engines.
- The provenance variant names an immutable cryptographic log but not its product or storage implementation. The blueprint represents it as an abstract system role, not a particular ledger or AWS service.
- The classified-processing variant does not name the target Regions, transfer mechanism, processing services, security boundary, or required approvals. Its destination is a role only; this template makes no claim of classification approval or security authorization.
- The repository has no imagery-dataset element kind, so S3 datasets are represented as `database` elements hosted by the S3 platform.

## What teams usually customize

- Map the generic satellite imagery source and customer slots to the project's actual systems and users.
- Choose storage classes, dataset and bucket organization, metadata formats, retention, and transfer mechanisms.
- Specify the runtime assignment and job configuration for each processing stage.
- Define feature extraction, naming, tagging, and time-series conventions.
- Decide whether to use the provenance and classified-processing variants, then select and review their implementations, regional requirements, and security controls.
