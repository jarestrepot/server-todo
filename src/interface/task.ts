export interface ITask {
  id?: number;
  title: string;
  description: string;
  category?: number;
  importance?: number;
  status?: number;
  created?: number;
}