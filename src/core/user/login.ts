import UserSession from '../../db/entity/UserSession';
import User from '../../db/entity/User';
import { ERROR_PASSWORD_NOT_CORRECT } from '../../constants/user';
import createSession from './session/createSession';
import { isPasswordCorrect } from './check/isPasswordCorrect';

export default async function loginUser(
  email: string,
  password: string,
  device: string
): Promise<UserSession> {
  const user: User | undefined = await User.findOne({ email });

  if (user && (await isPasswordCorrect(user, password))) {
    return await createSession(user, device);
  }

  throw new Error(ERROR_PASSWORD_NOT_CORRECT);
}
