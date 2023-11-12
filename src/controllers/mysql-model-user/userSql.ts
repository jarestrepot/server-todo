import bcrypt from "bcrypt";
import { IregisterUser, Iuser } from "../../interface/user";
import { User } from "../../entities/user";
import * as crypto from 'crypto';
import Conditions from "../conditions/conditions";
import CONSTANTES from "../../config/constantes";
import { IError } from "../../interface/error";

export class UserModel{
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
      console.log(created);
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
      Conditions.queryWhere({ id: id })
    );
  }

  static updateUser = async ({ name, lastName, email, password, location }: User, idUser: number, newPassword:string): Promise< IError | User> => {
    try {
      
      const findUser: User | null = await User.findOne({ where: { id: idUser }});
  
      if (!findUser) return {error: "User not found", found:false }
      if (!await bcrypt.compare(password, findUser.password)) return {error: "Password is incorrect", found:false}

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
      return { error: CONSTANTES.ERROR_REQUEST , found:false }
    }
  }

  static deleteUser = async (id:number):Promise<number> => {
    return await User.destroy(
      Conditions.queryWhere({id})
    )
  }
}

