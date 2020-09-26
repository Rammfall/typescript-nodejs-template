import User from '../../../db/entity/User';
import { isExistUser } from '../check/isExistUser';
import { ERROR_USERNAME_EXIST } from '../../../constants/user';

export default async function updateUsername(
  user: User,
  username: string
): Promise<string> {
  if (!(await isExistUser({ username }))) {
    // eslint-disable-next-line no-param-reassign
    user.username = username;

    await user.save();
    return username;
  }

  throw new Error(ERROR_USERNAME_EXIST);
}
