# Observability with Logs, Traces, and Metrics

An AWS reference architecture for collecting, enriching, storing, and visualizing application logs, traces, and metrics. This template models the architecture; it does not deploy AWS infrastructure.

## Sources

- [AWS reference architecture page](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/observability-logs-traces-metrics/observability-logs-traces-metrics.html) and its [diagram](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/observability-logs-traces-metrics/images/observability-logs-traces-metrics.png) and [PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/observability-logs-traces-metrics/observability-logs-traces-metrics.pdf#observability-logs-traces-metrics).
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/).

## What it is for

Bring application performance and infrastructure signals together so operators can inspect logs and traces and explore interactive views across logs, traces, and metrics.

## How it works

1. Applications, services, and containers produce logs, traces, and metrics.
2. **Fluent Bit** collects logs, and **AWS Distro for OpenTelemetry** supplies metric scrapers and collects traces. **OpenSearch Data Prepper** transforms and enriches logs and traces.
3. The pipelines remain separate: Fluent Bit sends logs to Data Prepper, which sends logs and traces to **Amazon OpenSearch Service**. OpenTelemetry sends metrics directly to **Amazon Managed Service for Prometheus**.
4. Users explore logs and traces with **OpenSearch Dashboards** and build interactive visualizations with **Amazon Managed Grafana**.
5. The visualization tools query the stored data: OpenSearch Dashboards uses OpenSearch, while Grafana uses both OpenSearch and Prometheus data sources.

## What applying it brings

| | |
|---|---|
| Zone | **AWS**, on the AWS platform |
| User slot | **Observability user** |
| System slots | **Applications, services, and containers** that emit telemetry; **Telemetry collection pipeline** |
| Collector containers | Fluent Bit, AWS Distro for OpenTelemetry metric scrapers, and OpenSearch Data Prepper |
| Platforms | Amazon OpenSearch Service, Amazon Managed Service for Prometheus, and Amazon Managed Grafana |
| Databases | **Logs and traces** on OpenSearch Service; **Metrics** on Managed Service for Prometheus |
| Dashboard systems | OpenSearch Dashboards and Amazon Managed Grafana dashboards |

## Assumptions and details not specified

- The source does not identify workloads, deployment locations, collector hosting topology, signal formats, protocols, or how the collectors are configured. The workload and collection systems are slots so teams can map them to their own systems; the template does not assume EC2, Kubernetes, or a particular network.
- The source identifies the tools and data flows but does not specify AWS account or Region layout, storage retention, scaling, access controls, authentication, or dashboard implementation.
- No separate third-party hosted observability service is shown. Fluent Bit and OpenSearch Data Prepper are the documented non-AWS collector software; AWS Distro for OpenTelemetry provides the metric scrapers described in the flow.

## What teams usually customize

- Map the workload, collection pipeline, and user slots to the project's actual systems and roles.
- Choose where and how to run Fluent Bit, OpenTelemetry, and Data Prepper, and configure signal collection and enrichment.
- Configure OpenSearch and Prometheus retention, security, access, and sizing.
- Set up Grafana and OpenSearch Dashboards, including data sources, dashboards, and cross-signal views.
