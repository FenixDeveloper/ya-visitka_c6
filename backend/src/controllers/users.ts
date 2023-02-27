import { Request, Response, NextFunction } from 'express';
import { ProjectionType } from 'mongoose';
import User from '../models/user';
import { MSG_EMAIL_ALREADY_EXIST, MSG_SERVER_ERROR } from '../constants';
import InternalServerError from '../errors/InternalServerError';
import { IUser, IUserFiltered } from '../types/user';
import CustomError from '../errors/CustomError';

type TGetUsersQuery = {
  offset?: number;
  limit?: number;
  search?: string;
};

const filterUserInfo = (user: IUser): IUserFiltered => ({
  _id: user._id,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  cohort: user.cohort,
});

const getUserProjection = (
  additional?: {[field: string]: number | string},
): ProjectionType<IUser> => ({
  _id: 1,
  email: 1,
  createdAt: 1,
  updatedAt: 1,
  cohort: 1,
  ...additional,
});

export const createUser = (
  req: Request<{}, {}, { email: string, cohort: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { email, cohort } = req.body;

  User.create({ email, cohort })
    .then((user) => {
      res.status(200).send(filterUserInfo(user));
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new CustomError(MSG_EMAIL_ALREADY_EXIST, 409));
        return;
      }
      next(new InternalServerError(MSG_SERVER_ERROR));
    });
};

export const searchUsers = (
  req: Request<{}, {}, {}, TGetUsersQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { offset = 0, limit = 20, search = '' } = req.query;
  const searchRegex = { $regex: search.toLowerCase(), $options: 'i' };

  User.find(
    {
      $or: [
        { email: searchRegex },
        { 'profile.name': searchRegex },
        { cohort: searchRegex },
      ],
    },
    getUserProjection({ name: '$profile.name' }),
    { skip: offset, limit },
  )
    .then((users) => {
      res.status(200).send({ total: users.length, items: users });
    })
    .catch(next);
};

export const putUser = (
  req: Request<{ userId: string }, {}, { email: string, cohort: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { email, cohort } = req.body;
  const { userId } = req.params;

  User.findOneAndReplace(
    { _id: userId },
    { email, cohort },
    { new: true, projection: getUserProjection() },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      if (err.code && err.code === 11000) {
        next(new CustomError(MSG_EMAIL_ALREADY_EXIST, 409));
        return;
      }
      next(new InternalServerError(MSG_SERVER_ERROR));
    });
};
