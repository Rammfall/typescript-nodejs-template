import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { Shape } from 'yup';

const validatePostBody = (
  shape: Shape<any, any>,
  path: 'query' | 'body' = 'body'
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const schema = yup.object().shape(shape);

    try {
      await schema.validate(req[path], {
        stripUnknown: true,
        abortEarly: false,
      });
      return next();
    } catch ({ errors }) {
      return res.status(400).json({ errors });
    }
  };
};

export default validatePostBody;
