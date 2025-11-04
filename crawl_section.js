import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { setTimeout } from 'timers/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract content from page
async function extractPageContent(page) {
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Auto-scroll to bottom to load all content
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
  
  // Wait a bit more for any dynamic content
  await setTimeout(2000);
  
  // Extract title
  let title = '';
  try {
    title = await page.textContent('h1');
  } catch (error) {
    title = 'Untitled';
  }
  
  // Extract main content using a more comprehensive approach
  let content = '';
  try {
    // Get the main content area (usually in a div with class or ID containing "content")
    const contentSelector = 'main, .content, #content, .main-content, article, .docs-content';
    const contentElement = await page.$(contentSelector) || await page.$('body');
    
    if (contentElement) {
      // Extract all relevant elements
      const elements = await contentElement.$$('h1, h2, h3, h4, h5, h6, p, pre, code, ul, ol, table, div.highlight, .code-block');
      
      for (const element of elements) {
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        const textContent = await element.textContent();
        
        if (!textContent?.trim()) continue;
        
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
          content += `\n##${'#'.repeat(parseInt(tagName[1]) - 1)} ${textContent.trim()}\n\n`;
        } else if (tagName === 'p') {
          content += `${textContent.trim()}\n\n`;
        } else if (tagName === 'pre' || tagName === 'code') {
          // Handle code blocks
          const codeContent = await element.textContent();
          const isBlock = tagName === 'pre' || await element.evaluate(el => el.classList.contains('code-block') || el.classList.contains('highlight'));
          
          if (isBlock) {
            content += `\`\`\`
${codeContent.trim()}
\`\`\`

`;
          } else {
            content += `\`${codeContent.trim()}\`\n\n`;
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          // Handle lists
          const listItems = await element.$$('li');
          for (const item of listItems) {
            const itemText = await item.textContent();
            if (itemText?.trim()) {
              content += `- ${itemText.trim()}\n`;
            }
          }
          content += '\n';
        } else if (tagName === 'table') {
          // Handle tables (simplified)
          content += '[Table content - see original page for full table]\n\n';
        }
      }
    }
  } catch (error) {
    console.log(`Error extracting content: ${error.message}`);
    // Fallback: try to get all text content
    try {
      content = await page.textContent('body');
      content = content.substring(0, 2000) + '... (truncated)';
    } catch (fallbackError) {
      content = 'Content extraction failed';
    }
  }
  
  // Extract outbound links
  let outboundLinks = '';
  try {
    const links = await page.$$('a[href]');
    const internalLinks = [];
    const externalLinks = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const linkText = await link.textContent();
      
      if (href) {
        if (href.startsWith('http') && href.includes('xrpl.org')) {
          internalLinks.push(`- [${linkText?.trim() || href}](${href})`);
        } else if (href.startsWith('http')) {
          externalLinks.push(`- [${linkText?.trim() || href}](${href})`);
        }
      }
    }
    
    if (internalLinks.length > 0) {
      outboundLinks += '## Internal XRPL References\n\n';
      outboundLinks += internalLinks.slice(0, 20).join('\n') + '\n\n'; // Limit to 20 links
    }
    
    if (externalLinks.length > 0) {
      outboundLinks += '## External References\n\n';
      outboundLinks += externalLinks.slice(0, 20).join('\n') + '\n\n'; // Limit to 20 links
    }
  } catch (error) {
    console.log(`Error extracting links: ${error.message}`);
  }
  
  return {
    title: title || 'Untitled',
    content: content || 'No content extracted',
    outboundLinks: outboundLinks || 'No outbound links found'
  };
}

// Function to create error log
function createErrorLog(section, number, url, error, retries) {
  const docsDir = path.join(__dirname, 'docs', 'XRPL');
  const errorDir = path.join(docsDir, section);
  if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir, { recursive: true });
  }
  
  const errorLogPath = path.join(errorDir, `${number}_error.log`);
  const errorContent = `
URL: ${url}
Error: ${error.message}
Timestamp: ${new Date().toISOString()}
Retry attempts: ${retries}
  `;
  
  fs.writeFileSync(errorLogPath, errorContent);
  console.log(`Error logged for ${section}/${number}: ${error.message}`);
}

