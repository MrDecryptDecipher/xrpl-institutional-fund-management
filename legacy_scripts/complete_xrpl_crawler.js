import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { setTimeout } from 'timers/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the parsed JSON data
const jsonDataPath = path.join(__dirname, 'xrpl_guide_parsed.json');
const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, 'docs', 'XRPL');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

console.log(`Loaded ${Object.keys(jsonData).length} sections from xrpl_guide_parsed.json`);

// Function to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9-_]/g, '-').substring(0, 50) || 'document';
}

// Function to extract comprehensive content from page
async function extractComprehensiveContent(page) {
  try {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Scroll to load all content
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Wait for dynamic content
    await setTimeout(2000);
    
    // Extract title
    let title = 'Untitled';
    try {
      title = await page.textContent('h1') || 'Untitled';
    } catch (e) {
      // Use page title as fallback
      title = await page.title() || 'Untitled';
    }
    
    // Extract overview/description
    let overview = '';
    try {
      // Look for first paragraph or description
      const firstParagraph = await page.$('p');
      if (firstParagraph) {
        overview = await firstParagraph.textContent();
      }
    } catch (e) {
      overview = 'No overview available';
    }
    
    // Extract main content with better structure
    let content = '';
    try {
      // Try to find the main content area
      const contentSelectors = [
        'main', 
        '.content', 
        '#content', 
        '.main-content', 
        'article', 
        '.docs-content',
        '.documentation-content',
        '.doc-content'
      ];
      
      let contentElement = null;
      for (const selector of contentSelectors) {
        contentElement = await page.$(selector);
        if (contentElement) break;
      }
      
      // Fallback to body if no specific content area found
      if (!contentElement) {
        contentElement = await page.$('body');
      }
      
      if (contentElement) {
        // Extract all relevant elements with their hierarchy
        const elements = await contentElement.$$('h1, h2, h3, h4, h5, h6, p, pre, code, ul, ol, table, div.highlight, .code-block, .alert, .note, .warning, .tip, .important');
        
        for (const element of elements) {
          try {
            const tagName = await element.evaluate(el => el.tagName.toLowerCase());
            const textContent = await element.textContent();
            const className = await element.evaluate(el => el.className || '');
            
            if (!textContent?.trim()) continue;
            
            // Skip navigation, footer, and other non-content elements
            const skipClasses = ['nav', 'navigation', 'menu', 'sidebar', 'footer', 'header', 'breadcrumb'];
            if (skipClasses.some(cls => className.includes(cls))) {
              continue;
            }
            
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
              // Add appropriate markdown headers
              const level = parseInt(tagName[1]);
              content += `\n${'#'.repeat(level)} ${textContent.trim()}\n\n`;
            } else if (tagName === 'p') {
              content += `${textContent.trim()}\n\n`;
            } else if (tagName === 'pre') {
              // Handle code blocks
              const codeContent = await element.textContent();
              content += `\`\`\`
${codeContent.trim()}
\`\`\`

`;
            } else if (tagName === 'code' && (className.includes('block') || className.includes('highlight'))) {
              // Handle block code
              const codeContent = await element.textContent();
              content += `\`\`\`
${codeContent.trim()}
\`\`\`

`;
            } else if (tagName === 'code') {
              // Handle inline code
              content += `\`${textContent.trim()}\`\n\n`;
            } else if (tagName === 'ul' || tagName === 'ol') {
              // Handle lists
              const listItems = await element.$$('li');
              for (const item of listItems) {
                const itemText = await item.textContent();
                if (itemText?.trim()) {
                  const prefix = tagName === 'ol' ? '1.' : '-';
                  content += `${prefix} ${itemText.trim()}\n`;
                }
              }
              content += '\n';
            } else if (tagName === 'table') {
              // Handle tables
              try {
                const tableMarkdown = await element.evaluate(table => {
                  let markdown = '';
                  const rows = table.querySelectorAll('tr');
                  if (rows.length > 0) {
                    // Header
                    const headerCells = rows[0].querySelectorAll('th, td');
                    if (headerCells.length > 0) {
                      markdown += '| ' + Array.from(headerCells).map(cell => cell.textContent.trim()).join(' | ') + ' |\n';
                      markdown += '| ' + Array.from(headerCells).map(() => '---').join(' | ') + ' |\n';
                    }
                    
                    // Body rows
                    for (let i = 1; i < rows.length; i++) {
                      const cells = rows[i].querySelectorAll('td');
                      if (cells.length > 0) {
                        markdown += '| ' + Array.from(cells).map(cell => cell.textContent.trim()).join(' | ') + ' |\n';
                      }
                    }
                  }
                  return markdown;
                });
                
                if (tableMarkdown) {
                  content += tableMarkdown + '\n\n';
                }
              } catch (tableError) {
                content += '[Table content - see original page for full table]\n\n';
              }
            } else if (className.includes('alert') || className.includes('note') || className.includes('warning') || className.includes('tip') || className.includes('important')) {
              // Handle alert boxes
              content += `> **${className.includes('warning') ? 'Warning' : className.includes('tip') ? 'Tip' : className.includes('important') ? 'Important' : 'Note'}**: ${textContent.trim()}\n\n`;
            }
          } catch (elementError) {
            // Continue with next element
            continue;
          }
        }
      }
    } catch (contentError) {
      content = `Content extraction failed: ${contentError.message}`;
    }
    
    // Extract images
    let images = '';
    try {
      const imageElements = await page.$$('img');
      if (imageElements.length > 0) {
        images += '## Images\n\n';
        for (const img of imageElements) {
          try {
            const src = await img.getAttribute('src');
            const alt = await img.getAttribute('alt') || 'Image';
            if (src) {
              // Handle relative URLs
              let fullSrc = src;
              if (src.startsWith('/')) {
                const pageUrl = page.url();
                const urlObj = new URL(pageUrl);
                fullSrc = `${urlObj.origin}${src}`;
              } else if (!src.startsWith('http')) {
                const pageUrl = page.url();
                fullSrc = new URL(src, pageUrl).href;
              }
              images += `![${alt}](${fullSrc})\n\n`;
            }
          } catch (imgError) {
            // Skip problematic images
            continue;
          }
        }
      }
    } catch (imagesError) {
      images = `Image extraction failed: ${imagesError.message}`;
    }
    
    // Extract outbound links
    let outboundLinks = '';
    try {
      const links = await page.$$('a[href]');
      const internalLinks = [];
      const externalLinks = [];
      
      for (const link of links) {
        try {
          const href = await link.getAttribute('href');
          const linkText = await link.textContent();
          
          if (href) {
            // Handle relative URLs
            let fullHref = href;
            if (href.startsWith('/')) {
              const pageUrl = page.url();
              const urlObj = new URL(pageUrl);
              fullHref = `${urlObj.origin}${href}`;
            } else if (!href.startsWith('http')) {
              const pageUrl = page.url();
              try {
                fullHref = new URL(href, pageUrl).href;
              } catch (urlError) {
                // Skip invalid URLs
                continue;
              }
            }
            
            // Categorize links
            if (fullHref.includes('xrpl.org')) {
              internalLinks.push(`- [${linkText?.trim() || fullHref}](${fullHref})`);
            } else if (fullHref.startsWith('http')) {
              externalLinks.push(`- [${linkText?.trim() || fullHref}](${fullHref})`);
            }
          }
        } catch (linkError) {
          // Skip problematic links
          continue;
        }
      }
      
      if (internalLinks.length > 0) {
        outboundLinks += '## Internal XRPL References\n\n';
        outboundLinks += internalLinks.slice(0, 50).join('\n') + '\n\n'; // Limit to 50 links
      }
      
      if (externalLinks.length > 0) {
        outboundLinks += '## External References\n\n';
        outboundLinks += externalLinks.slice(0, 50).join('\n') + '\n\n'; // Limit to 50 links
      }
    } catch (linksError) {
      outboundLinks = `Link extraction failed: ${linksError.message}`;
    }
    
    return {
      title: title.trim(),
      overview: overview.trim(),
      content: content.trim(),
      images: images.trim(),
      outboundLinks: outboundLinks.trim()
    };
  } catch (error) {
    return {
      title: 'Error Page',
      overview: `Failed to extract content: ${error.message}`,
      content: `Error details: ${error.stack}`,
      images: '',
      outboundLinks: ''
    };
  }
}

