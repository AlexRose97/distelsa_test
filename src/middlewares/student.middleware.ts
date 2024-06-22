import { Request, Response, NextFunction } from 'express';
import Student from '../models/student.model';
import { RegexConstants } from '../utils/regexConstants';


export const validateInfoStudent = (req: Request, res: Response, next: NextFunction) => {
    const { name, last_name, email, dpi } = req.body;
    //required
    if (!name) {
        return res.status(400).json({ message: 'Name are required' });
    }
    if (!last_name) {
        return res.status(400).json({ message: 'Last_name are required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email are required' });
    }
    if (!dpi) {
        return res.status(400).json({ message: 'DPI are required' });
    }

    //Values
    if (!RegexConstants.EMAIL.test(email)) {
        return res.status(400).json({ message: 'Incorrect email format' });
    }
    if (!RegexConstants.ONLY_DIGITS.test(dpi)) {
        return res.status(400).json({ message: 'DPI accepts only digits' });
    }

    //length
    if (String(name).length == 0 || String(name).length > 50) {
        return res.status(400).json({ message: 'Name must be between 1 and 50 characters' });
    }
    if (String(last_name).length == 0 || String(last_name).length > 50) {
        return res.status(400).json({ message: 'Last_name must be between 1 and 50 characters' });
    }
    if (String(email).length == 0 || String(email).length > 100) {
        return res.status(400).json({ message: 'Email must be between 1 and 100 characters' });
    }
    if (String(dpi).length !== 13) {
        return res.status(400).json({ message: 'DPI must be 13 characters' });
    }
    next();
};

export const checkStudentByDPI = async (req: Request, res: Response, next: NextFunction) => {
    const { dpi } = req.body;
    const user = await Student.findOne({ where: { dpi: dpi } });
    if (user) {
        return res.status(400).json({ message: 'There is already a registered user with that dpi' });
    }
    next();
};