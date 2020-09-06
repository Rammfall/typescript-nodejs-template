import { Response, Request } from 'express';
import logoutUser from '../../core/user/logout';
import { cookieSet } from '../../modules/cookieSetter';

export default async function logoutUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { refreshToken } = req.cookies;

  await logoutUser(refreshToken);
  cookieSet(
    res,
    [
      ['accessToken', ''],
      ['refreshToken', ''],
    ],
    new Date()
  );

  return res.json({ info: 'success' });
}
