import bcrypt from "bcrypt";
import { literal } from 'sequelize';
import { IregisterUser, Iuser } from "../../interface/user";
import { User } from "../../entities/user";
import * as crypto from 'crypto';
import Conditions from "../conditions/conditions";
import CONSTANTES from "../../config/constantes";
import { IError } from "../../interface/error";
import { Status } from "../../entities/status";
import { Importance } from "../../entities/importanceTask";
import { Category } from "../../entities/category";
import { IplugisTask } from "../../interface/pluginsTask";

export class UserModel{

  static getAccessories = async (): Promise<IplugisTask> => {
    const allStatus: Status[] = await Status.findAll({
      attributes: [
        [literal('name'), 'Status'],
        [literal('code'), 'codeStatus']
      ],
      raw:true
    });

    const allImportance = await Importance.findAll({
      attributes: [
        [literal('name'), 'Importance'],
        [literal('code'), 'codeImportance']
      ],
      raw:true
    });

    const allCategory = await Category.findAll({
      attributes: [
        [literal('name'), 'Category'],
        [literal('code'), 'codeCategory']
      ],
      raw:true
    });
    return { allCategory, allImportance, allStatus };
  }

  static createUserMysql = async ({name, lastName, email, password, location }: Iuser): Promise<User | null> => {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: name,
          lastName: lastName,
          password: await bcrypt.hash(password, 10),
          email: email,
          user_id: crypto.randomUUID(),
          location: location ?? null,
        }
      });
      if (!created) return null;
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  static loginUserMysql = async ({email, password}:IregisterUser ):Promise<User | null> => {
    try {
      const existUser:User | null = await User.findOne(
        Conditions.queryWhere({email: email})
      );
      if (!existUser || !await bcrypt.compare(password, existUser.password) ) return null;
      return existUser;
    } catch (error) {
      console.log('Error login user:', error);
      return null;
    }
  }

  static getUserIdMysql = async (id:string): Promise<User | null> =>  {
    return await User.findOne(
      Conditions.queryWhere({ user_id: id })
    );
  }

  static updateUser = async ({ name, lastName, email, password, location }: User, idUser: string, newPassword:string): Promise< IError | User> => {
    try {
      
      const findUser: User | null = await User.findOne({ where: { user_id: idUser }});
  
      if (!findUser) return {Error: "User not found", found:false }
      if (!await bcrypt.compare(password, findUser.password)) return {Error: CONSTANTES.INCORRECT_VALUES, found:false}

      return await findUser.update(
        { 
          name, 
          lastName, 
          email, 
          password: await bcrypt.hash(newPassword, 10), 
          location: location ?? null}, 
        {
          where: { id: idUser }
        }
      );
    } catch (error) {
      return { Error: CONSTANTES.ERROR_REQUEST , found:false }
    }
  }

  static deleteUser = async (user_id:string):Promise<number> => {
    return await User.destroy(
      Conditions.queryWhere({ user_id })
    )
  }
}

