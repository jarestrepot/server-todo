import { DataTypes, Model } from 'sequelize';
import sequelizeConnect from '../db/conection';


export class Task extends Model {
  private id!: number;
  private title!: string;
  private description!: string;
  private category!: number;
  private importance !: number;
  private status !: number;
  private user_ref !: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: true
      }
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: false
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
        max: 255,
        notNull: false
      }
    },
    category:{
      type: DataTypes.INTEGER,
      references: {
        model: '',
        key: ''
      }
    },
    importance: {
      type: DataTypes.INTEGER,
      references: {
        model: '',
        key: ''
      }
    },
    status: {
      type: DataTypes.INTEGER,
      references: {
        model: '',
        key: ''
      }
    },
    user_ref: {
      type: DataTypes.INTEGER,
      references: {
        model: '',
        key: ''
      }
    }
  },
  {
    sequelize: sequelizeConnect,
    tableName: 'tasks'
  }
);
