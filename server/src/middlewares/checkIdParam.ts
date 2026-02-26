import { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
  let id = Number(req.params.id);


  if (!Number.isInteger(id) || Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  next(); 
};
