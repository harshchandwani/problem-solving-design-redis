import express from 'express';
import { WebSocket, WebSocketServer } from 'ws';
import { createClient } from 'redis';

const app = express();
const httpServer = app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

const wss = new WebSocketServer({ server: httpServer });

// Redis Subscriber setup
const subscriber = createClient();

subscriber.connect().then(() => {
    console.log('Subscriber connected to Redis');

    // Subscribe to the Redis channel
    subscriber.subscribe('myChannel', (message) => {
        console.log(`Received message from Redis: ${message}`);

        // Broadcast the message to all connected WebSocket clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Message from Redis: ${message}`);
            }
        });
    });
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');

    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        console.log(`Received message from client: ${data}`);

        // Echo back the received message to all WebSocket clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.send('Hello! You are connected to the WebSocket server.');
});
