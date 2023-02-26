import { Request, Response, NextFunction } from 'express';
import mongoose, { FilterQuery } from 'mongoose';
import BadRequestError from '../errors/BadRequestError';
import User from '../models/user';

import DataNotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

import { IUser } from '../types/user';
import { IProfile } from '../types/profile';
import { Info } from '../types/info';

type TGetProfilesQuerry = {
  offset?: number;
  limit?: number;
}

export const getProfiles = (
  req: Request<{}, {}, {}, TGetProfilesQuerry & {cohort?: string}>,
  res: Response,
  next: NextFunction,
) => {
  const { offset: skip, limit, cohort } = req.query;

  const filterQuerry: FilterQuery<IUser> = (cohort) ? { cohort } : {};

  User.find(filterQuerry, { info: 0, reactions: 0 }, { limit, skip })
    .then((users) => res.send({ total: users.length, items: users }))
    .catch((err) => {
      next(new InternalServerError(err));
    });
};

export const getProfileById = async (
  req: Request<{id:string}>,
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
    next(new DataNotFoundError('The specified resource was not found'));
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
};

export const getReactionsById = async (
  req: Request<{id: string}, {}, {}, TGetProfilesQuerry>,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId = '' } = req.params;
  const { offset: skip = 0, limit = 20 } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new DataNotFoundError('The specified resource was not found'));
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
  req: Request<{id: string}, {}, {profile: IProfile, info: Info}>,
  res: Response,
  next: NextFunction,
) => {
  const { id: userId = '' } = req.params;
  const { profile, info } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new DataNotFoundError('The specified resource was not found'));
      return;
    }

    User.findByIdAndUpdate(userId, { $set: { profile, info } }, { new: true })
      .then((updUser) => {
        res.status(200).send(updUser);
      })
      .catch((err) => next(new BadRequestError(String(err))));
  } catch (err) {
    next(new DataNotFoundError(String(err)));
  }
};
