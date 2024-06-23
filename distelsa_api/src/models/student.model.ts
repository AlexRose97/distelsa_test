import { Model, DataTypes } from 'sequelize';
import OracleConnection from '../db/oracle';

const sequelize = OracleConnection.getInstance();

class Student extends Model {
  public id_student!: number;
  public name!: string;
  public dpi!: string;
  public last_name!: string;
  public email!: string;
}

Student.init(
  {
    id_student: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_STUDENT',//Column DB
    },
    dpi: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DPI',//Column DB
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME',//Column DB
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LAST_NAME',//Column DB
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'EMAIL',//Column DB
    },
  },
  {
    sequelize,
    modelName: 'Student',
    tableName: 'STUDENTS', //Table DB
    timestamps: false,
  }
);

export default Student;
