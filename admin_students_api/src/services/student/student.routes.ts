import { Router } from 'express';
import { createStudent, getStudent, updateStudent, deleteStudent, getAllStudents } from './controllers/student.controller';
import { validateInfoStudent, checkStudentByDPI, checkAssignment } from './middlewares/student.middleware';

const router: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - last_name
 *         - email
 *         - dpi
 *       properties:
 *         id_student:
 *           type: number
 *           description: The auto-generated id of the student
 *         name:
 *           type: string
 *           description: The name of the student
 *         last_name:
 *           type: string
 *           description: The last name of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *         dpi:
 *           type: string
 *           description: The DPI of the student
 *       example:
 *         id_student: 1
 *         name: test
 *         last_name: test
 *         email: test@email.com
 *         dpi: 1234567891234
 */
router.post('/', [validateInfoStudent, checkStudentByDPI], createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.put('/:id', [validateInfoStudent, checkStudentByDPI], updateStudent);
router.delete('/:id',[checkAssignment], deleteStudent);

export default router;
