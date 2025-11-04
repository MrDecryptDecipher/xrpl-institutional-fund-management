const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/api-test.html') {
    fs.readFile(path.join(__dirname, 'api-test.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8000, '0.0.0.0', () => {
  console.log('Test frontend server running at http://0.0.0.0:8000/');
});