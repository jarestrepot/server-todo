import jwt from "jsonwebtoken";
import { User } from "../entities/user";
require('dotenv').config();


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

/**
 * Verify the token
 * @param token 
 * @returns Token or null
 */
export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload | null> => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY ?? 'salleFron@Grupo02TheDreamTeam')
  } catch (error) {
    return null;
  }
}