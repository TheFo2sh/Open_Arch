# AWS Industrial IoT Predictive Maintenance ML Model

An M1Spec architecture template based on AWS's [AWS Industrial IoT Predictive Maintenance ML Model reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-iot-predictive-maintenance-ml/industrial-iot-predictive-maintenance-ml.html), its [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/industrial-iot-predictive-maintenance-ml/images/aws-industrial-PdM-ML-storage-RA.png), and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/industrial-iot-predictive-maintenance-ml/industrial-iot-predictive-maintenance-ml.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS published the reference on July 8, 2020.

## What it is for

Collect and organize factory equipment data with AWS IoT SiteWise, then make it available to data scientists for predictive-maintenance machine-learning training and deployment.

## How it works

1. **Collect equipment data at the edge.** Factory equipment sends OPC-UA telemetry to an AWS IoT SiteWise Connector running on AWS IoT Greengrass.
2. **Model and visualize factory assets.** AWS IoT SiteWise models on-premises devices, equipment, and processes as assets. AWS IoT SiteWise Monitor exposes a custom portal for near-real-time factory data, with user authentication from IAM Identity Center.
3. **Ingest other industrial feeds.** AWS IoT Greengrass Stream Manager publishes other industrial data to AWS IoT Core. IoT Core rules route data to AWS IoT Analytics.
4. **Create the container dataset.** AWS IoT Analytics creates a container dataset from the AWS IoT SiteWise datastore and links it to a custom Docker image stored in Amazon ECR.
5. **Train and deploy the model.** Data scientists use a Jupyter notebook on the dataset and Amazon SageMaker AI for predictive-maintenance model training and deployment.
6. **Visualize analysis.** Amazon QuickSight visualizes analysis using AWS IoT Analytics as its data source.

## What applying it brings

| | |
|---|---|
| Zones | **Factory** and **AWS Cloud** |
| Platforms | AWS IoT Greengrass, AWS IoT SiteWise, AWS IoT SiteWise Monitor, AWS IAM Identity Center, AWS IoT Core, Amazon ECR, AWS IoT Analytics, Amazon SageMaker AI, and Amazon QuickSight |
| Slots | **Factory equipment**, **Factory gateway**, **Custom factory data portal**, and **Data science workbench** systems; **Factory portal user** and **Data scientist** users |
| Containers | AWS IoT SiteWise Connector and AWS IoT Greengrass Stream Manager on the factory gateway |
| Databases | **SiteWise datastore** and the **IoT Analytics container dataset** |

The source names OPC-UA as the equipment protocol, Docker as the container image format, and Jupyter Notebook as the data-science environment. It does not identify a separate third-party hosted service.

## Assumptions and unspecified details

The blueprint follows the AWS page's numbered flow and linked diagram. The source does not identify factory equipment vendors, gateway hardware or operating system, OPC-UA endpoint details, telemetry schemas, the other industrial feed types, IoT Core rule configuration, the Docker image contents, dataset schema or schedule, the notebook's hosting environment, SageMaker training or deployment settings, or QuickSight dashboards. The template represents the notebook as a project system slot because AWS does not specify where it runs. The portal user role is generic because AWS does not name one.

The connections from the SiteWise datastore and Amazon ECR into the IoT Analytics container dataset, and from IoT Analytics to QuickSight, summarize the documented relationships; the source does not provide their detailed configuration. The architecture does not prescribe an AWS Region, account, network, security policy, service settings, high-availability design, or infrastructure code. This is an architecture template, not an AWS deployment.

## What teams usually customize

- Map the factory-equipment, gateway, data-science workbench, and portal slots to their own systems and user roles.
- Specify equipment, gateway configuration, OPC-UA endpoints, other industrial feeds, and telemetry formats.
- Define the IoT Core rules, SiteWise asset model and datastore, IoT Analytics dataset and Docker image, and their retention and refresh behavior.
- Configure the notebook environment, SageMaker training and deployment lifecycle, portal access, and QuickSight analysis.
- Add the network, account, region, security, and deployment details required for their AWS environment.
