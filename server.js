import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('✅ Client connected');

  const sendRandomData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      value: parseFloat((Math.random() * 100).toFixed(2))
    };
    ws.send(JSON.stringify(data));
    console.log('📡 Sent:', data);
  };

  const interval = setInterval(sendRandomData, 10000);

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clearInterval(interval);
  });
});

app.get('/', (req, res) => {
  res.send('⚡ Energy Streaming Server is running...');
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
