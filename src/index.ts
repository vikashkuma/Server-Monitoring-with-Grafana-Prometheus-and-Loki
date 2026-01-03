import express from 'express';
import client from 'prom-client';
import { observe } from './middleware/observe';
import { logger } from './utils/monitor';

const app = express();
app.use(observe);

// --- Lab Routes ---

app.get('/api/fast', (req, res) => res.status(200).send('Resolved Fast'));

app.get('/api/slow', async (req, res) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    res.status(200).send(`Resolved in ${delay}ms`);
});

app.get('/api/error', (req, res) => {
    res.status(500).send('Internal Server Error');
});

// --- Monitoring Endpoints ---

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.listen(3000, () => logger.info('Server monitoring active on port 3000'));