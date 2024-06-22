// En student.model.ts
import { Model, DataTypes } from 'sequelize';
import OracleConnection from '../db/oracle'; // Ajusta la ruta según sea necesario

const sequelize = OracleConnection.getInstance();

class Student extends Model {
  public id_student!: number;
  public name!: string;
  public last_name!: string;
  public email!: string;
}

Student.init(
  {
    id_student: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_STUDENT', // Nombre del campo en la base de datos
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME', // Nombre del campo en la base de datos
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'LAST_NAME', // Nombre del campo en la base de datos
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'EMAIL', // Nombre del campo en la base de datos
    },
  },
  {
    sequelize,
    modelName: 'Student',
    tableName: 'STUDENTS', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no tienes campos de timestamps en la tabla
  }
);

export default Student;
