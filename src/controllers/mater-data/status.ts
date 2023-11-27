import { literal } from "sequelize";
import { Status } from "../../entities/status";

export class StatusModel {

  static async getStatus(id: number): Promise<Status | []> {
    return await Status.findOne(
      {
        attributes: [[literal('name'), 'Status']],
        where: { id },
        raw:true
      }
    ) ?? []
  }
}
