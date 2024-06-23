import { Request, Response } from 'express';
import Course from '../models/course.model';

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: The course was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 */
export const createCourse = async (req: Request, res: Response): Promise<void> => {
  const { name, description, credits } = req.body;
  try {
    const course = await Course.create({ name, description, credits });
    res.status(201).json({ message: 'ok', data: course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
export const getCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found', error: 'Course not found' });
      return;
    }
    res.status(200).json({ message: 'ok', data: course });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Returns the list of all the courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The list of the courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Some server error
 */
export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({ message: 'ok', data: courses });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The course was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  const { name, description, credits } = req.body;
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found', error: 'Course not found' });
      return;
    }
    course.name = name;
    course.description = description;
    course.credits = credits;
    await course.save();
    res.status(200).json({ message: 'Course Update', data: course });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove the course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course id
 *     responses:
 *       200:
 *         description: The course was deleted
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 */
export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      res.status(404).json({ message: 'Course not found', error: 'Course not found' });
      return;
    }
    await course.destroy();
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
