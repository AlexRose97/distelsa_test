import { Router } from 'express';
import { createStudent, getStudent, updateStudent, deleteStudent, getAllStudents } from '../controllers/student.controller';
import { validateInfoStudent, checkStudentByDPI } from '../middlewares/student.middleware';

const router: Router = Router();

router.post('/', [validateInfoStudent, checkStudentByDPI], createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.put('/:id', validateInfoStudent, updateStudent);
router.delete('/:id', deleteStudent);

export default router;
