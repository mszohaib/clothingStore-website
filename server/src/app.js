import express from 'express';
import cors from 'cors';
import { getAllowedOrigins } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const allowedOrigins = getAllowedOrigins();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: '1mb' }));

app.use('/api/v1', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
