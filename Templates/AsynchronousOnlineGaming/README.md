# Asynchronous Online Gaming

An M1Spec architecture template based on AWS's [Asynchronous Online Gaming](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/asynchronous-online-gaming/asynchronous-online-gaming.html) reference architecture. This describes an architecture; it does not provision AWS resources.

## What it is for

A mobile or online game backend designed to handle unpredictable traffic and high request rates. AWS illustrates a multi-Availability-Zone deployment with a web tier, an optional separate application tier, managed caching and databases, object storage, content delivery, and push notifications.

## How it works

The flow below follows the AWS page's numbered text:

1. **Amazon Route 53** helps players discover service endpoints and can route by latency or geography.
2. **Elastic Load Balancing** distributes incoming traffic. AWS describes HTTPS in transit and TLS termination at the load balancer.
3. **Amazon EC2** web servers run in an Auto Scaling group spanning multiple Availability Zones.
4. If the web and application tiers are separated, an internal load balancer routes requests to the private application tier. The diagram shows this two-tier layout.
5. **Amazon ElastiCache for Redis** provides a highly available, scalable cache. The diagram shows a primary and secondary; AWS also describes Multi-AZ failover and read replicas.
6. **Amazon Aurora** provides a MySQL-compatible relational database with a main instance and read replicas across Availability Zones in the diagram.
7. **Amazon DynamoDB** provides a managed NoSQL data store.
8. **Amazon S3** stores game assets, downloadable content, and server-generated logs. The diagram shows an S3 VPC endpoint for access from the VPC. **Amazon CloudFront** caches content globally as the player base grows geographically.
9. **Amazon SNS** supports push notifications for Apple, Google, Amazon, and Windows platforms.

The diagram depicts the VPC across two Availability Zones, with web servers in public subnets and application servers in private subnets. It also labels an Internet Gateway and NAT gateways. These network elements are included because they appear in the source diagram; AWS does not specify their detailed route tables or security configuration.

## Third-party push channels

AWS says SNS has built-in support for Apple, Google, Amazon, and Windows push-notification platforms. The template catalogs these as external dependencies, but neither the AWS page nor the diagram identifies their exact provider products, APIs, credentials, or configuration. Select and configure the channels required by the game's client platforms; those details are not inferred here.

## Assumptions and limits

- The game backend is modeled as a system slot with generic web and application server containers. AWS does not prescribe a game engine, language, framework, API, protocol, or application behavior.
- The diagram shows the web/application split and an internal load balancer, while the prose says the internal load balancer is for deployments that separate those tiers.
- The diagram illustrates multi-AZ placement and database replicas but does not prescribe production capacity or an exact replica count. AWS describes Aurora as supporting up to 15 read replicas; that is a service capability, not a deployment requirement.
- The source does not define the game data model, what belongs in Aurora versus DynamoDB or Redis, cache policy, S3 object layout, CloudFront behavior, load-balancing algorithm, scaling policies, TLS certificate management, or push-provider setup.
- VPC and subnet CIDRs drawn in the figure are examples, not required address ranges. The blueprint does not encode IP ranges, subnet sizing, security groups, or routing rules.
- The source calls the workload asynchronous but does not define game-specific turn, matchmaking, or session flows.
- The repository's relationship rules do not allow a platform to relate directly to a user. Accordingly, the blueprint models the player's interaction with the game backend and the backend's SNS publishing dependency; SNS's delivery to registered client endpoints is described here rather than drawn as a platform-to-user relationship.

## What teams usually customize

- Choose the game backend's language, framework, protocol, and responsibilities, and decide whether to retain separate web and application tiers.
- Set Availability Zone coverage, instance capacity, Auto Scaling policies, load-balancer listeners, and network/security configuration.
- Define the game data model and select which data belongs in Aurora, DynamoDB, or Redis; choose replica counts and cache behavior.
- Set up S3 access, object organization, CloudFront distributions and caching, and log retention.
- Configure SNS topics and platform credentials for the client platforms the game supports.

## Sources

- [AWS reference architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/asynchronous-online-gaming/asynchronous-online-gaming.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/asynchronous-online-gaming/images/asynchronous-online-gaming.png)
- [AWS architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/asynchronous-online-gaming/asynchronous-online-gaming.pdf)
- [AWS reference architecture catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
