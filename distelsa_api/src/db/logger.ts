import Log, { ILog } from '../models/logger.model';
import MongoConnection from './mongo';

interface LogOptions {
  type: 'error' | 'event';
  statusCode: number;
  message: string;
  path: string;
  params: string;
}

export const logToDatabase = async (options: LogOptions): Promise<void> => {
  try {
    await MongoConnection.getInstance(); // Asegura que la conexión esté establecida
    const newLog: ILog = new Log({
      type: options.type,
      statusCode: options.statusCode,
      message: options.message,
      timestamp: new Date(),
      path: options.path,
      params: options.params,

    });
    await newLog.save();
  } catch (error) {
    console.error('Error logging to database:', error);
  }
};
