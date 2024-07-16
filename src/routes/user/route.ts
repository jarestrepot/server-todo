import { Router } from 'express';
import { UserServiceApp } from '../../controllers/user/userController';
import { checkAuth } from '../../helpers/auth';
import { MulterModule } from '../../middlewares/multer-image';
import CONSTANTES from '../../config/constantes';
import  multer, { Options } from 'multer';


const options: Options = {
  dest: CONSTANTES.RUTA_IMAGE_DEFAULT,
  storage: multer.diskStorage({
    
  }), // Motor de archivo
  fileFilter(req, file, callback) {
    console.log(file.mimetype)
    if (CONSTANTES.MIMETYPES.includes(file.mimetype)) {
      callback(null, true)
    }else{
      callback(new Error(`Only ${CONSTANTES.MIMETYPES}`))
    }
  },
}

const multerM = new MulterModule(options);
const router = Router();
router.get('/', UserServiceApp.taskPlugins)
router.post('/login', UserServiceApp.loginUser );
router.post('/register', UserServiceApp.createUser);
router.post('/newTask/:id', checkAuth, UserServiceApp.newTask);
router.delete('/deleteTask/:id', checkAuth, UserServiceApp.deleteTask);
router.patch('/updateTask/:id', checkAuth, UserServiceApp.updateTask);
router.get('/task/:id', checkAuth, UserServiceApp.getTask);
router.patch('/modify/:id', checkAuth, UserServiceApp.modifyUser);
router.post('/image/:id', checkAuth, multerM.single(CONSTANTES.IMAGE_USER), UserServiceApp.updateImage);
router.get('/image/:id', checkAuth, UserServiceApp.getImagenUser)
router.patch('/arcivedTask/:id', checkAuth, UserServiceApp.archivedTask);
router.post('/checkedPassword/:id', checkAuth, UserServiceApp.confirmPassword)
router.delete('/delete/:id', checkAuth, UserServiceApp.deleteUser);


export default router;

