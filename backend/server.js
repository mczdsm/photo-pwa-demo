console.log('Server script is starting...');

const express = require('express');
console.log('Express module loaded');
const cors = require('cors');
console.log('CORS module loaded');


const app = express();
const port = 3131;

app.use(cors());
console.log('CORS middleware enabled');


app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.post('/upload', (req, res) => {
  console.log('Upload endpoint hit!'); // Log when endpoint is hit

  // Simulate some processing (replace with actual logic later)
  setTimeout(() => {
    console.log('Simulated upload processing complete'); // Log after "processing"
    res.send('Photo uploaded successfully!');
  }, 1000); // Simulate 1 second processing delay

  console.log('Upload endpoint logic executed'); // Log immediately after endpoint logic
});

console.log('About to start listening on port', port);
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

console.log('Server startup sequence completed');
