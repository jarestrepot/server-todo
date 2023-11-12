import { Request, Response } from 'express';
import { UserModel } from '../mysql-model-user/userSql'
import { User } from '../../entities/user';
export class UserServiceApp {

  static async createUser({ body }: Request , res: Response){
    const {name, lastName} = body;

    try {
      const resultCreated: User | null  = await UserModel.createUserMysql(body);
      if (!resultCreated) return res.status(302).json({ msg: `User ${name} ${lastName} alredy exists`});
      return res.status(200).json({ resultCreated });
    } catch (error) {
      return res.status(500).json({msg: 'Error in the server!'})
    }
  }

  static async loginUser({ body }: Request, res: Response) {
    try {
      const { email, password } = body
      const resultRegister:User | null= await UserModel.loginUserMysql(body);
      if (!resultRegister) return res.status(404).json({ msg: `Incorrect values (${email}, ${password}) or you are not registered`});
      return res.status(200).json({ resultRegister });
    } catch (error) {
      
    }
  }
}
