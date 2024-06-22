import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes';
import MongoConnection from './db/mongo';

const app = express();

app.use(bodyParser.json());

(async () => {
  try {
    await MongoConnection.getInstance();
    console.log('MongoDB connected');
    app.use('/api/students', studentRoutes);

  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
})();

export default app;
