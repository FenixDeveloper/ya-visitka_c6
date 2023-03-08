import mongoose, { FilterQuery } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import User, { Comment, Emotion } from '../models/user';

import ForbiddenError from '../errors/ForbiddenError';
import BadRequestError from '../errors/BadRequestError';
import DataNotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';

import { Info } from '../types/info';
import { IUser } from '../types/user';
import { IProfile } from '../types/profile';
import { InfoBlockName } from '../types/info-block';

import { moveFileToUploads } from '../utils';

import {
  HTTP_STATUS_OK,
  MSG_SERVER_ERROR,
  MSG_USER_NOT_FOUND,
  ROLE_CURATOR,
} from '../constants';

type TGetProfilesQuery = {
  offset?: number;
  limit?: number;
};

type TReactionBody = { target: InfoBlockName | null } & (
  | { text: string }
  | { emotion: string }
);

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

    const isOwner = user.id === userFromSession._id;
    const isCurator = userFromSession.role === ROLE_CURATOR;

    if (!isOwner && !isCurator) {
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

  info.edu.image = moveFileToUploads(info.edu.image, next);
  info.hobby.image = moveFileToUploads(info.hobby.image, next);
  info.job.image = moveFileToUploads(info.job.image, next);
  info.status.image = moveFileToUploads(info.status.image, next);

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

export const postReaction = async (
  req: Request<{ id: string }, {}, TReactionBody>,
  res: Response,
  next: NextFunction,
) => {
  const { target } = req.body;
  const { _id: sessionUserId, name, email } = req.session.passport.user;
  const { id: userId } = req.params;

  try {
    const user = await User.findById(userId).catch((err) =>
      next(new BadRequestError(String(err))),
    );

    if (!user) {
      next(new DataNotFoundError(MSG_USER_NOT_FOUND));
      return;
    }

    const reaction: Record<string, unknown> = {
      from: {
        _id: sessionUserId,
        name,
        email,
      },
      target,
    };

    if ('text' in req.body) {
      reaction.text = req.body.text;
      user.reactions.push(new Comment(reaction));
    } else {
      reaction.emotion = req.body.emotion;
      user.reactions.push(new Emotion(reaction));
    }

    await user.save().catch((err) => next(new BadRequestError(String(err))));
    res.end();
  } catch (err) {
    next(new InternalServerError(MSG_SERVER_ERROR));
  }
};
