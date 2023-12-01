import { DataTypes, Model } from 'sequelize';
import sequelizeConnect from '../db/conection';
import { Category } from './category';
import { Importance } from './importanceTask';
import { Status } from './status';
import { User } from './user';


export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: number;
  public importance !: number;
  public status !: number;
  public user_ref !: number;
  public archived !: number;
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
        model: 'Category',
        key: 'code'
      }
    },
    importance: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Importance',
        key: 'code'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Status',
        key: 'code'
      }
    },
    user_ref: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    archived: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeConnect,
    tableName: 'tasks'
  }
);

Task.belongsTo(Category, {
  foreignKey: 'category',
  as: 'taskCategory'
});
Task.belongsTo(Importance, {
  foreignKey: 'importance',
  as: 'taskImportance'
});
Task.belongsTo(Status, {
  foreignKey: 'status',
  as: 'taskStatus'
});
Task.belongsTo(User, {
  foreignKey: 'user_ref',
  as: 'user'
})


