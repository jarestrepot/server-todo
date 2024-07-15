import { RequestHandler } from 'express';
import multer, { Field, Multer, Options } from 'multer';
import CONSTANTES from '../config/constantes';


export class MulterModule implements Multer {

  static instance: MulterModule;
  public static multerPropertie: multer.Multer;
  dest?: string | undefined;
  constructor(options: Options = { dest: CONSTANTES.RUTA_IMAGE_DEFAULT }){
    if (!!MulterModule.instance){
      return MulterModule.instance;
    }
    this.dest = options.dest;
    MulterModule.instance = this;
    MulterModule.multerPropertie = multer(options);
    return this;
  } 
  single(fieldName: string): RequestHandler {
    return MulterModule.multerPropertie.single(fieldName);
  }
  array(fieldName: string, maxCount?: number): RequestHandler {
    return MulterModule.multerPropertie.array(fieldName, maxCount);
  }
  fields(fields: readonly Field[]): RequestHandler {
    return MulterModule.multerPropertie.fields(fields);
  }
  any(): RequestHandler {
    return MulterModule.multerPropertie.any();
  }
  none(): RequestHandler {
    return MulterModule.multerPropertie.none();
  }

  singleWithParameter(fieldName: string, id: string): RequestHandler {
    return this.single(`${fieldName}_${id}`)
  }

}
