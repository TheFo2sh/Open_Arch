# Personalization in Magento eCommerce on AWS for CPG

This template models AWS's [Personalization in Magento eCommerce on AWS for CPG](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/magento-personalization-cpg/magento-personalization-cpg.html), published May 20, 2021. See the [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/magento-personalization-cpg/images/magento-personalization-cpg.png), [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/magento-personalization-cpg/magento-personalization-cpg.pdf#magento-personalization-cpg), and the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

A containerized Magento storefront for a consumer packaged goods business, with product recommendations personalized from historical and real-time shopper behavior. Amazon EKS orchestrates the Magento and Varnish pods; Amazon Personalize trains and serves the recommendation model.

## Architecture and data flow

1. Amazon Route 53 provides DNS configuration. AWS WAF protects Magento against common web exploits, and Amazon CloudFront distributes static and dynamic content.
2. CloudFront forwards requests to an Application Load Balancer. Through Kubernetes ingress, the load balancer distributes requests across Varnish Cache Enterprise pods on Amazon EKS in multiple Availability Zones.
3. Varnish serves cached pages and forwards cache misses to Magento pods. Each Magento pod includes the application, Nginx, and PHP. Amazon ECR hosts both Varnish and Magento container images.
4. Magento uses Amazon OpenSearch Service for catalog search, Amazon ElastiCache for Redis for caching, and Amazon Aurora or Amazon RDS for relational data. Amazon EFS provides shared configuration for Varnish and shared media assets for Magento.
5. The Amazon Personalize extension for Magento exports historical user data to an Amazon S3 bucket. Amazon Personalize trains on this data and creates a custom solution and campaign as a private model hosted in the AWS account.
6. Once activated, the Personalize model supplies product recommendations for shoppers. Magento also sends real-time interaction indicators, such as adding products to carts or wish lists, so Personalize can learn from user actions.

## Assumptions and details AWS does not specify

- The page's prose names Amazon OpenSearch Service; the 2021 diagram labels the search service Amazon Elasticsearch Service. This template follows the page's current service name.
- The source allows either Amazon Aurora or Amazon RDS for the relational database. The diagram depicts an Aurora primary and replica, so the blueprint models Aurora; it does not select a database engine.
- The source allows Magento Open Source or Commerce edition. The blueprint represents that choice without assuming both editions are deployed.
- AWS recommends the Enterprise version of Varnish for cloud backends and cache purging across dynamic hosts. The blueprint therefore catalogs Varnish Cache Enterprise as third-party software.
- The diagram depicts a VPC, public and private subnets, bastion hosts, internet and NAT gateways, and EFS mount targets. The numbered flow does not define their configuration; they remain infrastructure details for the deploying team.
- AWS does not specify the Magento extension's package or implementation, dataset schema or retention, Personalize recipe or campaign configuration, event-delivery mechanism, Kubernetes ingress configuration, or application/database sizing. These details are not invented here.
- The source does not prescribe a network topology beyond the diagram, or specify security policies, availability-zone count, or operational procedures.

## What teams usually customize

- Map the shopper and Magento system slots to the project's users and e-commerce system.
- Choose Magento Open Source or Adobe Commerce, select Aurora or RDS, and verify current search-service naming and compatibility.
- Select Varnish's edition and configure EKS, ingress, the load balancer, image repositories, and Availability Zones.
- Define the Personalize dataset, training choices, campaign activation, event integration, and the extension's implementation.
- Design the VPC, subnets, bastion access, gateways, EFS mounts, security, and scaling to match the deployment.

This is an M1Spec architecture template, not deployable AWS infrastructure.
