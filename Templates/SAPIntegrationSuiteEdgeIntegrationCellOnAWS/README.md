# SAP Integration Suite Edge Integration Cell on AWS

An Open_Arch adaptation of SAP Architecture Center reference [cd0961](https://architecture.learning.sap.com/docs/ref-arch/cd0961). It combines SAP BTP integration design, operations, and lifecycle services with SAP Edge Integration Cell running in a customer AWS landscape.

## Architecture and data flow

- **SAP BTP:** The subaccount contains SAP Integration Suite for Cloud Integration, API Management, and monitoring. Edge Lifecycle Management registers the EKS cluster as an edge node, bootstraps it, and manages the runtime solution lifecycle. Integration developers design and operate integrations in the cloud while selected flows and APIs execute on the customer runtime.
- **Private runtime:** A VPC spans three availability zones with public and private subnets. EKS worker nodes and Edge Integration Cell runtime replicas run in the private subnets. The EKS control plane is managed by AWS.
- **Ingress and egress:** Route 53 maps a custom runtime hostname to a public Network Load Balancer. The NLB distributes inbound requests to EKS runtime services. Private workers use a NAT gateway in each AZ and an internet gateway for outbound connectivity to SAP services and other required destinations. DNS relationships describe name resolution, not application traffic passing through Route 53.
- **Persistence:** Multi-AZ RDS for PostgreSQL holds runtime relational data. ElastiCache for Redis supplies the external cache/state dependency; the linked SAP deployment guide also identifies it as a store for asynchronous messaging. EBS provides ReadWriteOnce (RWO) application volumes; EFS provides ReadWriteMany (RWX) shared files.
- **SAP application context:** The source diagram also includes SAP Connectivity Service, SAP Destination Service, Cloud Connector, private SAP S/4HANA and SAP ECC systems, and SAP cloud applications. The model preserves these contextual connections without asserting that every edge-runtime message must travel through SAP BTP.

The model has overview, runtime/persistence, and SAP services views. The lifecycle and design/monitoring relationships express logical responsibilities; they do not prescribe which side initiates each network connection. The NAT and internet-gateway relationships show the separate outbound routing path.

## Applying and customizing the template

Map **Integration design and operations**, **Edge integration runtime**, **Integration API consumer**, **SAP Cloud Connector**, **SAP S/4HANA system**, and **SAP ECC system** to the corresponding systems in the project. Map **SAP cloud applications** to the applications in scope. The SAP-specific system slots describe existing product installations or the project solution built with them.

The runtime is one logical system spanning three AZs, rather than three independent system slots. Likewise, the NAT element represents the three per-AZ gateways. VPC subnet membership and AZ placement are described on the infrastructure elements because the repository schema supports only top-level logical zones. Storage resources use the schema's `database` kind for relational data, cache state, volumes, and files, with their distinct semantics in their descriptions.

Teams must select their region, address ranges, node capacity, runtime version, replicas and placement constraints, PostgreSQL/Redis sizing and failover configuration, storage classes and capacity, endpoints, DNS records, and certificates. Configure IRSA with least-privilege pod permissions, security groups, network ACLs, and controlled outbound access as described by SAP. Select the actual integration flows, adapters, business payloads, destinations, identity providers, and monitoring policies for the project.

SAP prerequisites include a BTP subaccount and appropriate Integration Suite entitlements, activation of Edge Integration Cell, ELM roles, technical P-User and S-User accounts, repository shipment-channel access, and SSO. Register and bootstrap the edge node before deploying the EIC solution. The linked setup guide describes these steps and external database/Redis TLS configuration; credentials and tenant-specific configuration are not part of this blueprint.

This is a conceptual architecture template. It supplies no Terraform, Kubernetes manifests, SAP installation scripts, or deployable workload. SAP describes the reference as a small-production starting point; sizing and availability depend on the actual solution. A bastion is mentioned as a possible public-subnet component in the source text but is not required by the diagram and is omitted here.

## Sources and adaptation notes

- [SAP reference cd0961](https://architecture.learning.sap.com/docs/ref-arch/cd0961), page last updated October 28, 2026.
- [Source text at commit 0bb8914](https://github.com/SAP/architecture-center/blob/0bb8914e9390b7eb2acce1c791c694abf60336f4/docs/ref-arch/RA0008/1-edge-integration-cell-on-aws/readme.md) and [original draw.io diagram](https://github.com/SAP/architecture-center/blob/0bb8914e9390b7eb2acce1c791c694abf60336f4/docs/ref-arch/RA0008/1-edge-integration-cell-on-aws/drawio/sap-edge-integration-cell-aws.drawio). The diagram itself is dated February 18, 2025.
- [SAP's linked AWS deployment guide](https://github.com/SAP-archive/btp-edge-integration-cell-aws/tree/bcbfeabec27521190f44e1391a43d6a55f787b5e), now archived, clarifies NLB ingress, DNS mapping, and external PostgreSQL/Redis TLS connections. Its historical component versions are not pinned by this template; consult current SAP support and sizing guidance, including [SAP Note 3247839](https://me.sap.com/notes/3247839).

Open_Arch re-expresses the source architecture in M1Spec/LikeC4, consolidates repeated AZ resources, separates inbound NLB routing from outbound NAT routing, and adds the lifecycle service described in the source text. It does not reproduce the original diagram artwork. The application and integration contracts remain project choices.

## Attribution and license

SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and architecture-center contributors

SPDX-License-Identifier: Apache-2.0

Adapted and modified for Open_Arch from SAP Architecture Center. The upstream architecture material is licensed under the Apache License, Version 2.0; a copy is included in [LICENSE](LICENSE). SAP product names identify the services in the reference architecture.
