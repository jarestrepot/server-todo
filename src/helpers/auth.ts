import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './generateTokenUser';
import fs from 'node:fs';
import CONSTANTES from '../config/constantes';
import path from 'path';

/**
 * Verify that the user has the signing token
 * @param header Header with token
 * @param res Response
 * @param next Next function
 * @returns Nothing in case the token is correct or error response from the server
 */
export const checkAuth = async ({ headers }: Request, res: Response, next: NextFunction) => {
  const { authorization } = headers;
  if (authorization && authorization.startsWith('Bearer ')){
    verifyToken(authorization.slice(7));
    next();
    return;
  }
  return res.status(401).json({ Error: ' Acces denied ❌' });
}


export const saveImage = async (file: Express.Multer.File, id: string) => {
  if (!file) {
    return;
  }
  const { originalname, path: tempPath } = file;
  let [name, stay] = originalname.split('.')
  const newDirPath = path.join(CONSTANTES.RUTA_IMAGE_DEFAULT, id);
  const newPath = path.join(newDirPath, `avatar.${stay}`);

  try {
    // Asegúrate de que el directorio de destino exista
    if (!fs.existsSync(newDirPath)) {
      fs.mkdirSync(newDirPath, { recursive: true });
    }

    // Copiar el archivo a la nueva ubicación
    fs.copyFileSync(tempPath, newPath);

    // Eliminar el archivo temporal
    fs.unlinkSync(tempPath);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};
