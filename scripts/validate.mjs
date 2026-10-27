// Validates every architecture template of Templates/ - the same rules M1Spec applies when it reads one
// (Okeno's services/architectureTemplates). Each rule is a named check; every problem is reported with
// the template and the rule, and the run fails if there is any. Usage: npm run validate [-- <Template>...]
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { LikeC4 } from "likec4";

const ROOT = new URL("..", import.meta.url).pathname;
const TEMPLATES = join(ROOT, "Templates");
const ZONE_PLATFORMS = ["aws", "azure", "gcp", "kubernetes", "docker", "openshift", "ibm-cloud", "oracle-cloud", "other"];
const ZONE_TYPES = ["managed-service", "compute-platform", "data-platform"];
const RELATABLE_TYPES = ["managed-service", "data-platform"];

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const schema = async (name) => ajv.compile(JSON.parse(await readFile(join(ROOT, "schema", name), "utf8")));
const validateManifest = await schema("manifest.schema.json");
const validateTechnologies = await schema("technologies.schema.json");
const specification = await readFile(join(ROOT, "specification.c4"), "utf8");

const exists = (path) => stat(path).then(() => true, () => false);
const usesOf = (element) => String(element.metadata?.uses ?? "").split(",").map((key) => key.trim()).filter(Boolean);

/** Reads a template folder into what the rules judge; problems reading it are rules too. */
async function load(folder) {
  const path = join(TEMPLATES, folder);
  const read = async (file) => ((await exists(join(path, file))) ? readFile(join(path, file), "utf8") : undefined);
  const [manifestText, technologiesText, blueprintText, readme] = await Promise.all(
    ["manifest.yaml", "technologies.yaml", "architecture.c4", "README.md"].map(read),
  );
  const template = { folder, readme, manifest: undefined, technologies: undefined, elements: [], relationships: [], parseErrors: [], missing: [] };
  for (const [file, text] of [["manifest.yaml", manifestText], ["technologies.yaml", technologiesText], ["architecture.c4", blueprintText], ["README.md", readme]]) {
    if (text === undefined) template.missing.push(file);
  }
  template.manifest = manifestText ? parse(manifestText) : undefined;
  template.technologies = technologiesText ? parse(technologiesText) : undefined;
  if (blueprintText) {
    const likec4 = await LikeC4.fromSource(`${specification}\n${blueprintText}`);
    template.parseErrors = likec4.getErrors().map((error) => `line ${error.line - specification.split("\n").length}: ${error.message}`);
    if (template.parseErrors.length === 0) {
      const model = await likec4.computedModel();
      template.elements = [...model.elements()].map((element) => ({
        id: element.id,
        kind: element.kind,
        title: element.title,
        parentId: element.parent?.id,
        metadata: element.$element.metadata ?? {},
      }));
      template.relationships = [...model.relationships()].map((relationship) => ({
        source: relationship.source.id,
        target: relationship.target.id,
        title: relationship.title ?? "",
      }));
    }
  }
  return template;
}

