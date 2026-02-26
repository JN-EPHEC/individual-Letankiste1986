import { Router, Request, Response } from 'express';
import { getUsers, updateUser } from '../controllers/userControllers';
import { newUser } from '../controllers/userControllers';
import { deleteUser } from '../controllers/userControllers';
import { logger } from '../middlewares/logger';
import { checkIdParam } from '../middlewares/checkIdParam';


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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */


router.delete('/users/:id', checkIdParam, deleteUser);


//route pour mettre à jour un utilisateur par son ID

/** @swagger
 * /users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: ID invalide ou nom/prénom manquants
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put('/users/:id', checkIdParam, updateUser);


export default router;