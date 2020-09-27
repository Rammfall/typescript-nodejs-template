import { Response, Request } from 'express';
import User from '../../../db/entity/User';
import updatePassword from '../../../core/user/profile/updatePassword';
import { ERROR_PASSWORD_NOT_CORRECT, SUCCESS } from '../../../constants/user';

export default async function updatePasswordHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const user: User | undefined = await User.findOne({ id });
  const { password, newPassword } = req.body;

  if (user) {
    if (await updatePassword(user, password, newPassword)) {
      return res.json({ info: SUCCESS });
    }

    return res.status(400).json({ info: ERROR_PASSWORD_NOT_CORRECT });
  }

  return res.status(500);
}
