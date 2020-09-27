import User from '../../../db/entity/User';
import { isPasswordCorrect } from '../check/isPasswordCorrect';
import hashPassword from '../logic/hashPassword';

export default async function updatePassword(
  user: User,
  password: string,
  newPassword: string
): Promise<boolean> {
  if (await isPasswordCorrect(user, password)) {
    // eslint-disable-next-line no-param-reassign
    user.password = await hashPassword(newPassword);
    await user.save();

    return true;
  }

  return false;
}
