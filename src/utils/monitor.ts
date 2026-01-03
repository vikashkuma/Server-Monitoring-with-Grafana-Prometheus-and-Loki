import client from 'prom-client';
import winston from 'winston';
import LokiTransport from 'winston-loki';

// Initialize default metrics (CPU, Memory, Event Loop Lag)
client.collectDefaultMetrics({ register: client.register });

// 1. Production-Grade Logger (Loki + Console)
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        }),
        new LokiTransport({
            host: 'http://loki:3100',
            labels: { app: 'monitoring-lab' },
            replaceTimestamp: true,
        })
    ]
});

// 2. RED Method Metrics
export const metrics = {
    requestDuration: new client.Histogram({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['method', 'route', 'status_code'],
        buckets: [0.1, 0.5, 1, 2, 5] // Strategic buckets for latency analysis
    }),
    requestCounter: new client.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status_code']
    })
};
