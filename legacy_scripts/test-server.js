import express from 'express';

const app = express();
const port = 3002;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

console.log(`About to start server on port ${port}`);
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Test server running at http://127.0.0.1:${port}`);
  console.log(`Server address: ${JSON.stringify(server.address())}`);
});
console.log('Server listen call completed');