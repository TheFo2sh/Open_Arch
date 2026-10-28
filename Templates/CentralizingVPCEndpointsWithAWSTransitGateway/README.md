# Centralizing Amazon VPC Endpoint Access with AWS Transit Gateway

An M1Spec architecture template based on AWS's [Centralizing Amazon VPC Endpoint Access with AWS Transit Gateway](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/centralizing-vpc-endpoints-tgw/centralizing-vpc-endpoint-access.html) reference architecture. The source's [linked PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/centralizing-vpc-endpoints-tgw/centralizing-vpc-endpoints-tgw.pdf#centralizing-vpc-endpoint-access) contains the diagram modeled here.

## What it is for

The pattern lets EC2 workloads in multiple spoke VPCs privately access AWS services through interface endpoints centralized in a shared services VPC, instead of creating separate endpoints in each spoke. The AWS diagram shows endpoints for Amazon S3 and Amazon Kinesis Data Streams. It shows AWS-managed services only; no third-party service is required or depicted.

## Architecture and data flow

1. An EC2 instance in a spoke VPC queries that VPC's `VPC+2` resolver for a service domain. A custom Route 53 private hosted zone associated with the consuming VPC resolves the name to the corresponding interface endpoint in the shared services VPC.
2. The spoke VPC route table sends endpoint traffic to its Transit Gateway attachment. AWS Transit Gateway uses its spoke route table to forward traffic to the shared services VPC.
3. The Transit Gateway attachment in the shared services VPC forwards the traffic to the S3 or Kinesis interface endpoint, which privately connects to the AWS service through AWS PrivateLink.
4. The response returns from the endpoint through Transit Gateway. The shared services route table sends it to the originating spoke VPC, and its Transit Gateway attachment delivers it to the EC2 instance.

The reference diagram labels spoke VPC A as `10.0.0.0/16`, spoke VPC B as `10.1.0.0/16`, and the shared services VPC as `10.2.0.0/16`. Spoke A's workload and Transit Gateway subnets are `10.0.0.0/24` and `10.0.1.0/28`; spoke B's are `10.1.0.0/24` and `10.1.1.0/28`. The shared services VPC has a Transit Gateway subnet (`10.2.1.0/28`) and an endpoints subnet (`10.2.0.0/24`). The figure shows spoke A and the shared services VPC in Availability Zone 1 and spoke B in Availability Zone 2. The private hosted zones shown are for `s3.us-east-1.amazonaws.com` and `kinesis.us-east-1.amazonaws.com`.

## Source limitations and assumptions

The template represents the logical path in the AWS diagram, not deployable network configuration. AWS does not specify the application running on either EC2 instance, endpoint policies, security groups, network ACLs, IAM permissions, resiliency requirements, or implementation choices such as how route tables and hosted-zone associations are provisioned. The CIDRs, subnet ranges, availability zones, and service names above are copied from the figure, not recommendations. The source does not depict a bucket, stream, or other application data resource, so none is modeled as a database.

## What teams usually customize

- Replace the example VPC CIDRs, subnet layout, and availability-zone placement with the project's network plan.
- Map the two workload slots to the project's systems, then decide which AWS services need centralized interface endpoints.
- Adapt the private hosted zones, DNS names, endpoint policies, route tables, and access controls to the selected services and accounts.
- Add any required third-party services only if the consuming design needs them; none appear in this AWS reference.

This template documents an architecture; it does not deploy AWS infrastructure.
