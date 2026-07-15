// Extract the <script id="langdata"> block from index.html and validate it.
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");

const m = html.match(/<script id="langdata">([\s\S]*?)<\/script>/);
if(!m){ console.error("langdata script not found"); process.exit(1); }

// Evaluate the data script in a function scope and return the objects.
const code = m[1] + "\n;return {DATA,NAME_ENTRIES,LANG_FAMILY,FAMILY_GROUP,GROUPS};";
const {DATA,NAME_ENTRIES,LANG_FAMILY,FAMILY_GROUP,GROUPS} = (new Function(code))();

const groupSet = new Set(GROUPS);
const fineToGroup = fine => FAMILY_GROUP[fine] || fine;
const familyOf = lang => LANG_FAMILY[lang] || null;

let problems = 0;
const warn = (...a) => { console.log("⚠", ...a); problems++; };

// 1. FAMILY_GROUP values must be valid groups.
for(const [fine,grp] of Object.entries(FAMILY_GROUP)){
  if(!groupSet.has(grp)) warn("FAMILY_GROUP value not a group:", fine, "->", grp);
}

// 2. Every LANG_FAMILY value must map to a valid group.
for(const [lang,fine] of Object.entries(LANG_FAMILY)){
  const grp = fineToGroup(fine);
  if(!groupSet.has(grp)) warn("LANG_FAMILY maps to unknown group:", lang, "->", fine, "->", grp);
}

// 3. Check all entries: languages referenced must exist in LANG_FAMILY; dominant must resolve.
const allEntries = Object.assign({}, DATA, NAME_ENTRIES);
let langsChecked = 0, entries = 0;
for(const [key,e] of Object.entries(allEntries)){
  entries++;
  for(const l of (e.official||[])){
    langsChecked++;
    if(!familyOf(l)) warn("[" + key + " " + e.name + "] official lang missing family:", JSON.stringify(l));
  }
  for(const l of (e.widelySpoken||[])){
    langsChecked++;
    if(!familyOf(l)) warn("[" + key + " " + e.name + "] widelySpoken lang missing family:", JSON.stringify(l));
  }
  const dom = e.dominant;
  if(dom){
    const grp = fineToGroup(dom);
    if(!groupSet.has(grp)) warn("[" + key + " " + e.name + "] dominant resolves to unknown group:", dom, "->", grp);
  } else if(!(e.official&&e.official.length) && !(e.widelySpoken&&e.widelySpoken.length)){
    warn("[" + key + " " + e.name + "] entry has no languages and no dominant");
  }
}

// 4. Cross-check against the actual topojson geometries.
const topo = JSON.parse(fs.readFileSync("tmp/countries-110m.json","utf8"));
const geos = topo.objects.countries.geometries;
const norm = s => (s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const nameIndex = {};
for(const k in DATA){ nameIndex[norm(DATA[k].name)] = DATA[k]; }

let covered = 0, noData = [];
for(const geo of geos){
  const id = geo.id;
  const nm = geo.properties && geo.properties.name;
  const byId = id && DATA[id];
  const byName = NAME_ENTRIES[norm(nm)] || nameIndex[norm(nm)];
  if(byId || byName) covered++;
  else noData.push((id||"----") + " " + nm);
}

console.log("\n--- summary ---");
console.log("entries in data (incl. name entries):", entries);
console.log("languages checked:", langsChecked);
console.log("LANG_FAMILY keys:", Object.keys(LANG_FAMILY).length);
console.log("geometries:", geos.length, "| with data:", covered, "| no-data:", noData.length);
console.log("groups:", GROUPS.length);
if(noData.length) console.log("no-data geometries:\n  " + noData.join("\n  "));
console.log("\nproblems:", problems);
process.exit(problems ? 1 : 0);