// Function to create error log
function createErrorLog(section, number, url, error, retries) {
  const errorDir = path.join(docsDir, section);
  if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir, { recursive: true });
  }
  
  const errorLogPath = path.join(errorDir, `${number}_error.log`);
  const errorContent = `URL: ${url}
Error: ${error.message}
Stack: ${error.stack}
Timestamp: ${new Date().toISOString()}
Retry attempts: ${retries}
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
  `;
  
  fs.writeFileSync(errorLogPath, errorContent);
  console.log(`❌ Error logged for ${section}/${number}: ${error.message}`);
}

// Function to generate filename from URL
function generateFilename(url) {
  try {
    const urlObj = new URL(url);
    let pathname = urlObj.pathname;
    
    // Remove trailing slash
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // Get the last part
    const parts = pathname.split('/');
    let filename = parts[parts.length - 1];
    
    // Handle special cases
    if (!filename || filename === 'docs') {
      filename = parts[parts.length - 2] || 'index';
    }
    
    // Handle root URLs
    if (!filename) {
      filename = 'index';
    }
    
    return sanitizeFilename(filename);
  } catch (error) {
    return 'document';
  }
}

// Function to crawl a single URL with full error handling
async function crawlUrl(section, number, url) {
  let browser = null;
  let context = null;
  
  try {
    console.log(`🕷️  Crawling ${section}/${number}: ${url}`);
    
    browser = await chromium.launch({ 
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      viewport: { width: 1280, height: 720 },
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    });
    
    let retries = 0;
    const maxRetries = 3;
    
    while (retries < maxRetries) {
      try {
        const page = await context.newPage();
        
        // Set timeouts
        page.setDefaultTimeout(30000);
        page.setDefaultNavigationTimeout(30000);
        
        // Navigate to the page
        await page.goto(url, { 
          waitUntil: 'networkidle', 
          timeout: 30000 
        });
        
        // Extract comprehensive content
        const extracted = await extractComprehensiveContent(page);
        
        // Generate filename
        const filename = generateFilename(url);
        
        // Create section directory
        const sectionDir = path.join(docsDir, section);
        if (!fs.existsSync(sectionDir)) {
          fs.mkdirSync(sectionDir, { recursive: true });
        }
        
        // Create comprehensive Markdown content
        const markdownContent = `# ${extracted.title}
URL: ${url}
Section: ${section}${number}

## Overview
${extracted.overview}

## Extracted Content
${extracted.content}

${extracted.images ? extracted.images + '\n' : ''}

## Outbound References
${extracted.outboundLinks}

---
Crawled on: ${new Date().toISOString()}
Agent: Qoder + Playwright MCP
Retries: ${retries}
Status: SUCCESS
`;

        // Save to file
        const filePath = path.join(sectionDir, `${number}_${filename}.md`);
        fs.writeFileSync(filePath, markdownContent);
        
        console.log(`✅ Successfully crawled ${section}/${number}: ${url}`);
        
        await page.close();
        await context.close();
        await browser.close();
        
        // Add random delay between requests to be respectful
        const delay = 3000 + Math.random() * 5000; // 3-8 seconds
        await setTimeout(delay);
        
        return true;
      } catch (error) {
        retries++;
        console.log(`⚠️  Error crawling ${section}/${number}: ${url} (attempt ${retries}/${maxRetries})`);
        console.log(`Error: ${error.message}`);
        
        if (retries >= maxRetries) {
          throw error;
        }
        
        // Wait before retrying with exponential backoff
        await setTimeout(5000 * retries);
      }
    }
  } catch (error) {
    if (context) await context.close();
    if (browser) await browser.close();
    throw error;
  }
}

