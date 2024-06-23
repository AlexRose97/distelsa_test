import { Request, Response } from 'express';
import Assignment from '../models/assignment.model';
import Student from '../models/student.model';
import Course from '../models/course.model';
import sequelize from 'sequelize';

/**
 * @swagger
 * /assignment:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       201:
 *         description: The assignment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Some server error
 */
export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  const { id_student, id_course, status } = req.body;
  try {
    const assignment = await Assignment.create(
      {
        id_student,
        id_course,
        assignment_date: new Date(),
        update_date: new Date(),
        status: String(status).toUpperCase()
      }
    );
    res.status(201).json({ message: 'Assignment Add', data: assignment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /assignment/{id}:
 *   get:
 *     summary: Get a assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment id
 *     responses:
 *       200:
 *         description: The assignment description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: The assignment was not found
 *       500:
 *         description: Some server error
 */
export const getAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignment = await Assignment.findByPk(
      req.params.id,
      {
        attributes: [
          'id_assignment',
          'id_student',
          [sequelize.fn('CONCAT', sequelize.col('STUDENTS.NAME'), ' ', sequelize.col('STUDENTS.LAST_NAME')), 'student_name'],
          'id_course',
          [sequelize.col('COURSES.NAME'), 'course_name'],
          'status',
          'assignment_date',
          'update_date',
        ],
        include: [
          {
            model: Student,
            as: 'STUDENTS',
            attributes: [], // No seleccionar columnas adicionales de Student
          },
          {
            model: Course,
            as: 'COURSES',
            attributes: [], // No seleccionar columnas adicionales de Course
          },
        ],
      }
    );
    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found', error: 'Assignment not found' });
      return;
    }
    res.status(200).json({ message: 'ok', data: assignment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /assignment:
 *   get:
 *     summary: Returns the list of all the assignment
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: The list of the assignment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Some server error
 */
export const getAllAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignments = await Assignment.findAll(
      {
        attributes: [
          'id_assignment',
          'id_student',
          [sequelize.fn('CONCAT', sequelize.col('STUDENTS.NAME'), ' ', sequelize.col('STUDENTS.LAST_NAME')), 'student_name'],
          'id_course',
          [sequelize.col('COURSES.NAME'), 'course_name'],
          'status',
          'assignment_date',
          'update_date',
          [sequelize.col('STUDENTS.DPI'), 'student_dpi'],
        ],
        include: [
          {
            model: Student,
            as: 'STUDENTS',
            attributes: [], // No seleccionar columnas adicionales de Student
          },
          {
            model: Course,
            as: 'COURSES',
            attributes: [], // No seleccionar columnas adicionales de Course
          },
        ],
      }
    );
    res.status(200).json({ message: 'ok', data: assignments });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /assignment/{id}:
 *   put:
 *     summary: Update a assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: The assignment was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       404:
 *         description: The assignment was not found
 *       500:
 *         description: Some server error
 */
export const updateAssignment = async (req: Request, res: Response): Promise<void> => {
  const { status, id_course, id_student } = req.body;
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found', error: "Assignment not found" });
      return;
    }
    assignment.status = String(status).toUpperCase();
    assignment.update_date = new Date();
    assignment.id_course = id_course;
    assignment.id_student = id_student;
    await assignment.save();
    res.status(200).json({ message: 'Assignment Update', data: assignment });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /assignment/{id}:
 *   delete:
 *     summary: Remove the assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The assignment id
 *     responses:
 *       200:
 *         description: The assignment was deleted
 *       404:
 *         description: The assignment was not found
 *       500:
 *         description: Some server error
 */
export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      res.status(404).json({ message: 'Assignment not found', error: 'Assignment not found' });
      return;
    }
    await assignment.destroy();
    res.status(200).json({ message: 'Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
