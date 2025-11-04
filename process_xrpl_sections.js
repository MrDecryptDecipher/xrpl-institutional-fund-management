import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processSection } from './crawl_section.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the parsed JSON data
const jsonDataPath = path.join(__dirname, 'xrpl_guide_parsed.json');
const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Get section from command line argument
const sectionToProcess = process.argv[2];

if (!sectionToProcess) {
  console.log('Usage: node process_xrpl_sections.js <section>');
  console.log('Available sections:', Object.keys(jsonData).join(', '));
  process.exit(1);
}

if (!jsonData[sectionToProcess]) {
  console.log(`Section ${sectionToProcess} not found.`);
  console.log('Available sections:', Object.keys(jsonData).join(', '));
  process.exit(1);
}

// Process the specified section
console.log(`Starting to process section: ${sectionToProcess}`);
processSection(sectionToProcess, jsonData[sectionToProcess])
  .then(() => {
    console.log(`Completed processing section: ${sectionToProcess}`);
  })
  .catch((error) => {
    console.error(`Error processing section ${sectionToProcess}:`, error);
  });