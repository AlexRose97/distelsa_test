import { Request, Response, NextFunction } from 'express';
import Student from '../models/student.model';

export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
    const { name, last_name, email } = req.body;
    if (!name || !last_name|| !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    next();
};

export const checkStudentExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id_student } = req.body;
    const user = await Student.findOne({ where: { id_student: id_student } });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    next();
};
