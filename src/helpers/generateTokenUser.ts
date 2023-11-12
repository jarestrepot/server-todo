import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";


export const tokenSing = async ({name, email, user_id}: User) => {
  return jwt.sign(
    {
      id: user_id,
      name: name,
      email,
    },
    process.env.SECRET_KEY ?? 'salleFron@Grupo02TheDreamTeam',
    {
      expiresIn: "24h"
    }
  )
}


export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload | null> => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY ?? 'salleFron@Grupo02TheDreamTeam')
  } catch (error) {
    return null;
  }
}