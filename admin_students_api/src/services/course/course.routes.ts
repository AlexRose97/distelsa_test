import { Router } from 'express';
import { createCourse, getAllCourses, getCourse, updateCourse, deleteCourse } from './controllers/course.controller';
import { validateInfoCourse, checkCourseByName, checkAssignment } from './middlewares/course.middleware';

const router: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - credits
 *       properties:
 *         id_course:
 *           type: number
 *           description: The auto-generated id of the course
 *         name:
 *           type: string
 *           description: The name of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         credits:
 *           type: number
 *           description: The credits of the course
 *       example:
 *         id_course: 1
 *         name: Mate1
 *         description: applied mathematics
 *         credits: 10
 */
router.post('/', [validateInfoCourse, checkCourseByName], createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourse);
router.put('/:id', [validateInfoCourse, checkCourseByName], updateCourse);
router.delete('/:id', [checkAssignment], deleteCourse);

export default router;
