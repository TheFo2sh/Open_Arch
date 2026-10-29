# IFS Maintenix Software Implementation on AWS

A highly available [IFS Maintenix Aviation Maintenance Management Software](https://www.ifs.com/en/products/aviation-maintenance) deployment on AWS, following [AWS's IFS Maintenix Software Implementation reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/maintenix-implementation/maintenix-implementation.html). This template models the architecture; it does not deploy AWS resources.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/maintenix-implementation/maintenix-implementation.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/maintenix-implementation/images/maintenix-migration-airlines-ra.png)
- [AWS architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/maintenix-implementation/maintenix-implementation.pdf#maintenix-implementation)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The architecture supports an airline's aviation maintenance management workload with three separate Maintenix tiers across two Availability Zones, resilient access for corporate and internet users, hybrid connectivity from on-premises, and analytics replication from its Oracle database.

## How it works

1. **Hybrid connectivity.** On-premises routers connect to the AWS VPC over highly available AWS Direct Connect and AWS Site-to-Site VPN paths integrated through AWS Transit Gateway.
2. **Application tier.** IFS Maintenix runs on Amazon EC2 instances in an Auto Scaling group across two Availability Zones. Corporate users reach it through Transit Gateway and a private Application Load Balancer. Internet users resolve the public endpoint with Amazon Route 53 and reach the tier through a public Application Load Balancer protected by AWS WAF.
3. **Oracle database.** The application tier uses Oracle on Amazon RDS. Multi-AZ configuration provides a primary database and a failover standby.
4. **Analytics replication.** AWS Database Migration Service captures database changes with Change Data Capture and replicates them to a data warehouse for analytical processing.
5. **Internal tiers.** Separate Maintenix integration and reporting tiers run on EC2 Auto Scaling groups across two Availability Zones. Each accepts internal traffic only through its own private Application Load Balancer, accessible from the application tier and on-premises.

## Assumptions and details not specified

- AWS does not identify the data warehouse product, its hosting location, or its owner. It remains an external system slot, not a named AWS service or database engine.
- The reference does not specify AWS Region, VPC/subnet layout, exact Availability Zone count beyond the two shown, instance types or scaling policies, load-balancer listeners, ports, protocols, or health checks.
- Oracle version, licensing, database sizing, backup policy, and the details of the Multi-AZ configuration are not given.
- The source identifies the Maintenix application, integration, and reporting tiers but does not detail their individual modules, internal APIs, authentication, or the database connectivity configuration.
- DMS endpoint configuration, replication instance sizing, CDC retention, transformation rules, and warehouse ingestion details are unspecified.
- Network routing, VPN tunnel count/configuration, Direct Connect topology, identity controls, and security-group or WAF rules are left for the adopting team to define.
- The architecture does not specify third-party products for the warehouse or other on-premises systems.

## What teams usually customize

- Map the corporate users, internet users, on-premises systems, and warehouse slots to the project's actual domains and services.
- Select the required AWS Region, VPC and subnet layout, compute sizing, scaling policies, and load-balancer configuration.
- Configure Oracle version/licensing and Multi-AZ operational settings, and define the DMS source/target endpoints and warehouse ingestion.
- Set corporate and internet access controls, routing, authentication, monitoring, and security policies to match the deployment.
