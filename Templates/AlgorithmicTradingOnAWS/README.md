# Algorithmic Trading on AWS

An AWS architecture for backtesting and hosting machine-learning-based algorithmic trading strategies, after the [AWS reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/algorithmic-trading-on-aws/algorithmic-trading-on-aws.html) and its [linked diagram](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/algorithmic-trading-on-aws/images/algorithmic-trading-on-aws.png). AWS published the reference on December 21, 2020.

## What it is for

The architecture combines historical market data, model training, strategy backtesting, and containerized trading services. It uses Amazon ECS with AWS Fargate for workloads, Amazon SageMaker AI for model training, and Amazon DynamoDB for transactional data storage.

## How it works

The following flow follows AWS's numbered description:

1. Historical price data comes from AWS Data Exchange or external market data sources and is stored in Amazon S3.
2. AWS Glue Data Catalog catalogs the historical data; Amazon Athena queries it.
3. Amazon SageMaker AI trains the machine-learning model for the trading strategy.
4. An ECS task on AWS Fargate runs a backtest of the strategy.
5. The Market Data Adapter runs as an ECS service on Fargate and feeds data into DynamoDB.
6. The Broker Adapter runs as an ECS service on Fargate and uses DynamoDB as its transaction store; the diagram also shows an external Broker API.
7. The Trading Strategy runs as an ECS service on Fargate.
8. Amazon EventBridge schedules jobs with AWS Lambda functions, and Amazon CloudWatch provides monitoring.

## Assumptions and scope

- The Market Data API and Broker API are shown as external systems in the diagram. AWS does not identify their providers, protocols, or contracts, so they remain system slots rather than named technologies.
- AWS permits historical data from AWS Data Exchange or external sources. The blueprint shows both alternatives, but does not choose a provider.
- AWS does not describe the schemas or retention of S3 data and DynamoDB transactions, nor how the strategy, adapters, and backtest exchange data beyond the stated flows.
- The reference does not specify the model, training data or cadence, strategy logic, backtest inputs, ECS task/service configuration, EventBridge schedules, Lambda function behavior, or CloudWatch metrics and monitoring targets. These details are intentionally not invented.
- The architecture does not specify a human actor; none is added. Systems are slots that map to a project's systems when this template is applied.
- This is an M1Spec architecture template, not deployable AWS infrastructure.

## What teams usually customize

- Map the trading workloads, model-training workload, scheduled jobs, and external API slots to the project's actual systems; omit slots that do not apply.
- Select market-data and broker providers and define their interfaces, authentication, and data agreements.
- Specify the market-data, transaction, and historical-data formats, retention, and access controls.
- Choose model and strategy implementations, training and backtesting processes, task/service sizing, schedules, monitoring signals, and operational controls.

