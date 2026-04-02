import { env } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const isDev = env.NODE_ENV !== 'production';

  const body = {
    error: err.message || 'Internal Server Error',
    ...(err.details != null && { details: err.details }),
    ...(isDev && err.stack && { stack: err.stack }),
  };

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json(body);
}
