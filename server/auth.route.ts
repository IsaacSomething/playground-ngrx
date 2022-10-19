import { Request, Response } from 'express';
import { authenticate } from './db-data.route';

export function loginUser(req: Request, res: Response) {
  console.log('User login attempt ...');

  const { email, password } = req.body;
  const user = authenticate(email, password);

  user
    ? res.status(200).json({ id: user.id, email: user.email, image: user.image, name: user.name, role: user.role })
    : res.sendStatus(403);
}
