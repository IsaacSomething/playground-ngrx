import { Request, Response } from 'express';
import { COURSES } from './db-data.route';

export function saveCourse(req: Request, res: Response) {
  console.log('Saving course ...');

  const id = req.params['id'];
  const changes = req.body;

  COURSES[id] = {
    ...COURSES[id],
    ...changes
  };

  setTimeout(() => res.status(200).json(COURSES[id]), 2000);
}
