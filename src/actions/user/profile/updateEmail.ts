import { Request, Response } from 'express';

import User from '../../../db/entity/User';
import updateEmail from '../../../core/user/profile/updateEmail';

export default async function updateEmailHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const { email } = req.body;
  const user: User | undefined = await User.findOne({ id });

  if (user) {
    try {
      const updatedUser: User = await updateEmail(user, email);

      res.json({ email: updatedUser.email });
    } catch (e) {
      res.status(400).json({ info: e.message });
    }
  }
  return res.status(400).json();
}
