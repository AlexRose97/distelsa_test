import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  type: 'error' | 'event';
  message: string;
  timestamp: Date;
  statusCode: number;
  path: string;
  params: string;
}

const LogSchema: Schema = new Schema({
  type: { type: String, required: true, enum: ['error', 'event'] },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  statusCode: { type: String },
  path: { type: String },
  params: { type: String },
});

export default mongoose.model<ILog>('Log', LogSchema);
