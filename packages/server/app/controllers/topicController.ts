import { Request, Response } from 'express';
import * as console from 'node:console';

export const getTopic = (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  res.status(201).json({ message: 'Topic get' });
};
