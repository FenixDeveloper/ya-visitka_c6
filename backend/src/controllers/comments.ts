import {
  Request,
  Response,
  NextFunction,
} from 'express';

export const getComments = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('ok');
  console.log(req.query);
  const { offset: offset, limit, search: search } = req.query;
  console.log('offset', offset, 'limit', limit, 'search', search);





};
