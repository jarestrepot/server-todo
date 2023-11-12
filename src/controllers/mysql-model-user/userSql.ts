import bcrypt from "bcrypt";
import { IregisterUser, Iuser } from "../../interface/user";
import { User } from "../../entities/user";
import * as crypto from 'crypto';
import Conditions from "../conditions/conditions";

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
}

