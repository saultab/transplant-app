'use strict';

/**
 * Centralized error handling middleware.
 * Avoids leaking sensitive information in production.
 */
function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message || 'Internal server error';

  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
}

module.exports = { errorHandler, notFound };
