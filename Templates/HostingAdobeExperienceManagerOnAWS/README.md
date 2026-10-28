# Hosting Adobe Experience Manager on AWS

An AWS reference architecture for hosting Adobe Experience Manager (AEM), following [AWS's architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/hosting-adobe-experience-manager/hosting-adobe-experience-manager.html) and its [linked PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/hosting-adobe-experience-manager/hosting-adobe-experience-manager.pdf). The source is also listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

This template models an AEM website with separate author and publish installations on EC2 across two Availability Zones. Adobe Experience Manager is required third-party software; AWS's design does not specify an AEM version or licensing arrangement.

## How it works

1. **Amazon Route 53** provides DNS configuration. **AWS WAF** protects AEM from common web exploits, and **Amazon CloudFront** accelerates static and dynamic content delivery.
2. **AWS Certificate Manager** provisions certificates for AEM. The source does not specify certificate attachment points.
3. An internet-facing **Application Load Balancer** distributes requests across the AEM publish dispatcher instances. The Apache httpd-based **AEM Dispatcher** provides caching, load balancing, and application security, and maps one-to-one to a publish instance in each Availability Zone.
4. The **AEM publish** installation serves published content and uses **TarMK** as its node store. The **AEM author** installation supports content authoring and website administration; AWS prefers TarMK on **Amazon EBS** for author.
5. **Amazon S3** is the preferred shared binary-content datastore for both author and publish. Approved content is replicated from author to publish.
6. An **AEM author cold standby** provides high availability. **AWS Lambda** supplies scale-up/down logic, pairs and unpairs dispatcher-publish instances, updates replication agents, and automates author failover.
7. An optional authoring path has an **Application Load Balancer** and **AEM Dispatcher** instances with caching disabled to improve authoring performance.

## Assumptions and details not specified

- The source diagram spans two Availability Zones. The blueprint captures that as a description rather than separate M1Spec zones; M1Spec zones represent logical architecture zones.
- The source shows VPC, public/private subnets, internet and NAT gateways, bastions, and a corporate network/VPN connection. These are deployment/networking details, not architecture elements in this template's custom C4 vocabulary, so they are not modeled as technologies or relationships.
- AWS recommends I/O-optimized EBS volumes for the dispatcher instances but does not specify volume sizes or settings. The blueprint does not infer these or the publish node store's persistence media.
- AWS mentions MongoDB as an alternative author node store for scalability. It is cataloged as optional, but the source does not define its deployment, topology, or configuration.
- The source does not specify AEM/EC2 sizing, operating system, scaling thresholds, detailed failover/replication configuration, network policies, or certificate attachment points. These need design decisions; this template does not invent them.
- This is an architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the **AEM website**, **Site visitors**, and **Content authors, editors, and approvers** slots to the project's existing systems and users.
- Choose whether to include the optional author dispatcher path and whether to use the preferred S3 shared binary datastore and TarMK author node store.
- Specify AEM version and licensing, EC2 sizing, network boundaries, security controls, scaling policies, replication/failover behavior, and certificate endpoints for the actual environment.
