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

// Function to verify completion
async function verifyCompletion() {
  console.log('🔍 Verifying XRPL Documentation Crawl Completion...');
  
  const docsDir = path.join(__dirname, 'docs', 'XRPL');
  const totalFiles = countFilesInDir(docsDir);
  
  console.log(`📊 Total files generated: ${totalFiles}`);
  
  // Check if we have the expected number of files (allowing some flexibility)
  if (totalFiles >= 330) { // 332 expected, allowing 2 for potential errors
    console.log('✅ VERIFICATION SUCCESSFUL');
    console.log(`📂 Documentation saved to: ${docsDir}`);
    
    // List some sample files to verify structure
    try {
      const sections = fs.readdirSync(docsDir);
      console.log('\n📁 Sample directory structure:');
      for (const section of sections.slice(0, 5)) { // Show first 5 sections
        const sectionPath = path.join(docsDir, section);
        const stat = fs.statSync(sectionPath);
        if (stat.isDirectory()) {
          const files = fs.readdirSync(sectionPath);
          console.log(`  ${section}/ (${files.length} files)`);
          for (const file of files.slice(0, 2)) { // Show first 2 files
            console.log(`    - ${file}`);
          }
          if (files.length > 2) {
            console.log(`    - ... and ${files.length - 2} more`);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not list sample files: ${error.message}`);
    }
    
    // Create completion marker
    const completionMarker = path.join(__dirname, 'XRPL_CRAWL_COMPLETED_SUCCESSFULLY');
    const completionData = {
      timestamp: new Date().toISOString(),
      totalFiles: totalFiles,
      status: 'SUCCESS'
    };
    
    fs.writeFileSync(completionMarker, JSON.stringify(completionData, null, 2));
    console.log(`\n✅ Completion marker created: ${completionMarker}`);
    
    return true;
  } else {
    console.log(`⏳ VERIFICATION IN PROGRESS - ${totalFiles}/332 files generated`);
    return false;
  }
}

// Run verification
verifyCompletion()
  .then((completed) => {
    if (completed) {
      console.log('\n🎉 XRPL DOCUMENTATION CRAWL COMPLETED SUCCESSFULLY!');
      console.log('The knowledge base is ready for use in implementing the XRPL Institutional Fund Management Protocol.');
    } else {
      console.log('\n🔄 XRPL DOCUMENTATION CRAWL STILL IN PROGRESS...');
      console.log('Please wait for the process to complete all 332 files.');
    }
  })
  .catch((error) => {
    console.error('❌ VERIFICATION ERROR:', error);
  });