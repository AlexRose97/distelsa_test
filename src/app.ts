import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import studentRoutes from './routes/student.routes';
import courseRoutes from './routes/course.routes';
import MongoConnection from './db/mongo';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(bodyParser.json());

(async () => {
  try {
    await MongoConnection.getInstance();
    console.log('MongoDB connected');
    app.use('/api/students', studentRoutes);
    app.use('/api/courses', courseRoutes);
    setupSwagger(app);  // Configura Swagger
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
})();

export default app;
