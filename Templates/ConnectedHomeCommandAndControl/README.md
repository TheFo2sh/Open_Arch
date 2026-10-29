# Connected Home Command and Control on AWS

This template follows AWS's [Connected Home Command and Control reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-home-command-control/connected-home-command-control.html) and its [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/connected-home-command-control/images/connected-home-command-control.png). It describes Alexa integration with connected home devices; it is an M1Spec blueprint, not an AWS deployment.

## What it is for

The architecture lets a resident issue home-device commands through an Alexa skill and receive proactive notifications. AWS IoT Core connects the devices to cloud services and also ingests device updates for real-time processing.

## How it works

1. An Alexa-enabled device, such as an Amazon Echo or a device running the Alexa Voice Services SDK, creates an Alexa invocation.
2. The Alexa skill uses AWS Lambda for backend logic. Amazon API Gateway validates authorization and access control before routing the request to the skill handler.
3. Amazon DynamoDB holds authorization data associating users with the skill and their devices. The API Gateway/Lambda flow checks this data before accepting a request.
4. The skill sends accepted commands through AWS IoT Core. An IoT rule evaluates each invocation and routes its message; the device-shadow flow sends settings to devices to match the Alexa request. AWS IoT Core securely delivers the command to the target devices.
5. Devices can publish local state updates to AWS IoT Core using the AWS IoT Device SDK, AWS IoT Greengrass, or Amazon FreeRTOS. An IoT rule writes update messages to Amazon Kinesis Data Streams.
6. Kinesis Data Streams provides real-time data for downstream processing. AWS names Amazon Managed Service for Apache Flink, Spark on Amazon EMR, Amazon EC2, AWS Lambda, and other services as possible consumers.
7. An AWS Lambda function invokes the Alexa Voice Service proactive notifications interface so new content from an Alexa domain or enabled skill can be indicated visually or audibly.

## What applying it brings

| | |
|---|---|
| Zones | **AWS** and an external **Connected home devices** zone |
| Platforms | Amazon API Gateway, AWS Lambda, Amazon DynamoDB, AWS IoT Core, Amazon Kinesis Data Streams |
| Slots | **Connected home user**, **Alexa Voice Service**, **Connected devices**, and the **Connected home Alexa skill backend** |
| Containers and components | Device client; skill authorization handler, command handler, real-time data processor, and proactive notification handler |
| Database | **User authorization data** on Amazon DynamoDB |
| Optional technologies named by AWS | Alexa Voice Services SDK, AWS IoT Greengrass, Amazon FreeRTOS, Amazon Managed Service for Apache Flink, Amazon EMR, and Amazon EC2 |

## Assumptions and unspecified details

The source documents the numbered sequence and services above, but does not define the Alexa skill's request contract, the authorization schema or protocol, device identities, command/state schemas, IoT topic names or rule expressions, shadow document structure, device provisioning, security policies, or which device-side software option to use. It also names several alternative stream-processing services without selecting one or specifying its processing design. The blueprint models AWS Lambda as one documented downstream consumer and does not imply that the other listed services run concurrently.

The source names AWS IoT Core, its topics, rules, and Device Shadow but does not present them as separate AWS service platforms; they are described together under the AWS IoT Core catalog entry. It does not specify regions, network boundaries, high availability, deployment automation, or detailed infrastructure. These are left for implementation rather than inferred in the template.

Amazon Alexa/Alexa Voice Service and the household's devices are external integration slots. AWS identifies Alexa-enabled devices and Amazon Echo as examples but does not prescribe a device vendor or a physical device model.

## What teams usually customize

- **Alexa and identity.** Map the Alexa Voice Service and user slots to the actual voice-assistant integration, account-linking, and identity systems.
- **Devices and commands.** Map the connected-device slot to the fleet and define device provisioning, command/state contracts, topics, rules, and shadow documents.
- **Device connectivity.** Select AWS IoT Device SDK, AWS IoT Greengrass, or Amazon FreeRTOS based on the devices and deployment.
- **Real-time processing.** Choose a Kinesis consumer and specify its processing and retention requirements.
- **Operations and security.** Define AWS regions, network placement, IAM and device policies, scaling, observability, and deployment details.
