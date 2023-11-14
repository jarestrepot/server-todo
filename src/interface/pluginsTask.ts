import { Category } from "../entities/category";
import { Importance } from "../entities/importanceTask";
import { Status } from "../entities/status";

export interface IplugisTask{
  allCategory: Category[];
  allImportance: Importance[];
  allStatus: Status[];
}