# PTC Windchill Product Lifecycle Management on AWS

A highly available, load-balanced PTC Windchill deployment on AWS, based on the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ptc-windchill-plm/ptc-windchill-plm.html), its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/ptc-windchill-plm/images/ptc-windchill-plm-on-aws.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ptc-windchill-plm/ptc-windchill-plm.pdf#ptc-windchill-plm). The template models the source architecture; it does not deploy AWS infrastructure.

## What it is for

Use this as a starting point for a Windchill PLM system that needs highly available web and method-server tiers, background processing, CAD and Office document rendering, keyword search, replicated metadata storage, and shared content storage.

## How it works

The AWS numbered flow describes:

1. Users access Windchill using a web browser, Office applications, CAD tools, or mobile devices.
2. Elastic Load Balancing routes user traffic to available Windchill web servers.
3. Elastic Load Balancing routes client transactions and interactions with other systems to foreground Method Servers.
4. A Background Server on EC2 dynamically generates content for end users or backend systems.
5. CAD/Doc Workers render CAD and Office content as PDFs and store the results in Amazon S3.
6. A Solr Index Server on EC2 supports keyword search, including searches across metadata stored in the database.
7. PTC Solution Monitor provides real-time monitoring for the system, application, and database.
8. Amazon RDS stores application metadata and synchronously replicates across Availability Zones.
9. Amazon S3 stores Windchill application content.
10. Replication Servers copy content among Windchill deployments through VPC peering. The diagram also shows an on-premises Replication Server and a possible Windchill deployment in another Region.
11. AWS Directory Service integrates corporate LDAP for Windchill authentication and account management.

## Assumptions and boundaries

- The diagram shows public, private, and database subnets across two Availability Zones. The template represents the logical services and server roles, not subnet resources, security groups, routing, or a deployment plan.
- Amazon RDS's database engine, version, sizing, and configuration are not specified. The database is modeled generically as a primary and a synchronously replicated replica.
- The source does not specify Windchill, Solr, PTC Solution Monitor, or operating-system versions; EC2 instance types; autoscaling policy; or exact node counts.
- Amazon S3 is modeled as one logical content store. The source does not specify buckets, object organization, retention, or access controls.
- The diagram shows VPN connectivity from on premises, while the numbered flow describes VPC peering for replication. VPN endpoints, routing, and the relationship between on-premises and AWS replication paths are not detailed.
- The separate-Region Windchill workload is optional; the source does not detail its topology or database arrangement.
- The corporate LDAP product and vendor are not named. Directory Service configuration and the authentication protocol are also unspecified.

## What teams usually customize

- Choose the Windchill release, EC2 instance types, node counts, and scaling and availability settings.
- Specify the RDS engine, capacity, backup and recovery settings, and replica behavior.
- Define S3 buckets, content organization, access controls, retention, and lifecycle policies.
- Set up the Solr index, worker rendering capacity, and Background Server workloads.
- Configure monitoring coverage, corporate directory integration, VPN and VPC peering, and any separate-Region replication.
- Map the Windchill and user slots to the project's own systems and users.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ptc-windchill-plm/ptc-windchill-plm.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/ptc-windchill-plm/images/ptc-windchill-plm-on-aws.png)
- [AWS architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ptc-windchill-plm/ptc-windchill-plm.pdf#ptc-windchill-plm)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
