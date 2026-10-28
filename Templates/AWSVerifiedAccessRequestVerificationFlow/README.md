# AWS Verified Access Request Verification Flow

An identity-aware access flow based on the [AWS Verified Access Request Verification Flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/verified-access/verified-access.html). AWS documents four related diagrams: initial and subsequent requests with IAM Identity Center, and the same two cases with a device trust provider.

## What it is for

Protect application endpoints in an Amazon VPC by evaluating each request against an application policy before AWS Verified Access proxies it to the application. The diagrams show IAM Identity Center for user authentication. Device posture evaluation is an additional, optional branch that requires a device trust provider, browser extension, and local device agent.

## How it works

1. The user's browser requests the application domain through an AWS Verified Access endpoint. For an initial request without an identity cookie, Verified Access redirects the browser to IAM Identity Center.
2. The user signs in. IAM Identity Center redirects the browser to the application endpoint with an identity token; Verified Access uses the token to set an identity cookie, then redirects the browser to the original URI.
3. On subsequent requests, the browser sends its identity cookie. Verified Access validates each request against the application policy using the user's identity. When device trust is configured, the browser extension also supplies a device information cookie and policy evaluation uses device posture.
4. Verified Access proxies validated requests to the configured endpoint in the customer VPC. AWS shows an Application Load Balancer, Network Load Balancer, and elastic network interface as alternative target types; the template does not imply that all three are deployed together.

AWS says the identity cookie has a lifetime and the user must authenticate again when it expires, but does not state its duration. In the device trust flow, AWS says the local agent continually gathers posture information and the browser extension transmits current information with each request.

For an initial request with device trust enabled, the browser extension first detects the redirects but may not yet recognize the application domain as a trusted Verified Access domain, so it does not add a device information cookie. Verified Access redirects the browser to a device validation domain and repeats the authentication redirects; IAM Identity Center can reuse the sign-in cookies from the earlier login. The device validation domain then returns a redirect that lets the extension add the application domain to its trusted-domain cache, set the device information cookie, and continue the redirect. AWS does not say whether the device validation domain is the provider's own domain or a separate endpoint.

## What applying it brings

| | |
|---|---|
| Zones | AWS and an external device trust service |
| Platforms | AWS Verified Access, IAM Identity Center, Amazon VPC, and the three alternative endpoint target types |
| Slots | **User device** and **Protected application**, mapped to systems in the applying project; **User**, mapped to a project user |
| Containers | Browser with the device trust extension; local device posture agent |
| Optional service | A third-party device trust provider when device posture is included in policy evaluation |

This is an architecture blueprint, not deployment instructions. It does not create AWS resources or configure policies, endpoints, identity providers, or device trust.

## What teams usually change

- **The application and user slots.** Map these to the project's existing systems and users.
- **The endpoint target.** Choose the supported target type that matches the application and its VPC configuration; AWS does not imply that all three are used at once.
- **Identity and policy.** Confirm the identity provider and define the actual Verified Access policy for the application's principals, actions, and resources.
- **Device trust.** Decide whether device posture is required and, if so, select and configure the provider, local agent, and browser extension.
- **Network and application details.** Add the project's actual VPC, endpoint configuration, application tiers, and any required network controls.

## Assumptions and unspecified details

The template keeps AWS's generic terms where the diagrams do not name a product or configuration. AWS does not specify the device trust provider or vendor, the browser extension or agent implementation, the identity-cookie lifetime, policy contents, token and cookie formats, endpoint protocol or ports, or the application's internal architecture. The device trust provider's integration mechanics are also not described; the blueprint shows the provider's role in supplying device trust context without prescribing a protocol or deployment.

## Sources

- [AWS Verified Access Request Verification Flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/verified-access/verified-access.html)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
- [Linked PDF of the four Verified Access diagrams](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/verified-access/verified-access.pdf)
