import { Request, Response, NextFunction } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import User from '../models/user';

import DataNotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

import { IUser } from '../types/user';
import { IProfile } from '../types/profile';
import { Info } from '../types/info';
import { HTTP_STATUS_OK, MSG_USER_NOT_FOUND, ROLE_CURATOR } from '../constants';
import ForbiddenError from '../errors/ForbiddenError';

type TGetProfilesQuery = {
  offset?: number;
  limit?: number;
};

export const getProfiles = (
  req: Request<{}, {}, {}, TGetProfilesQuery & { cohort?: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { offset: skip, limit } = req.query;
  const userFromSession = req.session.passport.user;
  const { role } = userFromSession;
  const { cohort } = role === ROLE_CURATOR ? req.query : userFromSession;

  const filterQuery: FilterQuery<IUser> = cohort ? { cohort } : {};

  User.find(filterQuery, { info: 0, reactions: 0 }, { limit, skip })
    .then((users) => res.send({ total: users.length, items: users }))
    .catch((err) => {
      next(new InternalServerError(err));
    });
};

export const getProfileById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId = '' } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.send(user);
      return;
    }
    next(new DataNotFoundError(MSG_USER_NOT_FOUND));
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
};

export const getReactionsById = async (
  req: Request<{ id: string }, {}, {}, TGetProfilesQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId = '' } = req.params;
  const { offset: skip = 0, limit = 20 } = req.query;
  const userFromSession = req.session.passport.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(new DataNotFoundError(MSG_USER_NOT_FOUND));
      return;
    }

    if (user.id !== userFromSession._id) {
      next(new ForbiddenError());
      return;
    }

    const reactions = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
          reactions: { $type: 'array' },
        },
      },
      {
        $project: {
          _id: 0,
          reactions: 1,
        },
      },
      { $unwind: '$reactions' },
      { $replaceRoot: { newRoot: { $mergeObjects: '$reactions' } } },
      { $skip: skip },
      { $limit: limit },
    ]).then((items) => ({ total: items.length, items }));

    res.send(reactions);
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
};

export const patchProfile = async (
  req: Request<{ id: string }, {}, { profile: IProfile; info: Info }>,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId = '' } = req.params;
  const { profile, info } = req.body;
  const userFromSession = req.session.passport.user;

  try {
    const user = await User.findById(userId);

    if (!user) {
      next(new DataNotFoundError(MSG_USER_NOT_FOUND));
      return;
    }

    if (user.id !== userFromSession._id) {
      next(new ForbiddenError());
      return;
    }

    User.findByIdAndUpdate(userId, { $set: { profile, info } }, { new: true })
      .then((updUser) => {
        res.status(HTTP_STATUS_OK).send(updUser);
      })
      .catch((err) => next(new BadRequestError(String(err))));
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
};
