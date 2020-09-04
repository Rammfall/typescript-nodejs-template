import { Request, Response } from 'express';
import createUser from '../../core/user/create';
import { isExistUser } from '../../core/user/check/isExistUser';
import { ERROR_MAIL_EXIST, ERROR_USERNAME_EXIST } from '../../constants/user';

export default async function createUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const {
    username,
    email,
    password,
  }: { username: string; email: string; password: string } = req.body;

  if (await isExistUser({ email })) {
    return res.status(400).json({ info: ERROR_MAIL_EXIST });
  }
  if (await isExistUser({ username })) {
    return res.status(400).json({ info: ERROR_USERNAME_EXIST });
  }

  const user = await createUser(username, email, password);

  return res.json({
    username: user.username,
    email: user.email,
  });
}
