import { Importance } from "../../entities/importanceTask";


export class ImportanceModel {

  static async  getImportance(id: number): Promise<Importance | null> {
    return await Importance.findOne(
      {
        attributes: ['name'],
        where: { id }
      }
    )
  }
}