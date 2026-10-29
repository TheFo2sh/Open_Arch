# Moodle for High Availability on AWS

A highly available Moodle learning platform on AWS, modeled after the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/moodle-for-high-availability-on-aws/moodle-for-high-availability-on-aws.html). The source page was not reachable from this environment; the blueprint was cross-checked against the AWS-maintained [Moodle reference architecture image](https://github.com/aws-samples/aws-refarch-moodle/blob/master/images/aws-refarch-moodle-architecture.png) and its [implementation documentation](https://github.com/aws-samples/aws-refarch-moodle#architecture).

## What it is for

The design separates the Moodle application tier from shared data services and distributes application servers across multiple Availability Zones. It includes edge delivery, managed database/cache/storage services, and an AWS deployment pipeline.

## How it works

1. **Amazon Route 53** directs users to **Amazon CloudFront**, which serves cached content from edge locations and forwards application requests to the **Application Load Balancer**. **AWS Certificate Manager** provides TLS certificates for CloudFront and/or the load balancer.
2. The load balancer distributes requests across Moodle application servers running on **Amazon EC2** in an **Amazon EC2 Auto Scaling** group across Availability Zones. Private application servers use **NAT Gateway** for outbound internet access.
3. The Moodle application uses **Amazon EFS** for shared Moodle data and content, **Amazon Aurora** for persistent application data, and **Amazon ElastiCache** for session and application caching.
4. **AWS CodePipeline** coordinates the source, build, and deployment workflow using **CodeCommit**, **CodeBuild**, and **CodeDeploy**. **AWS Secrets Manager** protects application secrets, while **Systems Manager Parameter Store** holds environment configuration such as service endpoints.

The application is third-party software: the template catalogs **Moodle** and its **PHP** runtime as libraries used by the Moodle application container. AWS's diagram does not identify any external third-party SaaS dependency, so none is added to the blueprint.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| Platforms | Route 53, CloudFront, Certificate Manager, Internet Gateway, NAT Gateway, Application Load Balancer, EC2 Auto Scaling, EC2, EFS, ElastiCache for Redis, Aurora, CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Secrets Manager, Parameter Store |
| Slots | **Moodle learning platform**, mapped to the project's Moodle system; **Moodle users**, mapped to the project's learners, educators, and administrators |
| Containers | **Moodle web application**, built with Moodle and PHP |
| Databases | **Session and application cache** on ElastiCache; **Moodle database** on Aurora |

## What teams usually customize

- **Moodle and PHP versions.** The diagram does not specify release versions; choose versions supported by the deployment and Moodle requirements.
- **Database engine and scale.** AWS describes Aurora as supporting MySQL- and PostgreSQL-compatible clusters; this blueprint does not select an engine, instance sizes, or reader count.
- **Caching.** The AWS material describes Redis or Memcached and session/application caching. Redis is the engine shown in the reference image; choose the engine and cache configuration for the Moodle deployment.
- **Network and security details.** VPC, subnets, Availability Zone count, routes, security groups, ports, and the number of NAT gateways are infrastructure configuration. The diagram depicts multiple Availability Zones but does not define these deployment settings in detail.
- **Operations.** Set scaling thresholds, backup and retention policies, secret rotation, TLS configuration, and deployment strategy for the environment. The template describes service roles and data flows; it does not deploy AWS resources.

## Sources

- [Moodle for High Availability on AWS — AWS Reference Architecture Diagrams](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/moodle-for-high-availability-on-aws/moodle-for-high-availability-on-aws.html)
- [AWS-maintained Moodle reference architecture diagram and implementation](https://github.com/aws-samples/aws-refarch-moodle)
