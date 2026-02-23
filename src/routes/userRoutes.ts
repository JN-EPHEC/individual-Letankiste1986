import { Router, Request, Response } from 'express';
import { getUsers } from '../controllers/userControllers';
import { newUser } from '../controllers/userControllers';
import { deleteUser } from '../controllers/userControllers';
import { logger } from '../middlewares/logger';


const router = Router();

router.use(logger);
//route pour récupérer tous les utilisateurs


/** @swagger
 * /api/users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */

router.get('/users', getUsers);

//route pour créer un nouvel utilisateur(POST)

/** @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 */

router.post('/users', newUser);


//route pour supprimer un utilisateur par son ID

router.delete('/users/:id', deleteUser);


export default router;