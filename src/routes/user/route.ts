import { Router } from 'express';
import { UserServiceApp } from '../../controllers/user/userController';
import { checkAuth } from '../../helpers/auth';

const router =  Router();
router.get('/', UserServiceApp.taskPlugins)
router.post('/login', UserServiceApp.loginUser );
router.post('/register', UserServiceApp.createUser);
router.post('/newTask/:id', checkAuth, UserServiceApp.newTask);
router.delete('/deleteTask/:id', checkAuth, UserServiceApp.deleteTask);
router.patch('/updateTask/:id', checkAuth, UserServiceApp.updateTask);
router.get('/task/:id', checkAuth, UserServiceApp.getTask);
router.patch('/modify/:id', checkAuth, UserServiceApp.modifyUser);
router.delete('/delete/:id', checkAuth, UserServiceApp.deleteUser);


export default router;

