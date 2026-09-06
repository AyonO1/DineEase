import mongoose from 'mongoose';
import { createApp } from '../src/app.js';
import { env } from '../src/config/env.js';

// Vercel serverless entry point
// Cache the connection promise at the module level so warm lambda invocations
// reuse the same connection pool, preventing connection exhaustion on Atlas.
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  
  // autoIndex: false is recommended for production/serverless
  cachedDb = mongoose.connect(env.mongoUri, {
    autoIndex: false,
  });
  
  return cachedDb;
}

const app = createApp();

export default async function handler(req, res) {
  // Await the database connection before letting Express handle the route
  await connectToDatabase();
  
  // Delegate the request/response to the configured Express app
  return app(req, res);
}
