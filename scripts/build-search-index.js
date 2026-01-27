const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'src', 'data', 'tools');

function loadTools(files) {
  const all = [];
  for (const file of files) {
    const fullPath = path.join(toolsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(raw);
    if (!Array.isArray(json)) continue;
    for (const tool of json) {
      all.push({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        keywords: Array.isArray(tool.keywords) ? tool.keywords : [],
        path: tool.path,
        isActive: tool.isActive !== false,
        searchVolume: tool.searchVolume || 0,
        difficulty: tool.difficulty || 1,
        icon: tool.icon || 'tool'
      });
    }
  }
  return all;
}

const entries = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
  .map((entry) => entry.name);

const enFiles = entries.filter((name) => !name.includes('-zh.'));
const zhFiles = entries.filter((name) => name.includes('-zh.'));

const enIndex = loadTools(enFiles);
const zhIndex = loadTools(zhFiles);

const outDir = path.join(__dirname, '..', 'src', 'data');
fs.writeFileSync(path.join(outDir, 'search-index-en.json'), JSON.stringify(enIndex, null, 2));
fs.writeFileSync(path.join(outDir, 'search-index-zh.json'), JSON.stringify(zhIndex, null, 2));

console.log(`Wrote ${enIndex.length} en tools and ${zhIndex.length} zh tools`);
