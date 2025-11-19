import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to count files in a directory recursively
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

// Function to check if crawl is complete
function checkCompletion() {
  const docsDir = path.join(__dirname, 'docs', 'XRPL');
  const totalFiles = countFilesInDir(docsDir);
  
  console.log(`Total files generated: ${totalFiles}`);
  
  // Expected total is 332 files + 1 summary file
  if (totalFiles >= 330) { // Allow some flexibility for errors
    console.log('✅ CRAWL PROCESS COMPLETED SUCCESSFULLY');
    console.log(`📂 Documentation saved to: ${docsDir}`);
    
    // Create final completion marker
    const completionMarker = path.join(__dirname, 'XRPL_CRAWL_COMPLETED');
    fs.writeFileSync(completionMarker, `XRPL Documentation Crawl Completed Successfully
Total files generated: ${totalFiles}
Completion time: ${new Date().toISOString()}`);
    
    return true;
  } else {
    console.log(`⏳ CRAWL IN PROGRESS - ${totalFiles}/332 files generated`);
    return false;
  }
}

// Run the check
checkCompletion();