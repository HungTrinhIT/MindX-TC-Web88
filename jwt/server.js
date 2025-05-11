// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import appRouter from './routes/index.js';

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount Routers
app.use('/api', appRouter);

// Global Error Handler (simple example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || 'development'
    } mode on port ${PORT}`
  );
});
