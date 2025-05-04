import express from 'express';
import { connectToDB } from './configs/database.js';
import appRouter from './routes/index.js';

const app = express();
const PORT = 8000;

//1. Middlewares
app.use(express.json());

//2. Define routings
app.use('/api', appRouter);

// Start the server after connecting to the database
const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });
};

startServer();
