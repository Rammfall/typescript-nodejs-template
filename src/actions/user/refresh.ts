import { Request, Response } from 'express';
import refreshUser from '../../core/user/refresh';
import { cookieSet } from '../../modules/cookieSetter';

export default async function refreshUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { refreshToken } = req.cookies;

  try {
    const { refreshToken: newRefreshToken, accessToken } = await refreshUser(
      refreshToken
    );
    cookieSet(res, [
      ['refreshToken', newRefreshToken],
      ['accessToken', accessToken],
    ]);

    return res.json({ info: 'success' });
  } catch (e) {
    return res.status(400).json({ info: e.message });
  }
}
