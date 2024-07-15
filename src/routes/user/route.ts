import { Router } from 'express';
import { UserServiceApp } from '../../controllers/user/userController';
import { checkAuth, saveImage } from '../../helpers/auth';
import { MulterModule } from '../../middlewares/multer-image';
import CONSTANTES from '../../config/constantes';

const multer = new MulterModule();
const router = Router();
router.get('/', UserServiceApp.taskPlugins)
router.post('/login', UserServiceApp.loginUser );
router.post('/register', UserServiceApp.createUser);
router.post('/newTask/:id', checkAuth, UserServiceApp.newTask);
router.delete('/deleteTask/:id', checkAuth, UserServiceApp.deleteTask);
router.patch('/updateTask/:id', checkAuth, UserServiceApp.updateTask);
router.get('/task/:id', checkAuth, UserServiceApp.getTask);
router.patch('/modify/:id', checkAuth, UserServiceApp.modifyUser);
router.post('/image/:id', multer.single(CONSTANTES.IMAGE_USER), UserServiceApp.updateImage);
router.patch('/arcivedTask/:id', checkAuth, UserServiceApp.archivedTask);
router.post('/checkedPassword/:id', checkAuth, UserServiceApp.confirmPassword)
router.delete('/delete/:id', checkAuth, UserServiceApp.deleteUser);


export default router;

