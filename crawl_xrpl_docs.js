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

// Function to extract text content from element
async function extractTextContent(page, selector) {
  try {
    return await page.$eval(selector, el => el.textContent.trim());
  } catch (error) {
    return '';
  }
}

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
  const title = await extractTextContent(page, 'h1');
  
  // Extract main content
  let content = '';
  
  // Get all headings and their following content
  const headings = await page.$$('h1, h2, h3, h4, h5, h6');
  for (const heading of headings) {
    const headingText = await heading.textContent();
    const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
    
    content += `${tagName} ${headingText}\n\n`;
    
    // Get content until next heading
    const nextHeading = await heading.evaluateHandle(el => {
      const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      let next = el.nextElementSibling;
      while (next) {
        if (headings.includes(next.tagName)) {
          return next;
        }
        next = next.nextElementSibling;
      }
      return null;
    });
    
    // Extract content between this heading and the next
    let currentElement = await heading.evaluateHandle(el => el.nextElementSibling);
    while (currentElement && !(await currentElement.evaluate(el => ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el?.tagName)))) {
      if (await currentElement.evaluate(el => el)) {
        const tagName = await currentElement.evaluate(el => el.tagName.toLowerCase());
        const textContent = await currentElement.evaluate(el => el.textContent?.trim() || '');
        
        if (tagName === 'p' && textContent) {
          content += `${textContent}\n\n`;
        } else if (tagName === 'pre') {
          // Handle code blocks
          const codeContent = await currentElement.textContent();
          content += `\`\`\`
${codeContent}
\`\`\`

`;
        } else if (tagName === 'ul' || tagName === 'ol') {
          // Handle lists
          const listItems = await currentElement.$$('li');
          for (const item of listItems) {
            const itemText = await item.textContent();
            content += `- ${itemText}\n`;
          }
          content += '\n';
        } else if (tagName === 'table') {
          // Handle tables (simplified)
          content += '[Table content - see original page for full table]\n\n';
        }
      }
      
      currentElement = await currentElement.evaluateHandle(el => el?.nextElementSibling);
    }
  }
  
  // Extract outbound links
  let outboundLinks = '';
  const links = await page.$$('a[href]');
  const internalLinks = [];
  const externalLinks = [];
  
  for (const link of links) {
    const href = await link.getAttribute('href');
    const linkText = await link.textContent();
    
    if (href) {
      if (href.startsWith('http') && href.includes('xrpl.org')) {
        internalLinks.push(`- [${linkText}](${href})`);
      } else if (href.startsWith('http')) {
        externalLinks.push(`- [${linkText}](${href})`);
      }
    }
  }
  
  if (internalLinks.length > 0) {
    outboundLinks += '### Internal XRPL References\n\n';
    outboundLinks += internalLinks.join('\n') + '\n\n';
  }
  
  if (externalLinks.length > 0) {
    outboundLinks += '### External References\n\n';
    outboundLinks += externalLinks.join('\n') + '\n\n';
  }
  
  return {
    title,
    content,
    outboundLinks
  };
}

// Function to create error log
function createErrorLog(section, number, url, error, retries) {
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
  
  // Replace special characters and limit length
  filename = filename.replace(/[^a-zA-Z0-9-_]/g, '-');
  if (filename.length > 50) {
    filename = filename.substring(0, 50);
  }
  
  return filename;
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
      
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      const { title, content, outboundLinks } = await extractPageContent(page);
      
      // Generate filename
      const filename = generateFilename(url);
      
      // Create section directory if it doesn't exist
      const sectionDir = path.join(docsDir, section);
      if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
      }
      
      // Create Markdown content
      const markdownContent = `# ${title || 'Untitled'}
URL: ${url}
Section: ${section}${number}

## Overview
This document contains information extracted from the XRPL documentation.

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

// Main function to crawl all URLs
async function crawlAllUrls() {
  console.log('Starting XRPL documentation crawl...');
  
  // Process each section
  for (const [section, sectionData] of Object.entries(jsonData)) {
    console.log(`Processing section: ${section}`);
    
    // Process main section URL if it has entries
    if (sectionData.entries) {
      // Process each entry in the section
      for (const [number, url] of Object.entries(sectionData.entries)) {
        try {
          await crawlUrl(section, number, url);
        } catch (error) {
          console.log(`Failed to crawl ${section}/${number}: ${error.message}`);
        }
      }
    } else if (sectionData.url) {
      // Process single URL for sections without entries
      try {
        await crawlUrl(section, '', sectionData.url);
      } catch (error) {
        console.log(`Failed to crawl ${section}: ${error.message}`);
      }
    }
  }
  
  console.log('XRPL documentation crawl completed!');
}

// Run the crawler
crawlAllUrls().catch(console.error);