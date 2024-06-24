import { Model, DataTypes } from 'sequelize';
import OracleConnection from '../../../db/oracle';

const sequelize = OracleConnection.getInstance();

class Course extends Model {
  public id_course!: number;
  public name!: string;
  public description!: string;
  public credits!: number;
}

Course.init(
  {
    id_course: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_COURSE',//Column DB
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'NAME',//Column DB
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'DESCRIPTION',//Column DB
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CREDITS',//Column DB
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'COURSES', //Table DB
    timestamps: false,
  }
);

export default Course;