/** The rules, in the order they run. Each answers its problems for one template. */
const RULES = [
  { name: "has-its-files", check: (t) => t.missing.map((file) => `${file} is missing`) },
  {
    name: "manifest-fits-its-schema",
    check: (t) => (t.manifest && !validateManifest(t.manifest) ? validateManifest.errors.map((e) => `manifest.yaml${e.instancePath} ${e.message}`) : []),
  },
  {
    name: "technologies-fit-their-schema",
    check: (t) => (t.technologies && !validateTechnologies(t.technologies) ? validateTechnologies.errors.map((e) => `technologies.yaml${e.instancePath} ${e.message}`) : []),
  },
  {
    name: "technology-keys-are-unique",
    check: (t) => {
      const keys = (t.technologies?.technologies ?? []).map((technology) => technology.key);
      return [...new Set(keys.filter((key, i) => keys.indexOf(key) !== i))].map((key) => `technology key "${key}" is used twice`);
    },
  },
  {
    name: "technologies-name-their-platform",
    check: (t) => (t.technologies?.technologies ?? [])
      .filter((technology) => technology.types?.some((type) => ZONE_TYPES.includes(type)) && !technology.platform)
      .map((technology) => `${technology.key} runs somewhere of the team's, so it names its software platform`),
  },
  { name: "blueprint-parses", check: (t) => t.parseErrors.map((error) => `architecture.c4 ${error}`) },
  {
    name: "kinds-nest-as-the-schema-says",
    check: (t) => {
      const byId = new Map(t.elements.map((element) => [element.id, element]));
      const parentKind = (element) => byId.get(element.parentId)?.kind;
      const allowed = {
        zone: [undefined],
        platform: ["zone", "platform"],
        system: [undefined, "zone", "platform"],
        database: ["platform"],
        container: ["system"],
        component: ["container"],
        user: [undefined],
      };
      return t.elements
        .filter((element) => !(allowed[element.kind] ?? []).includes(parentKind(element)))
        .map((element) => `${element.kind} "${element.title}" can't be inside ${parentKind(element) ? `a ${parentKind(element)}` : "the model's root"}`);
    },
  },
  {
    name: "zones-name-a-platform",
    check: (t) => t.elements
      .filter((element) => element.kind === "zone" && !ZONE_PLATFORMS.includes(element.metadata.platform))
      .map((element) => `zone "${element.title}" names platform "${element.metadata.platform ?? ""}"; it is one of ${ZONE_PLATFORMS.join(", ")}`),
  },
  {
    name: "uses-known-technologies",
    check: (t) => {
      const keys = new Set((t.technologies?.technologies ?? []).map((technology) => technology.key));
      return t.elements.flatMap((element) => usesOf(element).filter((key) => !keys.has(key))
        .map((key) => `${element.kind} "${element.title}" uses "${key}", which technologies.yaml lacks`));
    },
  },
  {
    name: "platforms-are-zone-technologies",
    check: (t) => {
      const technologies = new Map((t.technologies?.technologies ?? []).map((technology) => [technology.key, technology]));
      const byId = new Map(t.elements.map((element) => [element.id, element]));
      const zoneOf = (element) => { let e = element; while (e && e.kind !== "zone") e = byId.get(e.parentId); return e; };
      return t.elements.filter((element) => element.kind === "platform").flatMap((element) => {
        const keys = usesOf(element);
        if (keys.length !== 1) return [`platform "${element.title}" uses exactly one technology, not ${keys.length}`];
        const technology = technologies.get(keys[0]);
        if (!technology) return [];
        if (!technology.types.some((type) => ZONE_TYPES.includes(type))) return [`platform "${element.title}" uses ${technology.key}, which is no managed service, compute or data platform`];
        const platform = zoneOf(element)?.metadata.platform;
        return platform && platform !== "other" && technology.platform !== platform
          ? [`platform "${element.title}" runs on ${technology.platform}, not on its zone's ${platform}`]
          : [];
      });
    },
  },
  {
    name: "elements-are-built-with-libraries",
    check: (t) => {
      const technologies = new Map((t.technologies?.technologies ?? []).map((technology) => [technology.key, technology]));
      return t.elements.filter((element) => ["container", "component", "system"].includes(element.kind)).flatMap((element) => usesOf(element)
        .filter((key) => technologies.get(key) && !technologies.get(key).types.includes("library"))
        .map((key) => `${element.kind} "${element.title}" is built with ${key}, which is no library`));
    },
  },
  {
    name: "runs-where-it-is-hosted",
    check: (t) => {
      const technologies = new Map((t.technologies?.technologies ?? []).map((technology) => [technology.key, technology]));
      const byId = new Map(t.elements.map((element) => [element.id, element]));
      return t.elements.filter((element) => ["system", "database"].includes(element.kind)).flatMap((element) => {
        const parent = byId.get(element.parentId);
        if (parent?.kind !== "platform") return [];
        const technology = technologies.get(usesOf(parent)[0]);
        return technology && !(technology.hosts ?? []).includes(element.kind)
          ? [`${element.kind} "${element.title}" runs on ${parent.title}, which hosts no ${element.kind}s`]
          : [];
      });
    },
  },
  {
    name: "relationships-are-allowed",
    check: (t) => {
      const technologies = new Map((t.technologies?.technologies ?? []).map((technology) => [technology.key, technology]));
      const byId = new Map(t.elements.map((element) => [element.id, element]));
      const runsOn = (id, platformId) => { for (let e = byId.get(id); e; e = byId.get(e.parentId)) if (e.parentId === platformId) return true; return false; };
      return t.relationships.flatMap((relationship) => {
        const problems = [];
        const label = `"${relationship.source} -> ${relationship.target}"`;
        if (relationship.source.startsWith(`${relationship.target}.`) || relationship.target.startsWith(`${relationship.source}.`)) {
          problems.push(`${label} relates an element to what it is inside`);
        }
        for (const [end, other] of [[relationship.source, relationship.target], [relationship.target, relationship.source]]) {
          const element = byId.get(end);
          if (element?.kind === "zone") problems.push(`${label} relates a zone; relate what runs in it`);
          if (element?.kind !== "platform") continue;
          const technology = technologies.get(usesOf(element)[0]);
          if (technology && !technology.types.some((type) => RELATABLE_TYPES.includes(type))) {
            problems.push(`${label}: ${element.title} is a compute platform only; relate what runs on it`);
          }
          if (runsOn(other, end)) problems.push(`${label}: what runs on ${element.title} can't also relate to it`);
          if (byId.get(other)?.kind === "user") problems.push(`${label}: a user relates to a system, not to a platform`);
        }
        return problems;
      });
    },
  },
];

const only = process.argv.slice(2);
const folders = (await readdir(TEMPLATES, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  .filter((folder) => only.length === 0 || only.includes(folder));
const packageIds = new Map();
let problems = 0;
for (const folder of folders) {
  const template = await load(folder);
  const found = RULES.flatMap((rule) => rule.check(template).map((problem) => `  [${rule.name}] ${problem}`));
  const packageId = template.manifest?.PackageId;
  if (packageId && packageIds.has(packageId)) found.push(`  [package-id-is-unique] ${packageId} is also ${packageIds.get(packageId)}'s`);
  if (packageId) packageIds.set(packageId, folder);
  problems += found.length;
  console.log(found.length === 0 ? `✓ ${folder}` : `✗ ${folder}\n${found.join("\n")}`);
}
if (folders.length === 0) console.log("No templates to validate.");
process.exit(problems > 0 ? 1 : 0);
