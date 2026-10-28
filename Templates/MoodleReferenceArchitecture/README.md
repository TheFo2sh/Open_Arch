# Moodle Reference Architecture

A scalable Moodle learning management system on AWS, based on the [AWS Moodle Reference Architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/moodle-learning-management-system-on-aws/moodle-learning-management-system-on-aws.html) (published August 18, 2022). The page embeds the [architecture diagram](https://docs.aws.amazon.com/images/architecture-diagrams/latest/moodle-learning-management-system-on-aws/images/moodle-learning-management-system-on-aws.png) and links an [editable PowerPoint ZIP](https://docs.aws.amazon.com/architecture-diagrams/latest/moodle-learning-management-system-on-aws/samples/moodle-learning-management-system-on-aws.zip).

## What it is for

An online learning service that needs a horizontally scalable Moodle application tier, shared course content, and managed services for its database, sessions, and cache. The reference separates the application and data layers for elasticity and security.

## How it works

1. **Amazon Route 53** directs learners to **Amazon CloudFront**, which serves cached content and forwards Moodle requests to an **Application Load Balancer**. **AWS Certificate Manager** provides SSL/TLS certificates for CloudFront or the load balancer.
2. The load balancer distributes requests to the **Moodle application** running on **Amazon EC2** instances managed by **Amazon EC2 Auto Scaling** across multiple Availability Zones.
3. Moodle can store `moodledata` and other content on **Amazon EFS**, sessions and application caches in **Amazon ElastiCache**, and application data in **Amazon Aurora**.
4. **AWS CodeCommit**, **AWS CodeBuild**, **AWS CodePipeline**, and **AWS CodeDeploy** provide source control and an automated build, test, and deployment flow. CodeDeploy can support blue/green deployments.
5. **AWS Secrets Manager** protects application secrets, and **AWS Systems Manager Parameter Store** stores configuration such as shared-storage endpoints, database settings, and cache settings. The optional **Systems Manager Agent** can provide instance access without exposing an SSH port.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform - or the project's AWS zone, if it has one |
| Platforms | Route 53, CloudFront, Certificate Manager, Elastic Load Balancing, EC2 Auto Scaling, EC2, EFS, ElastiCache, Aurora, CodeCommit, CodeBuild, CodeDeploy, CodePipeline, Secrets Manager, Systems Manager Parameter Store |
| Slots | **Learner** and **Moodle LMS** |
| Containers | **Moodle application** (Moodle and PHP) |
| Databases | **Session and application cache** on ElastiCache; **Moodle database** on Aurora |

## Assumptions and details not specified

- The source describes ElastiCache for **Redis or Memcached** and Aurora compatible with **MySQL or PostgreSQL**; this template leaves each engine choice open.
- EFS is described as something that **can** be used, so shared file storage is optional.
- The source describes multiple Availability Zones, but does not specify their count, instance sizes, scaling thresholds, or a detailed database topology.
- VPCs, public and private subnets, the internet gateway, and NAT gateways are deployment networking rather than elements of this architecture blueprint. Infrastructure code supplies those details.
- The source does not identify a required external third-party service. Moodle is the learning management software; no plugins or external integrations are assumed.
- The source says blue/green deployment is possible; it does not prescribe that deployment strategy.

## What teams usually customize

- Choose the ElastiCache engine and Aurora database engine, sizing, replication, and backup policies.
- Decide whether EFS is needed and what course files or other content it will hold.
- Set up the VPC, subnet layout, internet egress, access controls, certificates, and Availability Zone count.
- Configure application capacity, Auto Scaling policies, CI/CD stages, deployment strategy, secrets, and Parameter Store values for the target Moodle installation.
