import { Model, DataTypes } from 'sequelize';
import OracleConnection from '../../../db/oracle';
import Student from '../../student/models/student.model';
import Course from '../../course/models/course.model';

const sequelize = OracleConnection.getInstance();

class Assignment extends Model {
  public id_assignment!: number;
  public id_student!: number;
  public id_course!: number;
  public status!: string;
  public assignment_date!: Date;
  public update_date!: Date;
}

Assignment.init(
  {
    id_assignment: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_ASSIGNMENT',//Column DB
    },
    id_student: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_STUDENT',//Column DB
    },
    id_course: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ID_COURSE',//Column DB
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'STATUS',//Column DB
    },
    assignment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'ASSIGNMENT_DATE',//Column DB
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'UPDATE_DATE',//Column DB
    },
  },
  {
    sequelize,
    modelName: 'Assignment',
    tableName: 'ASSIGNMENTS', //Table DB
    timestamps: true,
    createdAt: 'assignment_date', // Configurar la columna para createdAt
    updatedAt: 'update_date', // Configurar la columna para updatedAt
  }
);

Assignment.belongsTo(Student, { foreignKey: 'id_student', as: 'STUDENTS' });
Assignment.belongsTo(Course, { foreignKey: 'id_course', as: 'COURSES' });

export default Assignment;
