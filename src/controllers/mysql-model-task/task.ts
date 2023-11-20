import { Op, literal } from 'sequelize';
import { Category } from "../../entities/category";
import { Importance } from "../../entities/importanceTask";
import { Status } from "../../entities/status";
import { Task } from "../../entities/tasks";
import { ITask } from "../../interface/task";
import Conditions from '../conditions/conditions';


export class TaskModel {

  static createTask = async ({ title, description, category, importance, status }: ITask, user_id:string):Promise<Task | null> => {
    try {
      return await Task.create(
        {
          title,
          description,
          category,
          importance,
          status,
          user_ref: user_id,
        }
      );
      
    } catch (error) {
      return null;
    }
  }

  static userAndTask = async (user_ref: string): Promise<ITask[] | []> => {
    try {
      const tasksUser = await Task.findAll(
        {
          attributes: [
            'id',
            'title',
            'description',
            [literal('taskCategory.name'), 'Category'],
            [literal('taskImportance.name'), 'Importance'],
            [literal('taskStatus.name'), 'Status'],
          ],
          where:{
            user_ref
          },
          include: [
            {
              model: Category,
              as: 'taskCategory',
              attributes: []
            },
            {
              model: Importance,
              as: 'taskImportance',
              attributes: []
            },
            {
              model: Status,
              as: 'taskStatus',
              attributes: []
            }
          ],
          raw: true
        }
      );

      if (tasksUser) return tasksUser;
      return [];
    } catch (error) {
      console.log('Error: ', error);
      return [];
    }
  }

  static deleteTask = async (taskId: string):Promise <number> => {
    return await Task.destroy(
      Conditions.queryWhere({ user_ref: taskId })
    );
  }

  static updateTask = async({ id, title, description, category, importance, status }: ITask, user_ref:string) => {

    const [affectedCount]: number[] = await Task.update(
      { title, description, category, importance, status }, 
      { where: {
          [Op.and]: [
            {
              id
            },
            { 
              user_ref
            }
          ]
        } 
      }
    );
    return affectedCount;
  }

  static getTaskId = async (id: string):Promise<Task | null> => {
    return await Task.findOne({where: {user_ref: id} });
  }
}
