# Active/Active and Active/Passive Configurations in AWS Direct Connect

A reference blueprint for resilient connections between customer networks and AWS, based on AWS's [Active/Active and Active/Passive Configurations in AWS Direct Connect](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/active-active-and-active-passive-configurations-in-aws-direct-connect/active-active-and-active-passive-configurations-in-aws-direct-connect.html).

## What it is for

Use this template when documenting redundant Direct Connect connectivity and comparing routing behavior. AWS presents four variants: Active/Active and Active/Passive configurations, each with Private/Transit VIFs or Public VIFs. The blueprint shows the shared multi-location underlay and the two VIF options; choose one routing mode and one VIF type for a particular design rather than treating all four variants as simultaneously deployed.

## How it works

1. Customer workloads route through customer-side routers and dedicated connections to Direct Connect endpoints. The reference recommends multiple connections, distinct routers, multiple Direct Connect locations, and multiple customer sites to address connection, device, and location failures.
2. With **Active/Active**, configure the advertised prefixes and relevant BGP attributes consistently across connections to enable AWS-side ECMP where supported. With **Active/Passive**, use route preference (such as local preference, AS path length, MED, or prefix specificity, depending on VIF type) to prefer a path and leave the others available for failover.
3. **Private/Transit VIFs** connect through an AWS Direct Connect gateway; the diagram shows an association to an AWS Transit Gateway and a Transit Gateway attachment to a VPC. **Public VIFs** use a separate path; AWS does not specify their destination services in this architecture.
4. AWS describes BGP route attributes and communities, and explains that a LAG can combine connections at one Direct Connect endpoint. A LAG does not protect against endpoint or location failure; ECMP is a Layer 3 flow-sharing behavior. Refer to AWS's source for mode-specific routing details and limitations.

## Source diagrams

The source page links to four diagrams:

- [Active/Active with Private/Transit VIF](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/active-active-and-active-passive-configurations-in-aws-direct-connect/images/1-active-active-with-private-transit-vif.png)
- [Active/Passive with Private/Transit VIF](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/active-active-and-active-passive-configurations-in-aws-direct-connect/images/2-active-passive-with-private-transit-vif.png)
- [Active/Active with Public VIF](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/active-active-and-active-passive-configurations-in-aws-direct-connect/images/3-active-active-with-public-vif.png)
- [Active/Passive with Public VIF](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/active-active-and-active-passive-configurations-in-aws-direct-connect/images/4-active-passive-with-public-vif.png)

The page also offers an editable PowerPoint download; it does not link to a PDF. AWS states a 99.99% SLA for the Maximum Resiliency model, subject to the [Direct Connect SLA](https://aws.amazon.com/directconnect/sla/).

## Assumptions and limits

- The blueprint is a documentation template, not an AWS deployment or network configuration.
- AWS names no required third-party service or router vendor. The generic customer/partner router platforms represent devices shown in the diagrams; their make, model, provider, and operating arrangement are not specified.
- The source does not define the customer workloads, the Public VIF destinations, exact connection counts or speeds, capacity, BGP timers, router configuration, or failover duration. The workload systems are slots, not claims about particular applications.
- The Private/Transit diagram shows a VPC, Transit Gateway attachment, AWS Transit Gateway, and Direct Connect gateway. The source does not detail downstream VPC resources or application flows.

## What teams usually customize

- Select the VIF type and Active/Active or Active/Passive policy that fits the design; set prefixes and BGP attributes on the actual customer and AWS sides.
- Replace the workload slots with the project's systems, and add the real VPC, gateway attachments, destinations, and traffic flows if they are known.
- Specify the number, speeds, providers, sites, router models, and operational responsibilities for the circuits and routers.
- Decide whether to use a LAG for connections at the same endpoint, while retaining separate locations and endpoints for resilience.
