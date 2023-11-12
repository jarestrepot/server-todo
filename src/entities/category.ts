import { DataTypes, Model } from 'sequelize';
import sequelizeConnect from '../db/conection';

export class Category extends Model {
  private id!: number;
  private code!: string;
  private name!: string;
}

Category.init(
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
    tableName: 'category_type'
  }
);


