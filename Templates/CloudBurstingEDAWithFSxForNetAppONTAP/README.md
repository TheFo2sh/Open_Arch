# Cloud Bursting EDA with Amazon FSx for NetApp ONTAP

This template models AWS's [Cloud Bursting EDA with Amazon FSx for NetApp ONTAP](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/cloud-bursting-eda-fsx-netapp-ontap/cloud-bursting-eda-fsx-netapp-ontap.html) reference architecture. The [linked diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/cloud-bursting-eda-fsx-netapp-ontap/images/cloud-bursting-eda-fsx-netapp-ontap.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/cloud-bursting-eda-fsx-netapp-ontap/cloud-bursting-eda-fsx-netapp-ontap.pdf#cloud-bursting-eda-fsx-netapp-ontap) show its topology. The source is listed in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Burst electronic design automation (EDA) jobs from an on-premises data center to AWS compute using paired NetApp FlexCache and origin volumes for job inputs and results. Engineers can access job results from the on-premises cache without fetching unread data from AWS.

## How it works

1. Establish connectivity between the on-premises data center and AWS. AWS recommends **AWS Direct Connect** for production, or **AWS Site-to-Site VPN** for initial testing or a proof of concept; these are alternatives.
2. Deploy **Amazon FSx for NetApp ONTAP** in AWS and peer its cluster with the on-premises NetApp system.
3. Pair an AWS **job input FlexCache** volume with the on-premises **job input origin**. EC2 instances access the cached files from the file system over NFS.
4. Run EDA jobs on **Amazon EC2** using the local FlexCache volume. Required file blocks are fetched on demand and cached in AWS. Jobs write output to an AWS **job results origin** volume.
5. Pair an on-premises **job results FlexCache** volume with the AWS job results origin so the data center can access the output.
6. Only data that users read is fetched from the AWS origin, minimizing bandwidth use.
7. Engineers who access the same files repeatedly can receive them from the local on-premises FlexCache.
8. Configure FSx for NetApp ONTAP across multiple Availability Zones for high availability. The source diagram depicts two Availability Zones.

## What applying it brings

| | |
|---|---|
| Zones | **On-premises data center** and **AWS** |
| Platforms | On-premises NetApp storage, AWS Direct Connect, AWS Site-to-Site VPN, Amazon VPC, Amazon EC2, Amazon FSx for NetApp ONTAP |
| Slots | **Engineers**, **On-premises EDA environment**, and **Cloud EDA workload** |
| Container | **EDA job execution** on Amazon EC2; the source does not identify the EDA software |
| Databases | **Job input origin volume** and **Job results FlexCache volume** on the on-premises NetApp system; **Job input FlexCache volume** and **Job results origin volume** on FSx for NetApp ONTAP |

## Assumptions and unspecified details

This is an architecture template, not deployable AWS infrastructure. AWS does not specify the on-premises NetApp model or ONTAP version, EDA software, server roles, EC2 sizing or scaling, volume capacity and performance, FlexCache settings, detailed cluster-peering configuration, or the VPC's subnet and routing design. The diagram shows two Availability Zones, while the text requires a multi-AZ configuration; no additional AZ count or deployment settings are inferred here.

Direct Connect and Site-to-Site VPN are alternatives, not services that must both be deployed. AWS does not prescribe addressing, security controls, NFS mount configuration, or detailed network paths beyond the described connectivity and data access.

## What teams usually customize

- Map the engineer and system slots to the project's people and existing on-premises and cloud EDA systems.
- Select the actual on-premises NetApp platform, cluster peering, FlexCache/origin volumes, and file access configuration.
- Choose Direct Connect or Site-to-Site VPN and adapt the network, security, and VPC design.
- Set the EDA software, EC2 capacity and scaling, FSx performance, and high-availability settings for the workload.
