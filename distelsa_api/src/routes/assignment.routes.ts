import { Router } from 'express';
import { createAssignment, getAssignment, updateAssignment, deleteAssignment, getAllAssignments } from '../controllers/assignment.controller';
import { validateInfoAssignment, checkAssignmentStudent } from '../middlewares/assignment.middleware';

const router: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       required:
 *         - name
 *         - last_name
 *         - email
 *         - dpi
 *       properties:
 *         id_assignment:
 *           type: number
 *           description: The auto-generated id of the assignment
 *         name:
 *           type: string
 *           description: The name of the assignment
 *         last_name:
 *           type: string
 *           description: The last name of the assignment
 *         email:
 *           type: string
 *           description: The email of the assignment
 *         dpi:
 *           type: string
 *           description: The DPI of the assignment
 *       example:
 *         id_assignment: 1
 *         name: test
 *         last_name: test
 *         email: test@email.com
 *         dpi: 1234567891234
 */
router.post('/', [validateInfoAssignment, checkAssignmentStudent], createAssignment);
router.get('/', getAllAssignments);
router.get('/:id', getAssignment);
router.put('/:id', [validateInfoAssignment, checkAssignmentStudent], updateAssignment);
router.delete('/:id', deleteAssignment);

export default router;
