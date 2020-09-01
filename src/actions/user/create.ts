import { Request, Response } from 'express';
import createUser from '../../core/user/create';
import {
  isUniqueEmail,
  isUniqueUsername,
} from '../../core/user/check/isUniqueUser';

export default async function createUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { username, email, password } = req.body;

  if (await isUniqueEmail(email)) {
    return res.status(400).json({ info: 'Not unique mail' });
  }
  if (await isUniqueUsername(username)) {
    return res.status(400).json({ info: 'Not unique username' });
  }

  const user = await createUser(username, email, password);

  return res.json({
    username: user.username,
    email: user.email,
  });
}
