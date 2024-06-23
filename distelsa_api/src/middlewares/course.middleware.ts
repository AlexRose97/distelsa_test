import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import { RegexConstants } from '../utils/regexConstants';
import { Op, fn, col, where } from 'sequelize';
import Assignment from '../models/assignment.model';


export const validateInfoCourse = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, credits } = req.body;
    //required
    if (!name) {
        return res.status(400).json({ message: 'Name are required', error: 'Name are required' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Last_name are required', error: 'Last_name are required' });
    }
    if (!credits) {
        return res.status(400).json({ message: 'Email are required', error: 'Email are required' });
    }

    //Values
    if (!RegexConstants.ONLY_DIGITS.test(credits)) {
        return res.status(400).json({ message: 'Credits must be numerical', error: 'Credits must be numerical' });
    }
    if (Number(credits) >= 20) {
        return res.status(400).json({ message: 'Credits must be less than 20', error: 'Credits must be less than 20' });
    }

    //length
    if (String(name).length == 0 || String(name).length > 50) {
        return res.status(400).json({ message: 'Name must be between 1 and 50 characters', error: 'Name must be between 1 and 50 characters' });
    }
    if (String(description).length == 0 || String(description).length > 50) {
        return res.status(400).json({ message: 'description must be between 1 and 255 characters', error: 'description must be between 1 and 255 characters' });
    }
    return next();
};

export const checkCourseByName = async (req: Request, res: Response, next: NextFunction) => {
    const { name = "" } = req.body;
    const { id } = req.params;
    try {
        if (id) {
            const auxStudent = await Course.findByPk(id);
            if (String(auxStudent?.name).toUpperCase() === String(name).toUpperCase()) {
                return next();//update without changing DPI
            }
        }
        const course = await Course.findOne({
            where: where(fn('lower', col('NAME')), {
                [Op.eq]: name.toLowerCase()
            })
        });
        if (course) {
            return res.status(400).json({ message: 'There is already a registered course with that name', error: 'There is already a registered course with that name' });
        }
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: 'Internal server error' });
    }
};

export const checkAssignment = async (req: Request, res: Response, next: NextFunction) => {
    const { id: id_course } = req.params;
    try {
        const existingAssignment = await Assignment.findOne({ where: { id_course }, });

        if (existingAssignment) {
            // Si la asignación ya existe, devuelve un error 400
            return res.status(400).json({ message: 'Assignment already exists for this course', error: 'Assignment already exists for this course' });
        }
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: 'Internal server error' });
    }
};