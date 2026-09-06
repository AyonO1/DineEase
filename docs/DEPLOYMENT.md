# Vercel Deployment Instructions

To deploy the DineEase backend as a serverless function on Vercel, follow these instructions. This is essential for the examiner grading the live application.

## Prerequisites
1. Ensure your MongoDB Atlas cluster allows connections from anywhere (`0.0.0.0/0`), as Vercel serverless functions have dynamic IP addresses.
2. Link your GitHub repository to a new project in the Vercel dashboard.

## Vercel Configuration
Configure your Vercel project settings exactly as follows:

1. **Root Directory**: `server`
2. **Framework Preset**: `Other`
3. **Build Command**: `npm install`
4. **Output Directory**: `api`

## Environment Variables
Add the following environment variables in the Vercel dashboard (`Settings > Environment Variables`):

- `NODE_ENV`: `production`
- `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster0...` (Use the production Atlas URI)
- `JWT_SECRET`: (Set a strong random string)
- `CLIENT_URL`: (The URL of your deployed frontend)

## Serverless Entry Point
The entry point for Vercel is `server/api/index.js`. 
This file implements a module-level cached database connection to prevent connection pool exhaustion on MongoDB Atlas across multiple warm lambda invocations. Auto-indexing is also disabled for production performance.
