import { Router, Request, Response } from 'express';
import { getUsers } from '../controllers/userControllers';
import { newUser } from '../controllers/userControllers';
import { deleteUser } from '../controllers/userControllers';
import { logger } from '../middlewares/logger';


const router = Router();

router.use(logger);
//route pour récupérer tous les utilisateurs

router.get('/users', getUsers);

//route pour créer un nouvel utilisateur(POST)

router.post('/users', newUser);


//route pour supprimer un utilisateur par son ID

router.delete('/users/:id', deleteUser);


export default router;