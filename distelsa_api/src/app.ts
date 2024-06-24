// app.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import studentRoutes from './services/student/student.routes';
import courseRoutes from './services/course/course.routes';
import assignmentRoutes from './services/assignment/assignment.routes';
import logRoutes from './services/logger/logger.routes';
import MongoConnection from './db/mongo';
import { setupSwagger } from './config/swagger';

const app = express();

// Configurar CORS
app.use(cors({
  origin: '*',  // Permitir solo solicitudes desde este dominio
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],       // Permitir solo estos métodos HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir solo estos encabezados
}));

app.use(bodyParser.json());

(async () => {
  try {
    await MongoConnection.getInstance();
    console.log('MongoDB connected');
    app.use('/api/students', studentRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/assignments', assignmentRoutes);
    app.use('/api/logs', logRoutes);
    setupSwagger(app);  // Configura Swagger
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
})();

export default app;
