const fs = require('fs');

const mdFile = 'INSTITUTIONAL_GRADE_COMPREHENSIVE_ANALYSIS.md';
let content = fs.readFileSync(mdFile, 'utf8');

// Replace each mermaid code block with the corresponding PNG image
const mermaidRegex = /```mermaid\n[\s\S]*?```/g;
let index = 1;

content = content.replace(mermaidRegex, (match) => {
  const replacement = `\n![Diagram ${index}](diagram_${index}.png)\n`;
  console.log(`Replaced diagram ${index}`);
  index++;
  return replacement;
});

// Write the new file
const outputFile = 'INSTITUTIONAL_GRADE_COMPREHENSIVE_ANALYSIS_WITH_IMAGES.md';
fs.writeFileSync(outputFile, content);

console.log(`\nCreated ${outputFile} with ${index - 1} diagrams replaced`);

