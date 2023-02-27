import {
  Request,
  Response,
  NextFunction,
} from 'express';
import User from '../models/user';
import DataNotFoundError from '../errors/NotFoundError';
import InternalServerError from '../errors/InternalServerError';
import { MSG_INCORRECT_ID, MSG_SERVER_ERROR } from '../constants';

export const getComments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

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
