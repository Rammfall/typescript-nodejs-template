import { Request, Response } from 'express';
import { isExistUser } from '../../core/user/check/isExistUser';
import { ERROR_EMAIL_NOT_EXIST } from '../../constants/user';
import loginUser from '../../core/user/login';
import { cookieSet } from '../../modules/cookieSetter';

export default async function loginUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { email, password }: { email: string; password: string } = req.body;
  const device = req.headers['user-agent'] || 'Not recognized';
  const ip: string = req.connection.remoteAddress || 'Not recognized';

  if (!(await isExistUser({ email }))) {
    return res.status(400).json({ info: ERROR_EMAIL_NOT_EXIST });
  }

  try {
    const { refreshToken, accessToken } = await loginUser(
      email,
      password,
      device,
      ip
    );
    cookieSet(res, [
      ['refreshToken', refreshToken],
      ['accessToken', accessToken],
    ]);

    return res.json({ info: 'success' });
  } catch (e) {
    return res.status(400).json({ info: e.message });
  }
}
