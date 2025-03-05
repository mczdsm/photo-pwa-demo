console.log('Server script is starting...');

const express = require('express');
console.log('Express module loaded');

const app = express();
const port = 3131;

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post('/upload', (req, res) => {
  res.send('Upload endpoint hit!');
});

console.log('About to start listening on port', port);
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

console.log('Server startup sequence completed');
