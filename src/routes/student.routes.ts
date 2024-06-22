import { Router } from 'express';
import { createStudent, getStudent, updateStudent, deleteStudent, getAllStudent } from '../controllers/student.controller';
import { validateStudent } from '../middlewares/student.middleware';

const router: Router = Router();

router.post('/students', validateStudent, createStudent);
router.get('/students', getAllStudent);
router.get('/students/:id', getStudent);
router.put('/students/:id', validateStudent, updateStudent);
router.delete('/students/:id', deleteStudent);

export default router;
