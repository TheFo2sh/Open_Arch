# Geofencing with Amazon Location Service and AWS IoT

This template follows AWS's [Geofencing with Amazon Location Service and AWS IoT reference architecture](https://docs.aws.amazon.com/reference-architecture-diagrams/latest/geofencing-amazon-location-service-iot/geofencing-amazon-location-service-iot.html) and its [diagram PDF](https://docs.aws.amazon.com/pdfs/reference-architecture-diagrams/latest/geofencing-amazon-location-service-iot/geofencing-amazon-location-service-iot.pdf). It describes a blueprint to import into M1Spec; it does not deploy AWS infrastructure.

## What it is for

Track high-value equipment entering or leaving premises and notify end users. AWS's example uses Bluetooth Low Energy (BLE) tagged assets in a warehouse with an arbitrary x/y coordinate system; GPS coordinates are an alternative for outdoor tracking.

## How it works

1. Create a Geofence Collection and add geofences, then associate it with a Location Tracker so Amazon Location Service sends geofence events to EventBridge.
2. The asset publishes its position to AWS IoT Core directly or, optionally, through AWS IoT Greengrass. IoT thing models can manage asset metadata.
3. An IoT rule invokes a Lambda function that sends the device ID and x/y coordinates to the Location Tracker. The tracker maintains position history and evaluates positions against the associated Geofence Collection.
4. The collection publishes enter and exit events to the default EventBridge event bus. EventBridge rules can invoke Lambda for event processing; a separate rule and function for raw geofence events are optional.
5. EventBridge can publish to an SNS topic for end-user notifications. Optionally, Lambda can forward raw events to AWS IoT Events for complex event detection; Timestream can retain event history, and IoT Events can publish detected events to SNS.

## Assumptions and source gaps

AWS does not specify the asset or BLE tag vendor, the physical or network topology, an IoT message protocol or schema, coordinate accuracy, geofence shapes, Lambda code, event filtering rules, or the end user's notification channel and SNS subscription. These are intentionally left as slots or unspecified service details; the diagram does not imply a particular implementation. The exact tracker/geofence configuration and deployment region are also left to the consumer.

The endpoint shown for an end user is a slot to map to a project's existing notification system, not a service specified by AWS. Greengrass, IoT Events, Timestream, the raw-event rule, and complex-event notification are optional paths from the source.

## What teams usually customize

- Map **Tracked asset**, **Edge location publisher**, **Notification endpoint**, and **End user** to the project's own systems and users; remove the Greengrass path if assets publish directly.
- Define the device message format, coordinate system, tracker/geofence setup, IoT rule, Lambda code, and EventBridge event filters.
- Choose whether to use the optional raw-event, AWS IoT Events, and Timestream path, and configure notification delivery and SNS subscriptions.
- Add the networking, identity, authorization, security, and deployment details required by the target AWS environment.
