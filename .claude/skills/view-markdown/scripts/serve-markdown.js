#!/usr/bin/env node
// Serves a markdown file as styled, dark GitHub-theme HTML over HTTP so it
// can be opened in a browser tab. Re-reads the file on every request, so a
// browser reload always reflects the latest saved content.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.VIEW_MARKDOWN_PORT || 9090;
const mdArg = process.argv[2];

if (!mdArg) {
    console.error('Usage: node serve-markdown.js <path-to-markdown-file>');
    process.exit(1);
}

const mdPath = path.resolve(mdArg);
if (!fs.existsSync(mdPath)) {
    console.error(`File not found: ${mdPath}`);
    process.exit(1);
}

let marked;
try {
    ({ marked } = require('marked'));
} catch (err) {
    console.error('Could not load the "marked" package. Run `npm install` in the repo root first.');
    process.exit(1);
}

const title = path.basename(mdPath);

const server = http.createServer((req, res) => {
    if (req.url !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
    }

    fs.readFile(mdPath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading markdown file');
            return;
        }

        const html = marked.parse(data);
        const page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem;
            background: #0d1117;
            color: #c9d1d9;
            line-height: 1.6;
        }
        h1, h2, h3, h4 { color: #e6edf3; }
        h1 { border-bottom: 1px solid #30363d; padding-bottom: 0.5rem; }
        h2 { border-bottom: 1px solid #21262d; padding-bottom: 0.3rem; margin-top: 2rem; }
        h3 { color: #58a6ff; }
        a { color: #58a6ff; text-decoration: none; }
        a:hover { text-decoration: underline; }
        code {
            background: #161b22;
            padding: 0.2em 0.4em;
            border-radius: 4px;
            font-size: 0.9em;
            font-family: 'SF Mono', Monaco, monospace;
        }
        pre {
            background: #161b22;
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            border: 1px solid #30363d;
        }
        pre code { background: none; padding: 0; }
        hr { border: none; border-top: 1px solid #30363d; margin: 2rem 0; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #30363d; padding: 8px 12px; text-align: left; }
        th { background: #161b22; font-weight: 600; }
        ul { padding-left: 1.5rem; }
        li { margin: 0.25rem 0; }
        blockquote {
            border-left: 3px solid #30363d;
            padding-left: 1rem;
            color: #8b949e;
            margin-left: 0;
        }
        strong { color: #e6edf3; font-weight: 600; }
        input[type="checkbox"] { margin-right: 0.5rem; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(page);
    });
});

server.listen(PORT, () => {
    console.log(`Serving ${title} at http://localhost:${PORT}/`);
});
