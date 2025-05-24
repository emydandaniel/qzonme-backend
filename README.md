# QZonMe Backend

This is the backend server for QZonMe, built with Express.js and TypeScript.

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment to Render

1. Create a GitHub repository and push your code
2. Sign up for a Render account at https://render.com
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables (add all from .env)
6. Deploy your application

## Directory Structure

- `src/` - Source code
  - `routes/` - API routes
  - `controllers/` - Route controllers
  - `models/` - Database models
  - `middleware/` - Express middleware
  - `config/` - Configuration files
- `dist/` - Production build output 