# Computer Vision for Quality Insights with IBM Maximo on AWS

An M1Spec template based on AWS's [Computer Vision for Quality Insights with IBM Maximo on AWS](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-maximo-quality-insights/ibm-maximo-quality-insights.html), including its [architecture diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/ibm-maximo-quality-insights/images/ibm-maximo-quality-insights-ra.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/ibm-maximo-quality-insights/ibm-maximo-quality-insights.pdf), from the [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/). AWS dates the architecture to April 11, 2023.

## What it is for

Inspect manufactured parts with IBM Maximo Visual Inspection (MVI): experts train defect-detection models, then MVI edge performs inference on assembly-line images and returns results for plant managers and technicians to review.

## How it works

The steps below follow the ten-step sequence in the AWS PDF:

1. Training datasets enter the MVI training server on Red Hat OpenShift in an AWS VPC through the MVI mobile app, MVI edge, or a subject matter expert using a web app.
2. Subject matter experts annotate images and train models on the MVI training server.
3. MVI edge or mobile clients create inspections and deploy models. RTSP is identified for video data.
4. Operator workstations publish messages to MQTT topics; MVI edge and mobile clients subscribe and receive them.
5. MVI edge captures a photo, performs inference, and sends images with inference results to MVI.
6. Route 53 provides DNS, and internal and external Network Load Balancers provide traffic to the OpenShift cluster.
7. MVI sends alerts and inference results to an MQTT topic.
8. Plant managers and technicians review inference results in the MVI edge UI, mobile app, or training server.
9. OpenShift connects Amazon EFS as network file storage and uses Amazon EBS as block storage.
10. Maximo Application Suite uses Amazon DocumentDB for its data dictionary and local user management.

The diagram also depicts an AWS VPC with three availability zones, one NAT gateway per zone, an internet gateway, and EC2-backed OpenShift. It shows EBS volumes and mount points across availability zones. The blueprint represents these as AWS platforms and records the depicted gateway counts, but does not infer extra network flows.

## What applying it brings

| | |
|---|---|
| Zones | **AWS Cloud** and **Manufacturing plant** |
| Platforms | Amazon Route 53, internal and external Network Load Balancers, EC2, Red Hat OpenShift, EFS, EBS, DocumentDB, Internet Gateway, and three NAT gateways |
| Slots | **IBM Maximo Application Suite**, **IBM Maximo Visual Inspection edge**, **IBM Maximo Visual Inspection mobile app**, **Operator workstation**, **MQTT broker**, and **IP camera** systems; **Subject matter expert** and **Plant manager or technician** users |
| Containers | **IBM Maximo Visual Inspection training server** and **web app** within the Maximo Application Suite system |
| Databases | **Maximo Application Suite data** on Amazon DocumentDB |
| Other technologies | IBM Maximo Visual Inspection, MQTT, and RTSP |

Systems and users are slots, not deployed resources. In particular, the diagram's generic edge MQTT broker is represented as a system slot because AWS does not name its product or provider.

## Assumptions and unspecified details

- The diagram labels an MQTT broker at the plant edge and describes MQTT topics, but AWS does not identify a broker product, provider, topic schema, or configuration. This template does not substitute AWS IoT Core or another broker.
- The source does not specify the VPC/subnet design, security controls, authentication, OpenShift version or cluster configuration, EC2 instance sizing, load balancer listeners/targets, Route 53 records, storage sizing/retention/backups, model formats, or detailed API/data formats between MVI and Maximo Application Suite.
- The diagram depicts the AWS network and storage components, but does not explain the separate traffic flows of the NAT gateways, internet gateway, EFS, or EBS. Those links are not inferred here beyond the numbered steps.
- The architecture names IBM Maximo Visual Inspection and Maximo Application Suite but does not specify their versions, licensing, or detailed deployment boundaries. MVI mobile and edge functions are modeled as system slots; consumers should map them to their own systems.
- IP camera and operator workstation are generic devices in the diagram; their manufacturers, software, and connection details are not specified.

This is an architecture template, not an AWS deployment plan. It does not prescribe a Region, network configuration, identity policy, availability settings, or infrastructure code.

## What teams usually customize

- Map the IBM, edge, workstation, camera, broker, and user slots to their own systems and users; omit slots they do not need.
- Select and configure the MQTT broker, topics, security, and edge-to-cloud connectivity.
- Define the VPC, OpenShift/EC2 topology, load balancer routing, availability, and storage policies.
- Specify camera/video ingestion, inspection workflows, model deployment, data formats, and the integration between MVI, Maximo Application Suite, and DocumentDB.
