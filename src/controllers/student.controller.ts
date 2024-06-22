import { Request, Response } from 'express';
import Student from '../models/student.model';

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
 *         id:
 *           type: string
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
 *         id: d5fE_asz
 *         name: John
 *         last_name: Doe
 *         email: john.doe@example.com
 *         dpi: 1234567891234
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: The student was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 */
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, email, dpi } = req.body;
  try {
    const student = await Student.create({ name, last_name, email, dpi });
    res.status(201).json({ message: 'ok', data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The student was not found
 *       500:
 *         description: Some server error
 */
export const getStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.status(200).json({ message: 'ok', data: student });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Returns the list of all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 */
export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.findAll();
    res.status(200).json({ message: 'ok', data: students });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The student was not found
 *       500:
 *         description: Some server error
 */
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, email, dpi } = req.body;
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    student.name = name;
    student.last_name = last_name;
    student.email = email;
    student.dpi = dpi;
    await student.save();
    res.status(200).json({ message: 'ok', data: student });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Remove the student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student was deleted
 *       404:
 *         description: The student was not found
 *       500:
 *         description: Some server error
 */
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    await student.destroy();
    res.status(200).json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
