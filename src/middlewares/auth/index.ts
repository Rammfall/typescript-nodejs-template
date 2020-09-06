import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '../../config/application';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { accessToken } = req.cookies;

  try {
    req.body.auth = await verify(accessToken, JWT_ACCESS_SECRET);

    return next();
  } catch (e) {
    return res.status(400).json({ info: e.message });
  }
}
