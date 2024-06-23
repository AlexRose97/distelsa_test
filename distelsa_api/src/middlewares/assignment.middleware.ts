import { Request, Response, NextFunction } from 'express';
import Assignment from '../models/assignment.model';
import { RegexConstants } from '../utils/regexConstants';


export const validateInfoAssignment = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_course, id_student, status } = req.body;
        //required
        if (!id_course) {
            return res.status(400).json({ message: 'Course are required', error: 'Course are required' });
        }
        if (!id_student) {
            return res.status(400).json({ message: 'Student are required', error: 'Student are required' });
        }
        if (!status) {
            return res.status(400).json({ message: 'Status are required', error: 'Status are required' });
        }

        //values
        if (!['PENDIENTE', 'APROBADO', 'RECHAZADO', 'ANULADO'].includes(String(status).toUpperCase())) {
            return res.status(400).json({ message: 'Status incorrect value', error: 'Status incorrect value' });
        }
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: 'Internal server error' });
    }
};

export const checkAssignmentStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { id_student, id_course } = req.body;
        if (id) {
            const auxAssignment = await Assignment.findByPk(id);
            if (String(auxAssignment?.id_student) === String(id_student) && String(auxAssignment?.id_course) === String(id_course)) {
                return next();//update assignment
            }
        }
        const user = await Assignment.findOne({ where: { id_student: id_student, id_course: id_course } });
        if (user) {
            return res.status(400).json({ message: 'There is already an assignment registered  for this student', error: 'There is already an assignment registered  for this student' });
        }
        return next();//create assignment
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: 'Internal server error' });
    }
};