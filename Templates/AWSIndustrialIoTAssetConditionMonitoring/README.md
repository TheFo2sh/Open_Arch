# AWS Industrial IoT Asset Condition Monitoring

An M1Spec architecture template based on AWS's [AWS Industrial IoT Asset Condition Monitoring reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-iot-asset-condition-monitoring/industrial-iot-asset-condition-monitoring.html) and its [PDF diagram](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-iot-asset-condition-monitoring/industrial-iot-asset-condition-monitoring.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). The AWS page was published August 20, 2020.

## What it is for

Monitor factory equipment health, detect fault conditions, provide operators with telemetry insights, and send mitigation commands back to factory-floor equipment.

## How it works

1. **Collect at the edge.** AWS IoT Greengrass runs on the factory gateway. Its AWS IoT SiteWise Connector collects machine data over OPC-UA; a Greengrass connector for Lambda functions interfaces with local Modbus, MQTT, or HTTP traffic.
2. **Ingest and model telemetry.** The SiteWise Connector publishes equipment data to AWS IoT SiteWise, where asset models represent on-premises devices, equipment, and processes. AWS IoT Core rules route messages to AWS IoT Events and AWS IoT Analytics.
3. **Analyze and visualize.** AWS IoT Analytics uses a channel, pipeline, and data store to collect and process telemetry. Amazon QuickSight provides insights. AWS IoT SiteWise Monitor provides a web portal for near-real-time equipment data and health metrics.
4. **Detect and notify.** AWS IoT Events detects complex events across data sources and triggers response messages. Amazon SNS publishes event notifications to operators.
5. **Mitigate.** An AWS Lambda function sends mitigation commands through AWS IoT Core, which forwards them to AWS IoT Greengrass for action on factory equipment.

## What applying it brings

| | |
|---|---|
| Zones | **Factory** (other) and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, AWS IoT SiteWise, AWS IoT SiteWise Monitor, AWS IoT Core, AWS IoT Analytics, AWS IoT Events, AWS Lambda, Amazon QuickSight, Amazon SNS |
| Slots | **Factory systems and data sources**, **Factory edge gateway**, **Mitigation function**, **Equipment monitoring portal**, **Equipment analytics dashboard**, and **Fault notifications** systems; **Operations Engineer** and **Operations Manager** users |
| Containers | AWS IoT SiteWise Connector and Greengrass connectors/local Lambda functions in the factory edge gateway |
| Databases | Asset models and equipment data on AWS IoT SiteWise; telemetry data store on AWS IoT Analytics |

The reference names no third-party cloud service. The factory equipment, OPC-UA server, and on-premises historian are customer-side dependencies; their vendors and implementations are not identified. OPC-UA, Modbus, MQTT, and HTTP are listed as protocols, not selected products.

## Assumptions and unspecified details

The diagram and accompanying text do not specify gateway hardware or operating system, network topology, security credentials or policies, telemetry schemas or rates, SiteWise/IoT Analytics retention, IoT Events detector models, SNS delivery channels, the Lambda runtime, or how mitigation commands are validated and made safe. The template does not invent these details. The SiteWise Connector-to-SiteWise and IoT Core-to-IoT Analytics relationships summarize the documented data flow; exact routing, rule configuration, and processing are left to consumers.

This is an architecture template, not an AWS deployment plan. It does not prescribe a Region, VPC, availability design, IAM configuration, infrastructure code, or service setup.

## What teams usually customize

- Map the factory, edge gateway, mitigation function, portals, dashboards, notifications, and operator slots to their own systems and users; omit slots they do not need.
- Identify their specific factory equipment, historian, protocol adapters, gateway hardware, and security/network design.
- Define telemetry models, SiteWise asset hierarchies, IoT Core rules, IoT Analytics processing, IoT Events detectors, dashboards, alert delivery, and mitigation safety controls.
- Confirm service availability and suitability for their account and Region, and adapt the design to current service capabilities.
