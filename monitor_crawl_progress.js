import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the parsed JSON data to know what we're expecting
const jsonDataPath = path.join(__dirname, 'xrpl_guide_parsed.json');
const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Function to count files in a directory
function countFilesInDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      return 0;
    }
    const files = fs.readdirSync(dirPath);
    let count = 0;
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        count += countFilesInDir(filePath); // Recursively count in subdirectories
      } else {
        count++;
      }
    }
    return count;
  } catch (error) {
    return 0;
  }
}

// Function to count error logs
function countErrorLogs(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      return 0;
    }
    const files = fs.readdirSync(dirPath);
    let count = 0;
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        count += countErrorLogs(filePath); // Recursively count in subdirectories
      } else if (file.endsWith('_error.log')) {
        count++;
      }
    }
    return count;
  } catch (error) {
    return 0;
  }
}

// Function to get section progress
function getSectionProgress(sectionKey, sectionData) {
  const sectionDir = path.join(__dirname, 'docs', 'XRPL', sectionKey);
  const fileCount = countFilesInDir(sectionDir);
  const errorCount = countErrorLogs(sectionDir);
  
  let expectedCount = 0;
  if (sectionData.entries) {
    expectedCount = Object.keys(sectionData.entries).length;
  } else if (sectionData.url) {
    expectedCount = 1;
  }
  
  return {
    section: sectionKey,
    processed: fileCount,
    errors: errorCount,
    expected: expectedCount,
    completion: expectedCount > 0 ? Math.round((fileCount / expectedCount) * 100) : (fileCount > 0 ? 100 : 0)
  };
}

// Main monitoring function
function monitorProgress() {
  console.log('📊 XRPL Documentation Crawl Progress Monitor');
  console.log('==========================================');
  console.log(new Date().toISOString());
  console.log('');
  
  // Overall stats
  const docsDir = path.join(__dirname, 'docs', 'XRPL');
  const totalFiles = countFilesInDir(docsDir);
  const totalErrors = countErrorLogs(docsDir);
  
  console.log(`📈 Total Files Generated: ${totalFiles}`);
  console.log(`❌ Total Errors: ${totalErrors}`);
  console.log('');
  
  // Per-section stats
  console.log('📁 Section Progress:');
  console.log('--------------------');
  
  const sortedSections = Object.keys(jsonData).sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  
  let totalExpected = 0;
  let totalProcessed = 0;
  
  for (const sectionKey of sortedSections) {
    const sectionData = jsonData[sectionKey];
    const progress = getSectionProgress(sectionKey, sectionData);
    
    totalExpected += progress.expected;
    totalProcessed += progress.processed;
    
    const status = progress.completion === 100 ? '✅' : progress.completion > 0 ? '🔄' : '⏳';
    console.log(`${status} ${progress.section}: ${progress.processed}/${progress.expected} (${progress.completion}%) ${progress.errors > 0 ? `(${progress.errors} errors)` : ''}`);
  }
  
  console.log('');
  console.log('📈 Overall Progress:');
  console.log('--------------------');
  const overallCompletion = totalExpected > 0 ? Math.round((totalProcessed / totalExpected) * 100) : 0;
  console.log(`Overall: ${totalProcessed}/${totalExpected} (${overallCompletion}%)`);
  
  // Check if crawl is complete
  if (overallCompletion === 100) {
    console.log('');
    console.log('🎉 CRAWL COMPLETE!');
    console.log(`📂 Documentation saved to: ${docsDir}`);
    console.log(`📊 Total files generated: ${totalFiles}`);
    console.log(`❌ Total errors: ${totalErrors}`);
  }
}

// Run the monitor
monitorProgress();