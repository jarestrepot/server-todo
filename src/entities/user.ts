
import { DataTypes, Model } from 'sequelize';
import sequelizeConnect from '../db/conection';


export class User extends Model {
  public id!: number;
  public name!: string;
  public lastName!: string | null;
  public password!: string;
  public email!: string;
  public user_id!: string;
  public location!: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        isInt: true,
        notEmpty: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 25,
        min: 3
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 35,
        min: 4
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 8,
        max: 20
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: sequelizeConnect,
    tableName: 'user'
  }
)
