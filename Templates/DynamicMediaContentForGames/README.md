# Dynamic Media Content for Games

An AWS architecture for selecting and delivering dynamic game media, based on AWS's [Dynamic Media Content for Games reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/dynamic-media-content-games/dynamic-media-content-games.html), its [diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/dynamic-media-content-games/images/dynamic-media-content-games.png), and its [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/dynamic-media-content-games/dynamic-media-content-games.pdf) in the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Game clients request dynamic media while AWS edge logic chooses the content origin from replicated routing rules. Amazon CloudFront caches and delivers the selected content from Amazon S3.

## How it works

1. A game client requests dynamic media through Amazon CloudFront and supplies generic, low-cardinality player attributes. Keeping these attributes low-cardinality helps preserve CloudFront cache hit rates.
2. CloudFront invokes AWS Lambda@Edge near the requester. The edge function evaluates the request and selects or rewrites the content origin request.
3. Lambda@Edge reads routing rules from the nearest regional replica of an Amazon DynamoDB Global Table.
4. CloudFront fetches the selected content from its Amazon S3 origin when needed, returns it to the client, and caches it at edge locations for subsequent requests.

## What applying it brings

| | |
|---|---|
| Zones | AWS edge; AWS content and routing services |
| Platforms | Amazon CloudFront, AWS Lambda@Edge, Amazon DynamoDB Global Tables, Amazon S3 |
| Slots | **Game player** and **Game client**; map these to the project's own users and systems |
| Edge logic | **Dynamic media origin selector** on Lambda@Edge |
| Data stores | **Replicated media routing rules** on DynamoDB Global Tables; **Dynamic media objects** on S3 |

## Assumptions and boundaries

- The blueprint follows the AWS source's numbered flow. It models the Global Table as one logical database with regional replicas, rather than choosing a Region count or naming Regions that AWS does not specify.
- AWS does not define the player-attribute schema, routing-rule format, Lambda@Edge code or runtime, CloudFront cache policy, S3 bucket layout, media formats, or deployment topology. Those details are intentionally left open.
- Player attributes are described generically. The source does not prescribe personal data, a specific game backend, or how attributes are divided between origin selection and CloudFront cache keys.
- No third-party service or game backend is identified in the documented flow, so none is added to the blueprint.
- This is an architecture template, not deployable AWS infrastructure. It does not configure distributions, functions, Global Tables, buckets, or cache policies.

## What teams usually customize

- Define the low-cardinality attributes sent by game clients and determine which belong in the CloudFront cache key.
- Implement origin-selection rules, their update process, and the regional replication and consistency requirements for the Global Table.
- Configure Lambda@Edge associations, CloudFront behaviors and cache policies, and the S3 origin and object organization.
- Map the generic player and game-client slots to the project's actual users and systems; add a game backend only if it is part of the project's architecture.
