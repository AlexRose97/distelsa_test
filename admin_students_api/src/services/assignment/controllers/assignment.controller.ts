import { Request, Response } from 'express';
import Assignment from '../models/assignment.model';
import Student from '../../student/models/student.model';
import Course from '../../course/models/course.model';
import sequelize from 'sequelize';
import { sendResponse } from '../../../utils/responseHandler';
import { ResponseTypes } from '../../../utils/responseTypes';

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
    sendResponse(req, res, ResponseTypes.CREATED, { message: 'Assignment Add', data: assignment });
  } catch (error) {
    console.log(error);
    sendResponse(req, res, ResponseTypes.INTERNAL_SERVER_ERROR, { message: 'Internal server error', error });
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
      sendResponse(req, res, ResponseTypes.BAD_REQUEST, { message: 'Assignment not found', error: 'Assignment not found' });
      return;
    }
    sendResponse(req, res, ResponseTypes.OK, { message: 'ok', data: assignment });
  } catch (error) {
    sendResponse(req, res, ResponseTypes.INTERNAL_SERVER_ERROR, { message: 'Internal server error', error });
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
    sendResponse(req, res, ResponseTypes.OK, { message: 'ok', data: assignments });
  } catch (error) {
    console.log(error)
    sendResponse(req, res, ResponseTypes.INTERNAL_SERVER_ERROR, { message: 'Internal server error', error });
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
      sendResponse(req, res, ResponseTypes.BAD_REQUEST, { message: 'Assignment not found', error: "Assignment not found" });
      return;
    }
    assignment.status = String(status).toUpperCase();
    assignment.update_date = new Date();
    assignment.id_course = id_course;
    assignment.id_student = id_student;
    await assignment.save();
    sendResponse(req, res, ResponseTypes.OK, { message: 'Assignment Update', data: assignment });
  } catch (error) {
    sendResponse(req, res, ResponseTypes.INTERNAL_SERVER_ERROR, { message: 'Internal server error', error });
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
      sendResponse(req, res, ResponseTypes.BAD_REQUEST, { message: 'Assignment not found', error: 'Assignment not found' });
      return;
    }
    await assignment.destroy();
    sendResponse(req, res, ResponseTypes.OK, { message: 'Assignment deleted' });
  } catch (error) {
    sendResponse(req, res, ResponseTypes.INTERNAL_SERVER_ERROR, { message: 'Internal server error', error });
  }
};
