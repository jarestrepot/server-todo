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
export class UserServiceApp {

  static async createUser({ body }: Request , res: Response){
    const {name, lastName} = body;

    try {
      const resultCreated: User | null  = await UserModel.createUserMysql(body);
      if (!resultCreated) return res.status(302).json({ msg: `User ${name} ${lastName} alredy exists`});
      // **  Generate the token
      return res.status(201).json({ resultCreated, token: await tokenSing(resultCreated) });
    } catch (error) {
      return res.status(500).json({ msg: CONSTANTES.ERROR_SERVER });
    }
  }

  static async loginUser({ body }: Request, res: Response) {
    try {
      const { email, password } = body
      const resultRegister:User | null= await UserModel.loginUserMysql(body);
      if (!resultRegister) return res.status(404).json({ msg: `Incorrect values (${email}, ${password}) or you are not registered`});
      const tasksUser: ITask[] | [] = await TaskModel.userAndTask(resultRegister.user_id);
      // **  Generate the token
      return res.status(200).json({ dataUser: resultRegister, token: await tokenSing(resultRegister), tasks: tasksUser });
    } catch (error) {
      console.error('Error', error);
      return res.status(500).json({ msg: CONSTANTES.ERROR_SERVER });
    }
  }



  static async newTask({ body, params }: Request, res: Response){
    try {
      const { id } = params;
      const getUserId: User | null = await UserModel.getUserIdMysql(id);
      if (!getUserId) return res.status(404).json({ msg: `User with id (${id}) does not exist` });
      const newTask: Task | null = await TaskModel.createTask(body, getUserId.user_id);
      if (!newTask) return res.status(500).json({ msg: `It was not possible to create the task` });

      return res.status(201).json({
        msg: `Task created successfully`, task: [{
          title: newTask.title,
          description: newTask.description,
          category: await CategoryModel.getCategory(body.category),
          importance: await ImportanceModel.getImportance(body.importance),
          status: await StatusModel.getStatus(body.status)
        }]
      });
    } catch (error) {
      return res.status(500).json({ msg: CONSTANTES.ERROR_SERVER });
    }
    
  }

  static async deleteTask({body, params}:Request, res: Response) {
    const { id } = params;
    const resultDelete:number = await TaskModel.deleteTask(id);
    if (resultDelete > 0) return res.status(200).json({ msg: `Task delete successfully`})
    return res.status(202).json({ msg: `Task not found`});
  }

  static async updateTask({ body }:Request, res: Response) {
    try {
      const resultUpdate:number = await TaskModel.updateTask(body);
      if (resultUpdate > 0) return res.status(200).json({ msg: 'Task updated successfully'});
      return res.status(202).json({ msg: `Task not found` });
    } catch (error) {
      return res.status(500).json({ msg : CONSTANTES.ERROR_SERVER });
    }
  }

  static async getTask({ params }: Request, res: Response){
    try {
      const { id } = params;
      const task: Task | null = await TaskModel.getTaskId(Number(id));
      if(!task) return res.status(302).json({ msg: 'Task not found' });
      return res.status(200).json({ task });
    } catch (error) {
      return res.status(500).json({ msg: CONSTANTES.ERROR_SERVER });
    }



  }

}