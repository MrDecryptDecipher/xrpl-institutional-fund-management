import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the xrplguide.txt file
const filePath = path.join(__dirname, 'xrplguide.txt');
const content = fs.readFileSync(filePath, 'utf8');

// Parse the content into JSON structure
const lines = content.split('\n');
const result = {};
let currentSection = null;

for (const line of lines) {
  const trimmedLine = line.trim();
  if (!trimmedLine) continue;
  
  // Check if it's a section header (A, B, C, ..., AG, etc.)
  const sectionMatch = trimmedLine.match(/^([A-Z]+):\s*(https?:\/\/.*)$/);
  if (sectionMatch) {
    currentSection = sectionMatch[1];
    result[currentSection] = {
      "url": sectionMatch[2]
    };
    continue;
  }
  
  // Check if it's a numbered entry
  const numberedMatch = trimmedLine.match(/^(\d+):\s*(https?:\/\/.*)$/);
  if (numberedMatch && currentSection) {
    const number = numberedMatch[1];
    const url = numberedMatch[2];
    
    // Initialize the entries object if it doesn't exist
    if (!result[currentSection].entries) {
      result[currentSection].entries = {};
    }
    
    result[currentSection].entries[number] = url;
  }
}

// Save the parsed JSON to a file
const outputPath = path.join(__dirname, 'xrpl_guide_parsed.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log('Parsing complete. Output saved to xrpl_guide_parsed.json');