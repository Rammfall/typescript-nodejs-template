import { Response, Request } from 'express';
import User from '../../../db/entity/User';

import updateUsername from '../../../core/user/profile/updateUsername';
import { ERROR_USER_NOT_EXIST } from '../../../constants/user';

export default async function updateUsernameHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const user: User | undefined = await User.findOne({ id });
  const { username } = req.body;

  if (user) {
    try {
      return res.json({ username: await updateUsername(user, username) });
    } catch (e) {
      return res.status(400).json({ info: e.message });
    }
  }

  return res.status(400).json({ info: ERROR_USER_NOT_EXIST });
}
