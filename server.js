const express = require('express');
const WebSocket = require('ws');
const http = require('http');
 
const app = express();
 
const server = http.createServer(app);
 
const wss = new WebSocket.Server({ server });
 
wss.on('connection', (ws) => {
  console.log('New client connected');
   
  ws.send('Welcome to the chat server!');
   
  ws.on('message', (message) => {
    console.log('Received: %s', message); 
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
   
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
 
app.get('/', (req, res) => {
  res.send('Hello World! WebSocket server is running.');
});
 
server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
