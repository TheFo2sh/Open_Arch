# Open_Arch

Architecture templates for [M1Spec](https://m1spec.com): reference architectures you apply to a project's systems architecture. A template brings its technologies into the project's technology catalog, then its blueprint (zones, platforms, databases, containers, components and how they talk) into the project's C4 model.

## The repository

```
specification.c4            the custom C4 schema every blueprint is written against
schema/                     JSON schemas of manifest.yaml and technologies.yaml
scripts/validate.mjs        the checks CI runs - the same rules M1Spec applies when it reads a template
Templates/<Template>/
  manifest.yaml             what the template is
  technologies.yaml         the technologies it depends on
  architecture.c4           the architecture blueprint
  README.md                 its documentation
```

## Creating a template

1. **Make a folder** under `Templates/`, named in PascalCase: `Templates/MagentoOnAws`.

2. **Write `manifest.yaml`.** `PackageId` is the template's stable identity: never change it once published. Bump `Version` (semantic versioning) whenever the template changes.

   ```yaml
   PackageId: OpenArch.MagentoOnAws
   Name: Magento e-commerce on AWS
   Description: A highly available Magento store on AWS.
   Version: 1.0.0
   Icon: logos:magento          # an iconify slug
   Publisher: Open_Arch
   Tags: [e-commerce, aws]
   ```

3. **List the technologies in `technologies.yaml`**: every technology the blueprint uses, under a key it names it by.

   ```yaml
   technologies:
     - key: amazon-aurora-mysql
       name: Amazon Aurora MySQL         # matched to the project's catalog by name
       description: MySQL-compatible relational database.
       vendor: Amazon Web Services
       url: https://aws.amazon.com/rds/aurora/
       types: [managed-service, data-platform]
       platform: aws                     # its software platform; not for a library or a 3rd party
       hosts: [database]                 # what a team runs on it: system, database
       packages: [{manager: terraform, name: hashicorp/aws}]
   ```

   `types` are `library`, `managed-service`, `compute-platform`, `data-platform` and `third-party`. A container or component is built with libraries; a zone holds managed services and platforms. `packages` are optional: a catalog technology whose usage guides name one of them counts as the same technology.

4. **Draw the blueprint in `architecture.c4`**, a [LikeC4](https://likec4.dev) model that uses the element kinds of `specification.c4` and nothing else:

   | Kind | Is | Where it goes |
   |---|---|---|
   | `zone` | a logical zone; `metadata { platform 'aws' }` | the root |
   | `platform` | a technology of the zone; `metadata { uses '<key>' }` | a zone, or another platform it runs inside |
   | `system` | a software system - a **slot** | the root, a zone, or a platform it runs on |
   | `database` | a database, created by the template | a platform that hosts databases |
   | `container` | a deployable of a system; `metadata { uses '<key>, <key>' }` | a system |
   | `component` | a module of a container; `metadata { uses '<key>' }` | a container |
   | `user` | a person - a **slot** | the root |

   M1Spec's systems and users come from the project's domain languages, so a template's systems and users are **slots**: applying the template maps each onto one of the project's own (or leaves it out), then adds the slot's containers and components to that system.

   ```
   model {
     shopper = user 'Shopper'
     aws = zone 'AWS' {
       metadata { platform 'aws' }
       autoscaling = platform 'Amazon EC2 Auto Scaling' {
         metadata { uses 'amazon-ec2-auto-scaling' }
         storefront = system 'Online store' {
           web = container 'Magento application' {
             metadata { uses 'magento-open-source, php' }
           }
         }
       }
       aurora = platform 'Amazon Aurora MySQL' {
         metadata { uses 'amazon-aurora-mysql' }
         storeDb = database 'Store database'
       }
     }
     shopper -> aws.autoscaling.storefront 'Shops on'
     aws.autoscaling.storefront.web -> aws.aurora.storeDb 'Reads from and writes to'
   }
   ```

   Relationships follow M1Spec's rules:
   - A platform is a relationship's end only when it is a managed service or a data platform; a compute platform is related through what runs on it.
   - What runs on a platform does not also relate to it.
   - A user relates to systems, not to platforms.

   A `views` block is welcome for previewing with LikeC4; M1Spec ignores it.

5. **Document it in `README.md`**: what it is for, how it works, what a team typically changes.

6. **Validate:** `npm ci && npm run validate` (or `npm run validate -- MagentoOnAws` for one template). CI runs the same on every push and pull request; a template that fails isn't merged.

## Applying a template in M1Spec

On the **Systems Architecture** page, open **Architecture templates** in the tab bar and pick a template. Applying it takes two steps.

1. **Technologies.** M1Spec lists each technology of the template: already in one of the project's technology catalogs, or to be added. Pick the catalog the missing ones go into and add them. They are classified as `technologies.yaml` says and documented like any technology added to a catalog.

2. **Architecture.** An agent reads the project's architecture as it is and the blueprint, and decides what is not straightforward:
   - which of the project's zones each zone of the template becomes, or a new one;
   - which of the project's systems and users each slot is, or that it is left out;
   - which existing containers, components and databases a blueprint one already is - these survive and are reused instead of duplicated;
   - what is modified: a system moved onto the template's platform, libraries added to an element.

   Each decision comes with its reason, and M1Spec checks every one (the element exists and is of the slot's kind, the zone's platform fits, the platform hosts what is put on it) before showing it. The proposal lists the operations it leads to - create a zone, add a platform, place a system, add a database, a container, a component, libraries, a relationship. Untick what you don't want (what depends on it goes with it) and apply. Each operation is reported as done, failed with its reason, or skipped because what it needed failed. Nothing already in the architecture is deleted.

## Contributing

Open a pull request with the new or changed template folder. Keep a template to one architecture, prefer the catalog names technologies already have (`Amazon Aurora MySQL`, not `Aurora`), and describe every element in a sentence: the descriptions become the project's.
