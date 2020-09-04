import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

const { trim, escape } = validator;

const sanitize = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const keys = Object.keys(req.body);
  keys.forEach((item) => {
    req.body[item] = trim(req.body[item]);
    req.body[item] = escape(req.body[item]);
  });

  return next();
};

export default sanitize;
