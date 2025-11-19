const fs = require('fs');
const path = require('path');

const mdFile = 'INSTITUTIONAL_GRADE_COMPREHENSIVE_ANALYSIS.md';
const content = fs.readFileSync(mdFile, 'utf8');

// Extract all mermaid code blocks
const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
let match;
let index = 1;
const diagrams = [];

while ((match = mermaidRegex.exec(content)) !== null) {
  const mermaidCode = match[1];
  const filename = `diagram_${index}.mmd`;
  
  fs.writeFileSync(filename, mermaidCode);
  diagrams.push({
    index,
    filename,
    code: mermaidCode,
    fullMatch: match[0]
  });
  
  console.log(`Extracted diagram ${index} to ${filename}`);
  index++;
}

console.log(`\nTotal diagrams extracted: ${diagrams.length}`);

// Save diagram info for replacement
fs.writeFileSync('diagrams.json', JSON.stringify(diagrams, null, 2));

