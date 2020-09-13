import User from '../../../db/entity/User';
import { isExistUser } from '../check/isExistUser';
import { ERROR_MAIL_EXIST } from '../../../constants/user';

export default async function updateProfileEmail(
  user: User,
  email: string
): Promise<User> {
  if (!(await isExistUser({ email }))) {
    // eslint-disable-next-line no-param-reassign
    user.email = email;

    return await user.save();
  }

  throw new Error(ERROR_MAIL_EXIST);
}
