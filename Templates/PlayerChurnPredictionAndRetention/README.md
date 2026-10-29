# Player Churn Prediction and Retention

An AWS reference architecture for predicting which free-to-play game players may leave and choosing targeted retention actions.

## Sources

- [AWS architecture page and numbered flow](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/player-churn-prediction-retention/player-churn-prediction-retention.html)
- [AWS architecture diagram (PNG)](https://docs.aws.amazon.com/images/reference-architecture-diagrams/latest/player-churn-prediction-retention/images/player-churn-prediction-retention.png)
- [AWS architecture diagram (PDF)](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/player-churn-prediction-retention/player-churn-prediction-retention.pdf)
- [AWS Reference Architecture Diagrams catalog](https://docs.aws.amazon.com/reference-architecture-diagrams/)

## What it is for

The architecture uses historical player events to train a churn model, then makes churn predictions available to a mobile game so it can select an appropriate retention action, such as a promotional offer or bonus items.

## How it works

1. The mobile client sends player events through the Kinesis game analytics pipeline to an S3 analytics bucket.
2. AWS Glue transforms the player data, marking players as **ACTIVE**, **INACTIVE**, or **CHURN**, and writes the machine-learning dataset to S3.
3. Data scientists use a SageMaker AI notebook to prepare data, test algorithms, and build a model.
4. SageMaker AI trains on 80% of the dataset; the remaining 20% tests model accuracy. The trained model is stored in S3.
5. The mobile client requests which in-game retention action to trigger through API Gateway and AWS Lambda.
6. **Batch inference:** A periodic AWS Glue job triggers a SageMaker AI batch transformation job and copies the predictions to the player profile table in DynamoDB. The Lambda function checks that profile when selecting an action.
7. **Real-time inference:** The Lambda function evaluates the player's churn probability using a SageMaker AI real-time endpoint and selects an action.

## What the blueprint includes

| | |
|---|---|
| Zone | **AWS** |
| Platforms | Amazon Kinesis game analytics pipeline, Amazon S3, AWS Glue, Amazon SageMaker AI, Amazon API Gateway, AWS Lambda, Amazon DynamoDB |
| Slots | **Mobile game client**, **Data scientist**, and **LiveOps** |
| Model workflow containers | SageMaker notebook, model training job, batch transformation job, and real-time inference endpoint |
| Databases | **Analytics data** and **Machine learning data** on S3; **Player profile** on DynamoDB |

## Assumptions and unspecified details

- The diagram labels the ingestion path “Amazon Kinesis Game Analytics Pipeline” but does not identify a specific Kinesis product, event schema, mobile SDK, or game engine. The catalog retains the diagram's label and does not assume those implementation details.
- AWS does not specify the bucket layout, Glue job configuration, batch schedule, model algorithm, features, churn threshold, endpoint configuration, or retention-action fulfillment system.
- The diagram includes a LiveOps role but describes no interaction for it. It is included as a slot without an inferred flow.
- No third-party provider or service is named in the source; none is added to the blueprint.

## What teams usually customize

- Map the mobile game client, data scientist, and LiveOps slots to the project's existing systems and users.
- Choose event schemas, data retention and access controls, Glue transformations and batch cadence, model evaluation and deployment settings, and profile-table keys.
- Connect the selected retention action to the game's offer or reward mechanism; AWS gives promotional offers and bonus items as examples but does not depict their delivery.
