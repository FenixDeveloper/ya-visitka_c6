import {
  Request,
  Response,
  NextFunction,
} from 'express';
import ForbiddenError from '../errors/ForbiddenError';

export default (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isCurator = req.session.passport.user.role === 'curator' ? true : false;
  if (!isCurator) {
    return new ForbiddenError();
  }
  next();
  return;
};
