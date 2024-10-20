import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServer } from 'http';

// Initialize express app
const app = express();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecretkey', // Use environment variable in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
    },
  })
);

// Middleware to handle Next.js requests and responses
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    req.session.views = (req.session.views || 0) + 1; // Increment the views count for the session
    next(); // Continue to next middleware or route handler
  } else {
    res.status(500).json({ message: 'Session not initialized' });
  }
});

// Create a route to handle your API endpoint
app.get('/api/session', (req: Request, res: Response) => {
  res.json({
    message: `You have visited this page ${req.session?.views} times`,
  });
});

// Export the handler function for Next.js API routes
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const server = createServer(app);
  server.emit('request', req, res);
}
