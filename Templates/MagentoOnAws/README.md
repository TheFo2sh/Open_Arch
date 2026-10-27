# Magento e-commerce on AWS

A highly available [Magento Open Source](https://business.adobe.com/products/magento/open-source.html) store on AWS, after AWS's [Magento e-commerce reference architecture](https://docs.aws.amazon.com/architecture-diagrams/latest/magento-ecommerce-on-aws/magento-ecommerce-on-aws.html).

## What it is for

A store that has to stay up through traffic peaks: every tier runs in two availability zones and scales with the load, and the database, cache and search index are managed services with replicas.

## How it works

1. **Amazon Route 53** resolves the store's domain to **Amazon CloudFront**, which caches static content at the edge. **AWS WAF** filters malicious requests before CloudFront serves them.
2. CloudFront forwards the rest to an **Application Load Balancer**, which balances it over the **Varnish** instances: the store's full-page cache.
3. Varnish passes cache misses, through a second load balancer, to the **Magento** instances. Both tiers are **EC2 Auto Scaling** groups in two availability zones.
4. Magento keeps products, customers and orders in **Amazon Aurora MySQL** (a primary, and a replica in the second zone for reads), sessions and its cache in **Amazon ElastiCache for Redis**, and the catalog's search index in **Amazon OpenSearch Service**.
5. Media and generated files live on **Amazon EFS**, mounted by every Magento instance.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Route 53, WAF, CloudFront, Elastic Load Balancing, EC2 Auto Scaling, Aurora MySQL, ElastiCache for Redis, OpenSearch Service, EFS |
| Slots | **Online store**, the project's e-commerce system, running on EC2 Auto Scaling; **Shopper**, its customers |
| Containers | **Full-page cache** (Varnish) and **Magento application** (Magento, PHP) in the online store |
| Databases | **Store database** on Aurora, **Session and cache store** on ElastiCache, **Catalog search index** on OpenSearch |

## What teams usually change

- **The network.** The VPC, its subnets, NAT gateways and the internet gateway are left to the infrastructure code: they are how the platforms are deployed, not elements of the architecture.
- **One load balancer or two.** The reference puts one in front of each tier; both are the same Elastic Load Balancing technology here.
- **Varnish.** A store happy with CloudFront's caching alone can drop the full-page cache container and let the load balancer reach Magento directly.
- **Search.** Magento 2.4 needs OpenSearch (or Elasticsearch); keep the index unless the store uses a hosted search service.
