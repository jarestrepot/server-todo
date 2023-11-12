import { Router } from 'express';
import { UserServiceApp } from '../../controllers/user/userController';

const router =  Router();

router.post('/login', UserServiceApp.loginUser );
router.post('/register', UserServiceApp.createUser);
router.post('/newTask/:id', UserServiceApp.newTask)

export default router;

