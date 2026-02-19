import { Router, Request, Response } from 'express';
import User from '../models/User';


export let getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};



export let newUser = async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body; 

    if (!nom || !prenom) {
      return res.status(400).json({ error: 'nom et prenom sont requis' });
    }

    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



export let deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(204).send(); 
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
