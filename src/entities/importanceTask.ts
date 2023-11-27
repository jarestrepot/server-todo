import { DataTypes, Model } from 'sequelize';
import sequelizeConnect from '../db/conection';

export class Importance extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
}

Importance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        isInt: true
      }
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: sequelizeConnect,
    tableName: 'importance_type'
  }
);


