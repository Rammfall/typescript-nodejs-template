import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { JWT_ACCESS_SECRET } from '../../config/application';
import UserSession from '../../db/entity/UserSession';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const { accessToken } = req.cookies;

  try {
    const authData = await verify(accessToken, JWT_ACCESS_SECRET);
    req.body.auth = authData;
    const session: UserSession | undefined = await UserSession.findOne({
      where: { accessToken },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (session && session.userId === authData.id) {
      return next();
    }
    throw new Error('Internal error, sorry:(');
  } catch (e) {
    return res.status(400).json({ info: e.message });
  }
}
