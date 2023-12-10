import { Request, Response } from 'express';
import { UserModel } from '../mysql-model-user/userSql'
import { User } from '../../entities/user';
import { tokenSing } from '../../helpers/generateTokenUser';
import { TaskModel } from '../mysql-model-task/task';
import { Task } from '../../entities/tasks';
import { CategoryModel } from '../mater-data/category';
import { ImportanceModel } from '../mater-data/importance';
import { StatusModel } from '../mater-data/status';
import { ITask } from '../../interface/task';
import CONSTANTES from '../../config/constantes';
import { IError } from '../../interface/error';
import { IplugisTask } from '../../interface/pluginsTask';
import { IregisterUser } from '../../interface/user';
export class UserServiceApp {

  static async taskPlugins(req: Request, res: Response){
    try {
      const { allCategory, allImportance, allStatus }: IplugisTask = await UserModel.getAccessories();
      return res.status(200).json({ category: allCategory, importance: allImportance, status: allStatus });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async createUser({ body }: Request , res: Response){
    const {name, lastName} = body;

    try {
      const resultCreated: User | null  = await UserModel.createUserMysql(body);
      if (!resultCreated) return res.status(302).json({ msg: `User ${name} ${lastName} alredy exists`});
      // **  Generate the token
      return res.status(201).json({ resultCreated, token: await tokenSing(resultCreated) });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async loginUser({ body }: Request, res: Response) {
    try {
      const { email, password } = body
      const resultRegister:User | null= await UserModel.loginUserMysql(body);
      if (!resultRegister) return res.status(404).json({ Error: CONSTANTES.INCORRECT_VALUES });
      const tasksUser: ITask[] | [] = await TaskModel.userAndTask(resultRegister.user_id);
      // **  Generate the token
      return res.status(200).json({ dataUser: resultRegister, token: await tokenSing(resultRegister), tasks: tasksUser });
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }



  static async newTask({ body, params }: Request, res: Response){
    try {
      const { id } = params;
      const getUserId: User | null = await UserModel.getUserIdMysql(id);
      if (!getUserId) return res.status(404).json({ Error: `User with id (**${id.slice(32, -1)}**) does not exist` });
      const newTask: Task | null = await TaskModel.createTask(body, getUserId.user_id);
      if (!newTask) return res.status(500).json({ Error: `It was not possible to create the task` });
      const { Importance }:any= await ImportanceModel.getImportance(body.importance)
      const { Category }: any = await CategoryModel.getCategory(body.category)
      const { Status }: any = await StatusModel.getStatus(body.status)
      return res.status(201).json({
        msg: `Task created successfully`, task: {
          id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          Category,
          Importance,
          Status,
          archived: newTask.archived
        }
      });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
    
  }

  static async deleteTask({ params }:Request, res: Response) {
    const { id } = params;
    const resultDelete: number = await TaskModel.deleteTask(id);
    if (resultDelete > 0) return res.status(200).json({ msg: `Task delete successfully`})
    return res.status(202).json({ Error: `Task not found`});
  }

  static async updateTask({ body, params }:Request, res: Response) {
    try {
      const { id } = params;
      const userTask: User |null = await  UserModel.getUserIdMysql(id);
      if (!userTask) return res.status(404).json({ Error: `There is no user with that id **${id.slice(32, -1)}**`})
      const resultUpdate:number = await TaskModel.updateTask(body, id);
      if (resultUpdate > 0) 
        return res.status(200).json({ msg: 'Task updated successfully', task: await TaskModel.getTaskId(body.id)  });
      return res.status(202).json({ msg: `Task not found` });
    } catch (error) {
      return res.status(500).json({ Error : CONSTANTES.ERROR_SERVER });
    }
  }

  static async getTask({ params }: Request, res: Response){
    try {
      const { id } = params;
      const task: Task | [] = await TaskModel.getTaskId(id);
      if(!task) return res.status(302).json({ msg: 'Task not found' });
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async archivedTask({ params }: Request, res: Response){
    try {
      const { id } = params;
      const task: number | string  = await TaskModel.archivedTask(id)
      if (typeof task === 'number' && task > 0 )  return res.status(200).json({ msg:'Task updated successfully' ,task: await TaskModel.getTaskId(id)})
      return res.status(202).json({ msg: `Task not found` });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async modifyUser({ body, params }: Request, res: Response){
    try {
      const { newPassword } = body;
      const updateUser:User | IError = await UserModel.updateUser(body, params.id, newPassword);
      if (updateUser instanceof User){
        return res.status(200).json({ user: updateUser, tasks: await TaskModel.userAndTask(updateUser.user_id) });
      }
      return res.status(400).json({ Error: updateUser });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async deleteUser({ params }:Request, res: Response){
    try {
      const { id } = params;
      if (await UserModel.deleteUser(id) > 0) return res.status(200).json({ msg: `User delete successfully`});
      return res.status(203).json({ Error: `User not found`})
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

  static async confirmPassword({ params, body }:Request, res:Response) {
    try{
      const userFind:User | null = await UserModel.getUserIdMysql(params.id)
      if (userFind instanceof User){
        const checkedPasswordUser: IregisterUser = {
          email: userFind.email,
          password: body.password
        }
        if (await UserModel.loginUserMysql(checkedPasswordUser)){
          return res.status(200).json({ msg: 'Password correct', found: true })
        }
      } return res.status(400).json({ msg: `User ${CONSTANTES.NOT_FOUND}`, found: false });
    } catch (error) {
      return res.status(500).json({ Error: CONSTANTES.ERROR_SERVER });
    }
  }

}
