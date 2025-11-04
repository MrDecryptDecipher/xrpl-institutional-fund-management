module.exports = {
  stylesheet: [
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
  ],
  css: `
    .page-break { page-break-after: always; }
    .markdown-body { font-size: 11px; max-width: 100%; padding: 20px; }
    .markdown-body h1 { font-size: 24px; margin-top: 24px; margin-bottom: 16px; border-bottom: 2px solid #eaecef; padding-bottom: 8px; }
    .markdown-body h2 { font-size: 20px; margin-top: 24px; margin-bottom: 16px; border-bottom: 1px solid #eaecef; padding-bottom: 8px; }
    .markdown-body h3 { font-size: 18px; margin-top: 16px; margin-bottom: 8px; }
    .markdown-body h4 { font-size: 16px; margin-top: 16px; margin-bottom: 8px; }
    .markdown-body table { font-size: 10px; width: 100%; border-collapse: collapse; margin: 16px 0; }
    .markdown-body table th, .markdown-body table td { padding: 6px 13px; border: 1px solid #dfe2e5; }
    .markdown-body table th { background-color: #f6f8fa; font-weight: 600; }
    .markdown-body code { font-size: 9px; background-color: #f6f8fa; padding: 2px 4px; border-radius: 3px; }
    .markdown-body pre { font-size: 9px; background-color: #f6f8fa; padding: 16px; overflow-x: auto; border-radius: 6px; }
    .markdown-body blockquote { padding: 0 1em; color: #6a737d; border-left: 0.25em solid #dfe2e5; }
    .markdown-body img { max-width: 100%; }
    .mermaid { text-align: center; margin: 20px 0; }
    .mermaid svg { max-width: 100%; height: auto; }
  `,
  body_class: 'markdown-body',
  marked_options: {
    headerIds: true,
    smartLists: true,
    smartypants: true,
  },
  pdf_options: {
    format: 'A4',
    margin: {
      top: '25mm',
      right: '20mm',
      bottom: '25mm',
      left: '20mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 5px 0;">
        <span>XRPL Institutional Fund Management Protocol - Comprehensive Analysis</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 9px; width: 100%; text-align: center; color: #666; padding: 5px 0;">
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span> | Prepared by Sandeep Kumar Sahoo | October 2025</span>
      </div>
    `
  },
  launch_options: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

