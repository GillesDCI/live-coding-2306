import express from 'express';
import passport from 'passport';
import { getAllUsers, getProfile, login, register, logout } from '../controllers/userController.js';


const router = express.Router();

//List of all the users 
router.get('/', getAllUsers);

router.post('/login', login);

router.get('/logout', logout);
//creating a new user 
router.post('/register',register);

router.use(passport.authenticate('jwt',{session:false}));

router.get('/profile', getProfile)

export default router;