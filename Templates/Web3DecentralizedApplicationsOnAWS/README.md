# Web3 Decentralized Applications on AWS

Static web hosting for a decentralized application (DApp) whose browser client calls an API and reaches the Ethereum network through an Amazon Managed Blockchain node. This template follows [AWS's Web3 Decentralized Applications on AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/web3-decentralized-applications-on-aws/web3-decentralized-applications-on-aws.html).

## What it is for

Use this as a starting point for a browser-based DApp that serves static files from Amazon S3 through Amazon CloudFront and sends blockchain requests through an API Gateway and Lambda backend. The backend uses Web3.js and a SigV4-signed HTTP request provider to communicate with an Amazon Managed Blockchain Ethereum node.

## Architecture and data flow

The source's numbered diagram describes these steps:

1. The browser requests the DApp through its Amazon CloudFront domain, which routes the request to the closest distribution.
2. CloudFront caches the DApp at the edge and retrieves the static files from an Amazon S3 bucket. The source says the bucket blocks other traffic and allows the configured CloudFront origin access identity.
3. The browser application sends API requests to Amazon API Gateway.
4. API Gateway sends requests to the AWS Lambda DApp backend. Lambda reads the request path and method, builds a Web3.js request, and uses a SigV4-signed HTTP request provider.
5. The Amazon Managed Blockchain Ethereum node receives and processes the Web3 requests.
6. Ethereum requests and transactions propagate to and are received from the decentralized Ethereum Blockchain Mainnet.

The blueprint separates frontend and backend system slots so a project can map them independently or map both to one existing DApp system. The Ethereum mainnet is outside AWS; the VPC is included as the boundary around the Managed Blockchain node shown in the diagram. No database is modeled because the source describes no separate application database.

## Assumptions and limits

- AWS does not specify a frontend framework, API routes, API authentication, Lambda runtime, or a particular SigV4 provider implementation. The blueprint records Web3.js and SigV4 only where the source names them and does not select a provider package.
- The source does not detail the Ethereum node's network configuration, RPC methods, wallet/key management, transaction signing by users, or confirmation handling. Those are not inferred here.
- The diagram's VPC boundary is represented, but its subnets, routing, security groups, IAM policies, deployment stages, and other infrastructure are not specified.
- The template describes an architecture to apply to an M1Spec project; it does not deploy AWS resources or supply application code.

Teams usually customize how the frontend and backend slots map to their systems, API paths and access controls, the CloudFront domain and cache settings, the S3 origin-access policy, and the Managed Blockchain network and node configuration.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/web3-decentralized-applications-on-aws/web3-decentralized-applications-on-aws.html)
- [AWS architecture diagram image](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/web3-decentralized-applications-on-aws/images/web-decentralized-applications-on-aws.png)
- [AWS reference architecture PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/web3-decentralized-applications-on-aws/web3-decentralized-applications-on-aws.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)
