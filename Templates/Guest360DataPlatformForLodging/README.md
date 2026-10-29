# Guest 360 Data Platform for Lodging

A vendor-neutral guest data architecture for lodging organizations, based on AWS's [Guest 360 Data Platform for Lodging](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/guest-360-data-platform-lodging/guest-360-data-platform-lodging.html).

Sources: [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/), [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/guest-360-data-platform-lodging/images/guest-360-data-platform-lodging.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/guest-360-data-platform-lodging/guest-360-data-platform-lodging.pdf).

## What it is for

The architecture creates a unified view of lodging guests from loyalty and reward membership, registration and stay attributes, operational records, and digital interactions. It uses curated guest data and analytics to support personalized experiences and campaigns across the guest journey.

## How it works

1. Client-side CDP components collect web and mobile activity through tag management and first-party cookies. Third-party cookies and mobile IDs are optional enrichment inputs.
2. MDM tools merge loyalty or rewards membership with attributes collected at registration and during stays into unified guest profiles.
3. Server-side CDP components recognize anonymous activity and combine it with loyalty data and unified guest records.
4. An Amazon S3-based curated data lake brings together loyalty, reservations, stays, purchases, marketing, and digital interaction data.
5. AWS analytics enrich guest profiles and support outbound, inbound web and mobile, and acquisition campaigns.
6. Guest 360 microservices and business events personalize offers and experiences.
7. Optional CDP partner sharing exchanges anonymous guest and prospect attributes.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Amazon S3 |
| Slots | **Lodging guest**, **Guest web and mobile channels**, **Lodging systems of record**, **Tag management solution**, **Customer data platform**, **Master data management tool**, **Optional identifier sources**, **Campaign and acquisition channels**, and **Optional CDP partner** |
| AWS system | **Guest 360 data platform**, with guest analytics/profile-enrichment and guest microservices/business-event containers |
| Database | **Curated guest data lake** on Amazon S3 |

## Assumptions and unspecified details

- AWS does not identify an MDM, CDP, or tag-management vendor. These are generic product slots, not recommendations.
- The source notes describe AWS analytics capabilities but do not select analytics services. The blueprint therefore keeps analytics and profile enrichment as a generic platform system capability and does not add a specific AWS analytics product.
- The source does not detail the data model, identity matching rules, consent handling, cookie/mobile-ID providers, ingestion protocols, campaign providers, API contracts, event schemas, deployment topology, or security and retention configuration.
- Third-party cookies/mobile IDs and CDP partner exchange are optional. The partner and exchange mechanism are not specified.
- The S3 database element represents the curated data lake as an architectural data store; it does not prescribe bucket layout or storage format.

## What teams usually customize

- Select and integrate the MDM, CDP, and tag-management products, and define the guest identity and consent model.
- Map the lodging systems-of-record slot to actual loyalty, reservation, property-management, stay, and point-of-sale systems.
- Choose AWS analytics and microservice implementations and define the data, event, and API contracts.
- Specify campaign and acquisition channels and decide whether optional identifier enrichment or partner sharing is appropriate.
- Add project-specific security, governance, retention, network, deployment, and operational requirements.

This is an architecture template, not an AWS infrastructure deployment.
