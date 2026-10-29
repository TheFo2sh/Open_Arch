# Dual Stack and IPv6-only Amazon VPC Reference Architectures

A network architecture template for the [AWS reference family](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/) and its [family PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-vpc-architectures.pdf), published June 23, 2022. It imports the documented designs as a historical reference; deployment teams must verify current service capabilities before implementation.

## Use case and scope

Compare IPv4/IPv6 coexistence, internet egress, load-balancer targets, translation, and private/hybrid connectivity. The blueprint has seventeen separate views. These are alternatives and composable building blocks, not a required end-to-end chain. `index` is a family overview. External clients/endpoints and workloads are system slots mapped to the consuming project's systems.

## Architecture and flows

1. **Dual stack internet** (view `dualInternet`): Public workloads use IGW for either address family. Private IPv4 uses per-AZ NAT; private IPv6 uses EIGW. Both stacks require their own routes and security rules.

2. **IPv6-only subnets in a dual-stack VPC** (view `mixedSubnets`): A VPC retains its primary IPv4 CIDR while IPv6-only subnets carry only IPv6 CIDRs. DHCPv6 assigns IPv6 addresses. No native IPv4-only to IPv6-only connection is implied.

3. **IPv6-only internet connectivity** (view `ipv6Internet`): IPv6-only does not mean public. Route ::/0 to IGW for public subnets or EIGW for private outbound access.

4. **Dual-stack ALB with IPv4 targets** (view `albV4`): Clients independently choose IPv4 or IPv6 from DNS. The target group uses IPv4 targets; the legacy backend can remain IPv4-only.

5. **Dual-stack ALB with IPv6 targets** (view `albV6`): Clients independently choose IPv4 or IPv6 from DNS. The target group uses IPv6 IP-type targets.

6. **Dual-stack NLB with IPv4 targets** (view `nlbV4`): Clients independently choose IPv4 or IPv6 from DNS. The target group uses IPv4 targets; the legacy backend can remain IPv4-only.

7. **Dual-stack NLB with IPv6 targets** (view `nlbV6`): Clients independently choose IPv4 or IPv6 from DNS. The target group uses IPv6 IP-type targets.

8. **Internal dual-stack ALB and NLB** (view `internalElb`): ALB and NLB are alternatives. Each target group uses one address family. Internal endpoints block IGW traffic; routes must cover both stacks over the chosen private connection.

9. **DNS64** (view `dns64`): DNS64 synthesizes addresses, not data-plane translation. Native AAAA answers stay native IPv6. Pair synthesized destinations with NAT64 routing.

10. **NAT64** (view `nat64`): NAT64 is built into NAT Gateway. It translates synthesized IPv6 destinations into IPv4 and maintains return flows; it does not provide unsolicited inbound IPv4-to-IPv6 access.

11. **Centralized NAT64 egress** (view `centralNat64`): Enable DNS64 in spokes; route the translation prefix through TGW and the central egress VPC to public NAT.

12. **Dual-stack VPC peering** (view `peering`): Configure both stacks on both VPC route tables. Peered IPv4 and IPv6 CIDRs must not overlap.

13. **Dual-stack Transit Gateway** (view `transitGateway`): Each attachment chooses an IPv6-enabled subnet in each relevant AZ and enables IPv6 routing. Propagation includes both VPC address families; explicit VPC routes are still required.

14. **Dual-stack PrivateLink** (view `privateLink`): Consumer endpoint ENIs may be IPv4, IPv6 or dual-stack in matching subnets and block IGW access. The provider NLB is dual-stack; backend adoption is independent.

15. **Dual-stack Direct Connect** (view `directConnect`): Public, private and transit VIFs support both BGP stacks. The transit-VIF path includes a DX gateway association. Private/public addressing and ASN choices remain configuration details.

16. **Dual-stack VPN with Transit Gateway** (view `vpn`): The dated reference uses two VPN attachments, one per inner address family, and public IPv4 outer addresses. Keep this historical design distinct from current capability recommendations.

17. **Dual-stack Transit Gateway Connect** (view `tgwConnect`): Use VPC or DX gateway transport. The source specifies TGW CIDRs of /24 or larger for IPv4 or /64 or larger for IPv6, with BGP inside /29 and /125 blocks respectively.

## Source chapters

- [Dual stack internet](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-dual-stack-internet.html)
- [IPv6-only subnets in a dual-stack VPC](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-only-subnets.html)
- [IPv6-only internet connectivity](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-only-internet.html)
- [Dual-stack ALB with IPv4 targets](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-alb-ipv4-targets.html)
- [Dual-stack ALB with IPv6 targets](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-alb-ipv6-targets.html)
- [Dual-stack NLB with IPv4 targets](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-nlb-ipv4-targets.html)
- [Dual-stack NLB with IPv6 targets](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-nlb-ipv6-targets.html)
- [Internal dual-stack ALB and NLB](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-internal-elb.html)
- [DNS64](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-dns64.html)
- [NAT64](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-nat64.html)
- [Centralized NAT64 egress](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-centralized-egress-nat64.html)
- [Dual-stack VPC peering](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-vpc-peering.html)
- [Dual-stack Transit Gateway](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-transit-gateway.html)
- [Dual-stack PrivateLink](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-privatelink.html)
- [Dual-stack Direct Connect](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-direct-connect.html)
- [Dual-stack VPN with Transit Gateway](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-vpn-tgw.html)
- [Dual-stack Transit Gateway Connect](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ipv6-vpc-architectures/ipv6-tgw-connect.html)

## Assumptions and customization

- VPC/subnet route-table platforms denote routing scopes, not software processes. Workload hosting uses EC2 as in the reference. AZ replication, route-table entries, address allocations and security-group configuration are summarized in node/relationship text and this guide; this template is not deployable infrastructure.
- An example external endpoint stands for either clients or servers as labeled by each flow. Arrows denote logical connectivity or DNS requests/results, not detailed packet forwarding or a protocol implementation.
- ALB/NLB IPv4 versus IPv6 target groups and VPC versus DX transport are alternatives. Do not register mixed address families in a single target group. IPv6 target groups use IP targets.
- DNS64 alone cannot translate traffic; NAT64 routes are required for IPv4-only destinations. Native IPv4/IPv6 flows remain separate. Route/security changes, account structure, IAM, CIDRs, ASNs, DNS names and capacity are project-specific.
- The Direct Connect view condenses the DX gateway association on the transit-VIF path into the relationship label; select the appropriate concrete gateways and VIFs for a deployment. The source supplies no mandatory third-party application vendor.
- Customize system slots, Regions/AZs, VPC boundaries, target groups, BGP prefixes, gateways and return routes after selecting the applicable pattern. Validate current AWS capabilities and quotas independently of the dated reference.

## Validation

Run `npm run validate -- DualStackAndIPv6OnlyAmazonVPCReferenceArchitectures` and `npm run validate` from the repository root.
