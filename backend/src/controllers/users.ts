import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
