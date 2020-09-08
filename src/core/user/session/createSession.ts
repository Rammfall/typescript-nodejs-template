import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

import UserSession from '../../../db/entity/UserSession';
import User from '../../../db/entity/User';
import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_EXPIRED,
} from '../../../config/application';

export default async function createSession(
  user: User,
  device: string
): Promise<UserSession> {
  const { username, email, id } = user;
  const session: UserSession = new UserSession();

  session.accessToken = await sign(
    {
      username,
      id,
      email,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRED }
  );
  session.refreshToken = v4();
  session.user = user;
  session.device = device;
  session.expiredDate = new Date(+new Date() + REFRESH_TOKEN_EXPIRED);

  return await session.save();
}
