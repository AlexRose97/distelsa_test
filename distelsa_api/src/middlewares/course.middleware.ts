import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import { RegexConstants } from '../utils/regexConstants';
import { Op, fn, col, where } from 'sequelize';


export const validateInfoCourse = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, credits } = req.body;
    //required
    if (!name) {
        return res.status(400).json({ message: 'Name are required' });
    }
    if (!description) {
        return res.status(400).json({ message: 'Last_name are required' });
    }
    if (!credits) {
        return res.status(400).json({ message: 'Email are required' });
    }

    //Values
    if (!RegexConstants.ONLY_DIGITS.test(credits)) {
        return res.status(400).json({ message: 'Credits must be numerical' });
    }
    if (Number(credits) >= 20) {
        return res.status(400).json({ message: 'Credits must be less than 20' });
    }

    //length
    if (String(name).length == 0 || String(name).length > 50) {
        return res.status(400).json({ message: 'Name must be between 1 and 50 characters' });
    }
    if (String(description).length == 0 || String(description).length > 50) {
        return res.status(400).json({ message: 'description must be between 1 and 255 characters' });
    }
    next();
};

export const checkCourseByName = async (req: Request, res: Response, next: NextFunction) => {
    const { name = "" } = req.body;
    try {
        const course = await Course.findOne({
            where: where(fn('lower', col('NAME')), {
                [Op.eq]: name.toLowerCase()
            })
        });
        if (course) {
            return res.status(400).json({ message: 'There is already a registered course with that name' });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};