// Function to generate filename from URL
function generateFilename(url) {
  // Extract the last part of the URL path
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
    
    // If filename is empty or just 'docs', use the second to last part
    if (!filename || filename === 'docs') {
      filename = parts[parts.length - 2] || 'index';
    }
    
    // Handle special case for root URLs
    if (!filename) {
      filename = 'index';
    }
    
    // Replace special characters and limit length
    filename = filename.replace(/[^a-zA-Z0-9-_]/g, '-');
    if (filename.length > 50) {
      filename = filename.substring(0, 50);
    }
    
    // Ensure filename is not empty
    if (!filename) {
      filename = 'document';
    }
    
    return filename;
  } catch (error) {
    return 'document';
  }
}

// Function to crawl a single URL
async function crawlUrl(section, number, url) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  
  let retries = 0;
  const maxRetries = 3;
  
  while (retries < maxRetries) {
    try {
      const page = await context.newPage();
      
      console.log(`Crawling ${section}/${number}: ${url} (attempt ${retries + 1})`);
      
      // Set viewport size
      await page.setViewportSize({ width: 1280, height: 720 });
      
      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Extract content
      const { title, content, outboundLinks } = await extractPageContent(page);
      
      // Generate filename
      const filename = generateFilename(url);
      
      // Create docs directory structure
      const docsDir = path.join(__dirname, 'docs', 'XRPL');
      const sectionDir = path.join(docsDir, section);
      if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
      }
      
      // Create Markdown content
      const markdownContent = `# ${title}
URL: ${url}
Section: ${section}${number}

## Overview
${title}

## Extracted Content
${content}

## Outbound References
${outboundLinks}
---
Crawled on: ${new Date().toISOString()}
Agent: Qoder + Playwright MCP
Retries: ${retries}
Status: SUCCESS
`;
      
      // Save to file
      const filePath = path.join(sectionDir, `${number}_${filename}.md`);
      fs.writeFileSync(filePath, markdownContent);
      
      console.log(`Successfully crawled ${section}/${number}: ${url}`);
      
      await page.close();
      await context.close();
      await browser.close();
      
      // Add random delay between requests
      const delay = 2000 + Math.random() * 4000; // 2-6 seconds
      await setTimeout(delay);
      
      return true;
    } catch (error) {
      retries++;
      console.log(`Error crawling ${section}/${number}: ${url} (attempt ${retries})`);
      console.log(`Error: ${error.message}`);
      
      if (retries >= maxRetries) {
        await context.close();
        await browser.close();
        createErrorLog(section, number, url, error, retries);
        return false;
      }
      
      // Wait before retrying
      await setTimeout(5000 * retries); // Exponential backoff
    }
  }
}

// Function to process a section
async function processSection(section, sectionData) {
  console.log(`Processing section: ${section}`);
  
  // Create section directory
  const docsDir = path.join(__dirname, 'docs', 'XRPL');
  const sectionDir = path.join(docsDir, section);
  if (!fs.existsSync(sectionDir)) {
    fs.mkdirSync(sectionDir, { recursive: true });
  }
  
  // Process entries if they exist
  if (sectionData.entries) {
    // Process each entry in the section
    for (const [number, url] of Object.entries(sectionData.entries)) {
      try {
        await crawlUrl(section, number, url);
      } catch (error) {
        console.log(`Failed to crawl ${section}/${number}: ${error.message}`);
        createErrorLog(section, number, url, error, 0);
      }
    }
  } else if (sectionData.url) {
    // Process single URL for sections without entries
    try {
      await crawlUrl(section, '', sectionData.url);
    } catch (error) {
      console.log(`Failed to crawl ${section}: ${error.message}`);
      createErrorLog(section, '', sectionData.url, error, 0);
    }
  }
}

// Export functions
export { processSection, crawlUrl };