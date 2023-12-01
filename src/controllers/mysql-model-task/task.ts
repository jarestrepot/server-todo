import { Op, literal, where } from 'sequelize';
import { Category } from "../../entities/category";
import { Importance } from "../../entities/importanceTask";
import { Status } from "../../entities/status";
import { Task } from "../../entities/tasks";
import { ITask } from "../../interface/task";
import Conditions from '../conditions/conditions';
import CONSTANTES from '../../config/constantes';


export class TaskModel {

  static createTask = async ({ title, description, category, importance, status }: ITask, user_id:string):Promise<Task | null> => {
    try {
      return await Task.create(
        {
          title,
          description,
          category: Number(category),
          importance: Number(importance),
          status: Number(status),
          user_ref: user_id,
          archived: 0
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static userAndTask = async (user_ref: string): Promise<ITask[] | []> => {
    try {
      const tasksUser:Task[] = await Task.findAll(
        {
          attributes: [
            'id',
            'title',
            'description',
            [literal('taskCategory.name'), 'Category'],
            [literal('taskImportance.name'), 'Importance'],
            [literal('taskStatus.name'), 'Status'],
            'archived'
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

  static deleteTask = async (id: string):Promise <number> => {
    return await Task.destroy(
      Conditions.queryWhere({  id })
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

  static archivedTask = async ( id:string ):Promise< number | string > => {
    const task = await Task.findByPk(id);

    if(!task) {
      return CONSTANTES.NOT_FOUND
    }
    const currentArchivedValue = task.archived ?? 0;
    const [ affectedCount ]:number[] =  await Task.update({
        archived: currentArchivedValue === 0 ? 1 : 0
      },
      { where: { id } }
    )
    
    return affectedCount;
  }

  static getTaskId = async (id: string):Promise<Task | []> => {
    return await Task.findOne(
      { 
        attributes: [
          'id',
          'title',
          'description',
          [literal('taskCategory.name'), 'Category'],
          [literal('taskImportance.name'), 'Importance'],
          [literal('taskStatus.name'), 'Status'],
          'archived',
        ],
        where: { id } ,
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
    ) ?? []
  }
}
