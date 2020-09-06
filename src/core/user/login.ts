import { compare } from 'bcrypt';

import UserSession from '../../db/entity/UserSession';
import User from '../../db/entity/User';
import { ERROR_PASSWORD_NOT_CORRECT } from '../../constants/user';
import createSession from './session/createSession';

export default async function loginUser(
  email: string,
  password: string
): Promise<UserSession> {
  const user: User | undefined = await User.findOne({ email });

  if (user && (await compare(password, user.password))) {
    return await createSession(user);
  }

  throw new Error(ERROR_PASSWORD_NOT_CORRECT);
}
