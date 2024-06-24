import { Request, Response } from 'express';
import Log, { ILog } from '../models/logger.model';

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs: ILog[] = await Log.find().sort({ timestamp: -1 }).exec();
    res.status(200).json({ message: 'Logs retrieved successfully', data: logs });
  } catch (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).json({ message: 'Failed to retrieve logs', error });
  }
};
