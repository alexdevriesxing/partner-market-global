import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const jipBase = JSON.parse(fs.readFileSync(path.join(root, "lib/jip-opportunities.json"), "utf8"));
const newDir = path.join(root, "lib/jip-new");
const newFiles = fs.readdirSync(newDir).filter((f) => f.endsWith(".json")).sort();
const newProfiles = newFiles.map((f) => JSON.parse(fs.readFileSync(path.join(newDir, f), "utf8")));

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/\b(co\.?,?\s*ltd\.?|inc\.?|ltd\.?|llc|corp\.?|kabushiki\s*kaisha|pte\.?)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const seenSlugs = new Set();
const seenIds = new Set();
const seenCompanies = new Set();
const errors = [];

for (const o of jipBase) {
  if (seenSlugs.has(o.slug)) errors.push(`Duplicate slug in jip-opportunities.json: ${o.slug}`);
  if (seenIds.has(o.id)) errors.push(`Duplicate id in jip-opportunities.json: ${o.id}`);
  seenSlugs.add(o.slug);
  seenIds.add(o.id);
  seenCompanies.add(normalize(o.company));
}

const forbiddenStaff = ["arisa murata", "daisuke hasegawa", "kenta suzuki"];

for (const p of newProfiles) {
  if (seenSlugs.has(p.slug)) errors.push(`Duplicate slug in jip-new: ${p.slug}`);
  if (seenIds.has(p.id)) errors.push(`Duplicate id in jip-new: ${p.id}`);
  const norm = normalize(p.legalName);
  if (seenCompanies.has(norm)) errors.push(`Duplicate normalized company: ${p.legalName} (${norm})`);
  seenSlugs.add(p.slug);
  seenIds.add(p.id);
  seenCompanies.add(norm);

  const rawText = JSON.stringify(p).toLowerCase();
  for (const name of forbiddenStaff) {
    if (rawText.includes(name)) errors.push(`Private JIP staff name "${name}" leaked in ${p.key}.json`);
  }
  if (p.key.includes("sanrio") && p.status === "published") {
    errors.push("Sanrio must not be published without IP/mandate verification");
  }

  if (p.status === "published") {
    if (!p.images?.hero?.base || !p.images?.card?.src) {
      errors.push(`Published profile ${p.key} is missing image metadata`);
    } else {
      const checks = [
        `${p.images.hero.base}.webp`,
        `${p.images.hero.base}.jpg`,
        `${p.images.hero.base}-800.webp`,
        p.images.card.src
      ];
      for (const rel of checks) {
        const abs = path.join(root, "public", rel.replace(/^\//, ""));
        if (!fs.existsSync(abs)) errors.push(`Missing image file on disk for ${p.key}: ${rel}`);
      }
    }
  }
}

const publishedCount = newProfiles.filter((p) => p.status === "published").length;
const draftCount = newProfiles.filter((p) => p.status !== "published").length;

if (errors.length > 0) {
  console.error("CHECK FAILED:\n" + errors.map((e) => " - " + e).join("\n"));
  process.exit(1);
}

console.log(
  `OK: ${jipBase.length} base JIP records, ${newProfiles.length} jip-new records (${publishedCount} published, ${draftCount} draft), 0 duplicates, 0 missing images, 0 leaked staff names.`
);
