# Web Application Architecture on AWS

A highly available web application on AWS, following the [AWS Web Application Architecture on AWS reference](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/web-application-architecture/web-application-architecture.html), its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/web-application-architecture/images/web-application-architecture.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/web-application-architecture/web-application-architecture.pdf). The design uses multiple Availability Zones, load-balanced web and application tiers, and managed data services. See the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

This is a starting point for a classic web application that serves static and dynamic content, keeps its web and application server tiers resilient across Availability Zones, and uses managed AWS services for security, database, cache, and shared-file needs. It describes an architecture pattern; it does not deploy infrastructure.

## How it works

1. **DNS and edge delivery.** A web client resolves the application endpoint through Amazon Route 53. Amazon CloudFront accelerates static content delivery. Route 53 is represented as DNS resolution; HTTP path-based routing is not a DNS function and no path rules are specified by the source.
2. **Static content and protection.** Amazon S3 stores static content and backups. AWS WAF protects web access from common exploits, and AWS Certificate Manager (ACM) manages SSL/TLS certificates.
3. **Web tier.** An internet-facing Application Load Balancer distributes requests to web server EC2 instances in private subnets across multiple Availability Zones. NAT gateways in the public subnets enable private EC2 instances to access the internet.
4. **Application tier.** The web tier sends application requests through an internal Application Load Balancer to application server EC2 instances in private subnets across multiple Availability Zones.
5. **Data and shared files.** Amazon RDS provides the relational database tier; the diagram depicts primary and standby databases across Availability Zones, but does not identify a database engine. Amazon ElastiCache is an optional cache for read-heavy database access. Amazon EFS is optional shared storage when servers need to access common files.

## Source limits and assumptions

- AWS describes the architecture as a classic web application and names its infrastructure services, but does not specify application software, server operating systems, runtime, schemas, database engine, cache engine, or the exact responsibilities of the web and application server software. These remain unspecified.
- The diagram shows an AWS VPC with public, web, application, and database subnets in two Availability Zones. VPC addressing, subnet CIDRs, security-group rules, routing tables, scaling settings, and failover behavior are not defined here.
- AWS's first numbered step refers to routing traffic based on request path using Route 53. This model treats Route 53 as DNS endpoint resolution; any HTTP path-based behavior belongs in a configured content-routing layer such as CloudFront or a load balancer, and the source does not specify those rules.
- The reference describes AWS services only and does not name a required third-party system. The model does not add one.
- The source calls out ACM certificate management but does not specify certificate scope or TLS termination configuration.

## What teams usually customize

- Map the web client and web application slots to the project's own users and systems.
- Choose application software, web and application server boundaries, runtime, database engine, schemas, and cache policy.
- Configure VPC, subnet and Availability Zone layout, NAT routing, load-balancer listeners and health checks, security controls, scaling, and failover.
- Decide whether to use the optional ElastiCache and EFS capabilities, and determine backup and static-content policies for S3.
- Define CloudFront and load-balancer routing behavior, including any path-based rules, along with certificate scope and TLS termination.
