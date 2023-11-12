import { Category } from "../../entities/category";
import Conditions from "../conditions/conditions";


export class CategoryModel {


  static async getCategory(id: number): Promise<Category | null> {
    return await Category.findOne(
      {
        attributes: ['name'],
        where: {id: id}
      }
    )
  }
}