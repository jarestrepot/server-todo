import { literal } from "sequelize";
import { Importance } from "../../entities/importanceTask";


export class ImportanceModel {

  static async  getImportance(id: number): Promise<Importance | null> {
    return await Importance.findOne(
      {
        attributes: [[literal('name'), 'Importance']],
        where: { id },
        raw: true
      }
    )
  }
}