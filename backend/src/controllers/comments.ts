import {
  Request,
  Response,
  NextFunction,
} from 'express';
import User from '../models/user';
import DataNotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';
import { MSG_INCORRECT_ID, MSG_SERVER_ERROR } from '../constants';

type TGetQuery = {
  offset?: number;
  limit?: number;
  search?: string;
};

export const getComments = (
  req: Request<{}, {}, {}, TGetQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { offset = 0, limit = 20, search } = req.query;
  const searchRegex = { $regex: search!.toLowerCase(), $options: 'i' };
  const filter = [
    { 'reactions.from.name': searchRegex },
    { 'reactions.to.name': searchRegex },
    { cohort: searchRegex },
  ];
  const addFieldTo = {
    'reactions.to': {
      _id: '$_id',
      name: '$profile.name',
      email: '$email',
      cohort: '$cohort',
    },
    'reactions.from.cohort': '$cohort',
  };
  const fieldsShow = {
    'reactions.text': 1,
    'reactions.from': 1,
    'reactions.target': 1,
    'reactions.to': 1,
    'reactions.createdAt': 1,
    _id: 0,
  };

  User.aggregate()
    .addFields(addFieldTo)
    .unwind('reactions')
    .project(fieldsShow)
    .match({
      $or: filter,
    })
    .replaceRoot({
      $mergeObjects: '$reactions',
    })
    .skip(offset)
    .limit(limit)
    .sort({
      createdAt: 'desc',
    })
    .then((items) => res.send({
      total: items.length,
      items,
    }))
    .catch(() => {
      next(new InternalServerError(MSG_SERVER_ERROR));
    });
};

export const deleteComment = (
  req: Request<{ commentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { commentId } = req.params;

  User.findOneAndUpdate(
    { 'reactions._id': commentId },
    { $pull: { reactions: { _id: commentId } } },
    { new: true },
  ).then((user) => {
    if (user) res.status(200).send();
    else next(new DataNotFoundError(MSG_INCORRECT_ID));
  }).catch(() => {
    next(new InternalServerError(MSG_SERVER_ERROR));
  });
};
