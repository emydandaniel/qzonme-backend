import express from 'express';
import { registerRoutes } from './routes';
import { pool } from './db';

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON
app.use(express.json());

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

(async () => {
  try {
    // Test database connection
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();

    // Register application routes
    await registerRoutes(app);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
})();
