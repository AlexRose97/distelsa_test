import express from 'express';
import { getLogs } from './controllers/logger.controller';

const router = express.Router();

router.get('/', getLogs);

export default router;
