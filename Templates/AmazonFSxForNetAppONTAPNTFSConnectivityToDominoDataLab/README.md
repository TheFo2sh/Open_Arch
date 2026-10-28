# Amazon FSx for NetApp ONTAP NTFS connectivity to Domino Data Lab

This template models AWS's [Amazon FSx for NetApp ONTAP NTFS connectivity to Domino Data Lab](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/storage/fsxn-ntfs-domino.html) reference architecture. The linked [storage architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/storage/storage.pdf#fsxn-ntfs-domino) and the [diagram image](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/storage/images/fsxn-ntfs-domino.png) are the source for its topology.

## What it is for

Domino Data Lab runs on Amazon EKS and works with data on Amazon FSx for NetApp ONTAP. Domino accesses Trident-managed volumes over NFS, while users can access the same data directly from their local machines over SMB (and the diagram also depicts NFS). The volume uses NTFS security style so direct SMB access can be authenticated through Active Directory.

## How it works

1. Users access the Domino application from a browser over HTTPS. Elastic Load Balancing directs traffic to available Domino nodes in the Amazon EKS cluster.
2. Domino uses a service account and NetApp Trident-managed volumes to access FSx for ONTAP over NFS. The diagram distinguishes Domino platform, compute, and GPU workloads.
3. Users can also read, create, edit, and delete files directly from a local machine over SMB. AWS describes converting Domino-created UNIX security-style volumes to NTFS security style; the SVM joins Microsoft Active Directory and Active Directory security groups are applied to the volume. The diagram depicts direct SMB/NFS file access.
4. Domino Data Lab uses AWS Secrets Manager, Amazon ECR, and Amazon Route 53 to help manage, secure, and deploy its resources.
5. External data sources may connect from the same VPC, another VPC, another cloud, or on premises. The source lists VPC peering, AWS Transit Gateway, an internet gateway, VPN, and AWS Direct Connect as connectivity options.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, with a VPC |
| Platforms | Elastic Load Balancing, Amazon EKS, FSx for NetApp ONTAP, AWS Directory Service, Secrets Manager, ECR, Route 53, and optional external-connectivity services |
| Slots | **Domino Data Lab**, the user's existing Domino system; **Domino user**; **Local file access client**; **External data sources** |
| Containers and components | Domino application with platform, compute, GPU, and NetApp Trident storage integration |
| Database | **Domino data volumes** on FSx for NetApp ONTAP |

## Assumptions and unspecified details

The template records the logical architecture rather than deployable infrastructure. AWS does not specify in this reference the VPC CIDRs, subnet and routing layout, number of Availability Zones or EKS nodes, load-balancer scheme, security groups and ports, TLS termination, or detailed HA configuration. It also does not specify FSx capacity/performance settings, volume names and mount paths, the Domino release/configuration, the service-account setup, or the exact Secrets Manager, ECR, and Route 53 resource flows.

The connectivity services shown for external data are alternatives, not a requirement to deploy every route. The architecture also does not prescribe the external source, its network location, or which option is selected. SMB/NFS here describes the access paths in the source, not a claim that every client or volume uses both protocols.

## What teams usually customize

- Map the Domino, user, local file client, and external data-source slots to the systems and users in their project.
- Choose their actual FSx for ONTAP SVMs and volumes, NTFS/AD permissions, mount paths, and NFS/SMB client needs.
- Replace the generic network outline with their VPC, subnet, access-control, availability, and selected external connectivity design.
- Align the Domino deployment, EKS sizing, and supporting AWS service configuration with their environment.
