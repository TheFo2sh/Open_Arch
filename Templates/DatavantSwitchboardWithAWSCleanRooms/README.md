# Datavant Switchboard with AWS Clean Rooms

An architecture for de-identifying and tokenizing healthcare data with Datavant Switchboard, then linking datasets for governed collaboration through AWS Clean Rooms. It follows AWS's [Datavant Switchboard with AWS Clean Rooms reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/datavant-switchboard-with-aws-clean-rooms/datavant-switchboard-with-aws-clean-rooms.html), its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/datavant-switchboard-with-aws-clean-rooms/images/datavant-switchboard-with-aws-clean-rooms.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/datavant-switchboard-with-aws-clean-rooms/datavant-switchboard-with-aws-clean-rooms.pdf).

## What it is for

Healthcare and life-sciences organizations can link de-identified, tokenized datasets and analyze them with collaborators without sharing, copying, or moving one another’s underlying data outside AWS.

## How it works

1. Each collaborator’s source data is stored in Amazon S3. Datavant Switchboard de-identifies and tokenizes it; AWS shows AWS Fargate, Amazon EKS, and Amazon ECS as supported container deployment methods.
2. Switchboard links tokenized data with collaborators and writes the linked output to an Amazon S3 bucket in each participant’s AWS account.
3. An AWS Glue crawler discovers the linked data, and the AWS Glue Data Catalog makes the tables available for collaboration.
4. The collaboration creator initiates AWS Clean Rooms and invites a member. Collaborators agree on analysis rules, associate configured Data Catalog tables, and grant the Clean Rooms service role access to their AWS Glue tables.
5. A member permitted to query can use the documented `AGGREGATE` and `LIST` functions across collaboration tables. Query results can be exported to Amazon S3 for the member permitted to receive them.
6. The recipient can use analytics services such as Amazon Redshift, Amazon Athena, Amazon EMR, and Amazon SageMaker AI to derive insights.

## Model and assumptions

- The two AWS zones represent the collaboration creator’s and member’s accounts. The creator and member are user slots; the data collaboration systems are system slots to map to the applying project’s own systems.
- S3 buckets and Glue catalog tables are `database` elements because the template specification has no separate bucket, dataset, or catalog-table kind.
- Datavant Switchboard is the required third-party container software. Its technology has both `third-party` and `library` types so the blueprint can attach it to a container under the current validator’s rule that container technologies are libraries; this does not assert that Switchboard is a conventional code dependency.
- Fargate, EKS, and ECS are shown as alternatives because AWS lists supported deployment methods but does not choose a deployment. Select and place the method used by the project when applying the template.
- AWS’s diagram places the analytics services in the creator’s AWS cloud, while its numbered description says the member permitted to receive results can use analytics services. The results bucket and analytics services are drawn in the creator zone to follow the diagram; move them to the receiving member’s account if that is the intended arrangement.
- AWS does not specify the tokenization configuration or algorithm, source schemas or formats, matching rules, account/network setup, table definitions, exact analysis rules, query, result format, analytics implementation, or detailed IAM policy. These details are intentionally not invented.
- The diagram’s deployment choices and optional analytics services are architectural options, not a deployment plan. This template does not provision infrastructure.

## What teams usually customize

- Map creator/member user and system slots to the actual participants and systems in the project.
- Choose the supported container deployment method and define its environment-specific compute and networking.
- Identify the source, linked-data, and result buckets, formats, catalog definitions, retention, and access controls.
- Configure AWS Clean Rooms membership, permitted analysis rules/functions, query permissions, and result recipient.
- Keep only the analytics services the recipient actually uses, and place the results bucket and services in the appropriate AWS account.
