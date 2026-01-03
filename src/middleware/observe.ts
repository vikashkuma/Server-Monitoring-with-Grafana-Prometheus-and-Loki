import { Request, Response, NextFunction } from 'express';
import { metrics, logger } from '../utils/monitor';

export const observe = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on('finish', () => {
        const diff = process.hrtime(start);
        const duration = diff[0] + diff[1] / 1e9;
        const status = res.statusCode;

        // Record Metrics
        metrics.requestDuration.observe(
            { method: req.method, route: req.path, status_code: status },
            duration
        );
        metrics.requestCounter.inc({ 
            method: req.method, 
            route: req.path, 
            status_code: status 
        });

        // Structured Logging
        const logData = { method: req.method, path: req.path, status, duration };
        if (status >= 500) {
            logger.error('Request Failed', logData);
        } else {
            logger.info('Request Processed', logData);
        }
    });

    next();
};
