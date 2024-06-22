import { Request, Response } from 'express';
import Student from '../models/student.model';

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, email } = req.body;
  try {
    const student = await Student.create({ name, last_name, email });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};
export const getAllStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    student.name = name;
    student.email = email;
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

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
