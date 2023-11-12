import { Router } from 'express';
import { UserServiceApp } from '../../controllers/user/userController';

const router =  Router();

router.post('/login', UserServiceApp.loginUser );
router.post('/register', UserServiceApp.createUser);
router.post('/newTask/:id', UserServiceApp.newTask);
router.delete('/deleteTask/:id', UserServiceApp.deleteTask);
router.patch('/updateTask/:id', UserServiceApp.updateTask);
router.get('/task/:id', UserServiceApp.getTask);
router.patch('/modify/:id', UserServiceApp.modifyUser);
router.delete('/delete/:id', UserServiceApp.deleteUser);


export default router;

