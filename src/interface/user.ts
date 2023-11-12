export interface Iuser{
  id?: number;
  name: string;
  lastName?: string;
  password: string;
  email?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IregisterUser {
  email: string;
  password: string;
}
