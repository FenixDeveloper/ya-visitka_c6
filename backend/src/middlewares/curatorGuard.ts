import { NextFunction, Response, Request } from 'express';
import { MSG_SERVER_ERROR, ROLE_CURATOR } from '../constants';
import ForbiddenError from '../errors/ForbiddenError';
import InternalServerError from '../errors/InternalServerError';

const curatorGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.session.passport.user.role === ROLE_CURATOR) {
      next();
    } else {
      next(new ForbiddenError());
    }
  } catch (err) {
    next(new InternalServerError(MSG_SERVER_ERROR));
  }
};

export default curatorGuard;
