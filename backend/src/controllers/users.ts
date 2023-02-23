import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  ROLE_CURATOR,
  ROLE_STUDENT,
  TOKEN_LIFE_TIME,
  TOKEN_SECRET,
} from '../constants';
import User from '../models/user';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, cohort } = req.body;
  const { JWT_SECRET = TOKEN_SECRET, CURATORS } = process.env;
  const curators = CURATORS ? CURATORS.split(',') : [];
  if (curators.includes(email)) {
    return res.send({
      token: jwt.sign(
        { email, role: ROLE_CURATOR },
        JWT_SECRET,
        { expiresIn: TOKEN_LIFE_TIME },
      ),
    });
  }
  return User.findUserByEmailAndCohort(email, cohort)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id, email, role: ROLE_STUDENT },
          JWT_SECRET,
          { expiresIn: TOKEN_LIFE_TIME },
        ),
      });
    })
    .catch(next);
};
