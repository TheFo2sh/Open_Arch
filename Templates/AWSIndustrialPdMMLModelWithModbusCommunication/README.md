# AWS Industrial PdM ML Model with Modbus Communication

An industrial predictive-maintenance architecture from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). It uses AWS IoT SiteWise and AWS IoT Analytics to create an ML model from factory data, with anomaly notifications through Amazon SNS.

- [Architecture description and steps](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-pdm-ml-modbus/industrial-pdm-ml-modbus.html)
- [Linked architecture diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-pdm-ml-modbus/industrial-pdm-ml-modbus.pdf)

## What it is for

Collect factory-machine data over OPC-UA and Modbus, model assets and metrics in AWS IoT SiteWise, develop a predictive-maintenance ML model with AWS IoT Analytics, visualize analysis in Amazon QuickSight, and notify on anomalies with Amazon SNS.

## How it works

1. Factory machines expose OPC-UA servers and Modbus data. An industrial gateway runs an AWS IoT SiteWise Gateway connector for OPC-UA and an AWS IoT Greengrass Modbus connector.
2. The SiteWise connector sends factory metrics to AWS IoT SiteWise, where machine assets and monitored metrics are modeled and stored.
3. The Greengrass Modbus connector sends Modbus data through an AWS IoT Core rule to AWS IoT Analytics.
4. AWS IoT Analytics creates a container data set from the AWS IoT SiteWise data store and links it to a Docker image stored in Amazon ECR. A Jupyter Notebook uses the data set to build the PdM ML model.
5. Amazon QuickSight visualizes analysis from the IoT Analytics data source. An Amazon SNS topic sends anomaly notifications when its trigger is configured.

## What applying it brings

| | |
|---|---|
| Zones | **Factory**, represented as a non-AWS environment, and **AWS Cloud** |
| Edge platform | **AWS IoT Greengrass**, hosting the industrial gateway system slot |
| AWS platforms | IoT Core, IoT SiteWise, IoT Analytics, Elastic Container Registry, QuickSight, and SNS |
| Systems | **Factory machines**, **Industrial gateway**, and **Predictive maintenance model development** are slots for the project's systems |
| Database elements | The SiteWise asset model/data store and the IoT Analytics container data set |
| Connector containers | The Greengrass Modbus connector and AWS IoT SiteWise connector on the gateway |

## Assumptions and limits

The blueprint follows the source page's steps and diagram. Where AWS does not specify implementation detail, it does not prescribe one:

- The factory gateway hardware, operating system, network, security configuration, and machine vendor are not named.
- The source identifies OPC-UA servers and Modbus communication but does not provide versions, register maps, message schemas, sampling rates, or protocol settings.
- The ML algorithm, training parameters, container contents/base image, data-set schedule/retention, and model deployment or inference path are not described.
- The SNS topic's subscribers, notification channels, and anomaly trigger condition are unspecified. QuickSight dashboard design and access controls are also unspecified.
- The Jupyter Notebook is documented as part of model development, not as a separately hosted or independently deployed service.
- Docker, Jupyter Notebook, Modbus, and OPC Unified Architecture are cataloged as third-party technologies/protocols; the diagram does not identify their versions or deployment configuration.
- The factory and AWS boundaries describe an architecture, not a deployable network design. This template does not deploy AWS infrastructure.

## What teams usually customize

- Map the factory machines and gateway slots to the project's actual equipment, systems, and edge runtime.
- Adapt the SiteWise asset hierarchy, metrics, and OPC-UA/Modbus integration to the plant's protocol details.
- Specify the data-set cadence and retention, Docker image build, ML approach, and any production inference workflow.
- Configure anomaly rules, SNS subscribers, and QuickSight analysis, including authorization and operational requirements.
