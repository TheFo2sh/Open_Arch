# Totogi Charging-as-a-Service for On-Premises 4G/5G

An M1Spec architecture template based on AWS's [Totogi Charging-as-a-Service for On-Premises 4G/5G reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/totogi-charging-as-a-service/totogi-charging-as-a-service.html), published November 16, 2022.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/totogi-charging-as-a-service/totogi-charging-as-a-service.html)
- [AWS diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/totogi-charging-as-a-service/images/totogi-charging-as-a-service.png)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/totogi-charging-as-a-service/totogi-charging-as-a-service.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The architecture connects an on-premises 4G/5G network to Totogi's AWS-hosted, multi-tenant charging engine and plan-design tool. It illustrates subscriber registration, real-time charging, and delivery of quotas for a user session. Totogi is the required third-party product in this AWS reference.

## How it works

1. Subscriber devices connect through 4G/5G radio sites (RAN) to the telco data center.
2. The core network registers subscribers over N2 for 5G or S1 for 4G.
3. Charging is validated over N40 (5G REST) or Gy (4G Diameter).
4. The telco data center connects to AWS through Direct Connect and Transit Gateway to the VPC hosting the tenant charging engine.
5. An EC2 Auto Scaling access tier runs a Diameter adapter that transforms requests and responses between 5G REST and 4G Diameter.
6. A Network Load Balancer directs 5G REST requests to the charging decision engines. The tenant ID is obtained from an Amazon Cognito access token.
7. The decision engine handles rating requests and looks up balances and rating rules in DynamoDB, partitioned by tenant ID and subscriber ID.
8. EventBridge and S3 buckets are identified for customizable handling of notifications and event detail records (EDRs).
9. The charging engine delivers quotas for the validated subscriber's session; subscribers can then use data and voice services according to their plan and available credit.

## What applying it brings

| | |
|---|---|
| Zones | **Telco data center** on the `other` platform, and **AWS** |
| Platforms | Direct Connect, Transit Gateway, VPC, EC2 Auto Scaling access and charging tiers, Network Load Balancer, Cognito, DynamoDB, EventBridge, S3, VPC endpoint, and AWS Organizations |
| Slots | **4G/5G Radio Access Network (RAN)**, **4G/5G core network**, **Totogi charging access layer**, **Totogi Charging-as-a-Service**, and **4G/5G subscriber** |
| Containers and components | Telco control, user, and subscriber-data planes; telco network connectivity; Diameter adapter; and charging decision engine |
| Databases | Subscriber balances and rating rules on DynamoDB; notification and EDR buckets on S3 |

## Assumptions and source boundaries

- This is a logical architecture template, not an AWS deployment or network configuration.
- The diagram depicts the access and charging Auto Scaling tiers across three Availability Zones. Instance counts, sizes, scaling policies, and failover behavior are not specified.
- The telco functions shown are AMF, SMF, MME, SGW-C, PGW-C, UPF, PGW-U, SGW-U, UDM, and HSS. AWS does not name their vendors, implementations, or exact internal connections.
- AWS identifies Cognito tokens as the source of the tenant ID but does not specify token issuance, claims, or validation details.
- EventBridge and S3 are described as customizable notification and EDR handling. The event routes, schemas, retention, and bucket layout are not specified; the blueprint does not claim a particular implementation for them.
- A VPC endpoint and AWS Organizations are visible in the diagram, but AWS does not describe their role in the charging flow. They are included without inferred connections.
- The diagram also shows local and customer gateways; their vendors, configuration, and exact routing are unspecified.

## What teams usually customize

- Map the RAN, telco core, and subscriber slots to the project's actual systems and users; replace the generic telco functions with the deployed 4G/5G core.
- Choose the network topology, Direct Connect and Transit Gateway routing, VPC endpoint service, and AWS account structure.
- Set the Auto Scaling, Availability Zone, and load-balancing configuration for the required service levels.
- Define identity and tenant provisioning, DynamoDB schema and partitioning, rating rules, and quota behavior.
- Configure EventBridge rules, notification processing, EDR schema, and S3 bucket policy, lifecycle, and retention.
