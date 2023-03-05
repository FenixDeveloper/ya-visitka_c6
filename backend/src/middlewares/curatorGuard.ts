import { NextFunction, Response, Request } from 'express';

import ForbiddenError from '../errors/ForbiddenError';

import { ROLE_CURATOR } from '../constants';

const curatorGuard = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.passport.user.role === ROLE_CURATOR) {
    next();
  } else {
    next(new ForbiddenError());
  }
};

export default curatorGuard;