// Function to process all URLs in a section
async function processSection(sectionKey, sectionData) {
  console.log(`\n📂 Processing section: ${sectionKey}`);
  console.log(`🔗 Section URL: ${sectionData.url || 'N/A'}`);
  
  const sectionDir = path.join(docsDir, sectionKey);
  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  // Process entries if they exist
  if (sectionData.entries) {
    const entries = Object.entries(sectionData.entries);
    console.log(`📄 Found ${entries.length} entries to process`);
    
    for (const [number, url] of entries) {
      try {
        await crawlUrl(sectionKey, number, url);
        successCount++;
      } catch (error) {
        errorCount++;
        createErrorLog(sectionKey, number, url, error, 3);
      }
    }
  } else if (sectionData.url) {
    // Process single URL for sections without entries
    try {
      await crawlUrl(sectionKey, '', sectionData.url);
      successCount++;
    } catch (error) {
      errorCount++;
      createErrorLog(sectionKey, '', sectionData.url, error, 3);
    }
  }
  
  console.log(`\n📊 Section ${sectionKey} Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  return { successCount, errorCount };
}

// Function to process all sections
async function processAllSections() {
  console.log('🚀 Starting comprehensive XRPL documentation crawl');
  console.log(`📚 Total sections to process: ${Object.keys(jsonData).length}`);
  
  let totalSuccess = 0;
  let totalErrors = 0;
  
  // Process sections in order (A, B, C, ..., AA, AB, ..., AG)
  const sortedSections = Object.keys(jsonData).sort((a, b) => {
    // Sort by length first, then alphabetically
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
  
  console.log(`📋 Processing order: ${sortedSections.join(', ')}`);
  
  for (const sectionKey of sortedSections) {
    try {
      const sectionData = jsonData[sectionKey];
      const { successCount, errorCount } = await processSection(sectionKey, sectionData);
      totalSuccess += successCount;
      totalErrors += errorCount;
    } catch (error) {
      console.log(`💥 Critical error processing section ${sectionKey}: ${error.message}`);
      totalErrors++;
    }
  }
  
  console.log('\n🎉 COMPLETION SUMMARY');
  console.log('====================');
  console.log(`✅ Total Success: ${totalSuccess}`);
  console.log(`❌ Total Errors: ${totalErrors}`);
  console.log(`📊 Success Rate: ${totalSuccess > 0 ? Math.round((totalSuccess / (totalSuccess + totalErrors)) * 100) : 0}%`);
  console.log(`📂 Documentation saved to: ${docsDir}`);
  
  // Create a summary report
  const summaryPath = path.join(docsDir, 'CRAWL_SUMMARY.md');
  const summaryContent = `# XRPL Documentation Crawl Summary

## Overview
This report summarizes the comprehensive crawl of XRPL documentation.

## Statistics
- **Total Sections Processed**: ${Object.keys(jsonData).length}
- **Successful Extractions**: ${totalSuccess}
- **Failed Extractions**: ${totalErrors}
- **Success Rate**: ${totalSuccess > 0 ? Math.round((totalSuccess / (totalSuccess + totalErrors)) * 100) : 0}%

## Section Details
${sortedSections.map(section => `- [${section}](./${section})`).join('\n')}

## Notes
- Each section contains Markdown files with comprehensive content extracted from XRPL documentation
- Error logs are available in respective section directories for failed extractions
- All content has been processed with full formatting preservation

---
Generated on: ${new Date().toISOString()}
Agent: Qoder + Playwright MCP
`;
  
  fs.writeFileSync(summaryPath, summaryContent);
  console.log(`📝 Summary report saved to: ${summaryPath}`);
}

// Check if a specific section should be processed
const targetSection = process.argv[2];

if (targetSection) {
  if (jsonData[targetSection]) {
    console.log(`🎯 Processing specific section: ${targetSection}`);
    processSection(targetSection, jsonData[targetSection])
      .then(() => {
        console.log(`🏁 Completed processing section: ${targetSection}`);
      })
      .catch((error) => {
        console.error(`💥 Error processing section ${targetSection}:`, error);
      });
  } else {
    console.log(`❓ Section ${targetSection} not found.`);
    console.log('Available sections:', Object.keys(jsonData).join(', '));
  }
} else {
  // Process all sections
  processAllSections()
    .then(() => {
      console.log('\n🎊 ALL SECTIONS PROCESSED SUCCESSFULLY');
    })
    .catch((error) => {
      console.error('💥 CRITICAL ERROR IN CRAWLING PROCESS:', error);
    });
}