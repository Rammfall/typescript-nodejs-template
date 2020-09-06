import { v4 } from 'uuid';

import { sign } from 'jsonwebtoken';
import User from '../db/entity/User';
import UserSession from '../db/entity/UserSession';
import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_EXPIRED,
} from '../config/application';

export async function createSession(
  user: User,
  timeToEndRefresh = REFRESH_TOKEN_EXPIRED,
  jwtSecret = JWT_ACCESS_SECRET,
  expiresIn = JWT_ACCESS_EXPIRED
): Promise<UserSession> {
  const { email, username, id } = user;
  const session: UserSession = new UserSession();

  session.user = user;
  session.refreshToken = v4();
  session.expiredDate = new Date(+new Date() + timeToEndRefresh);
  session.accessToken = await sign({ id, email, username }, jwtSecret, {
    expiresIn,
  });

  return await session.save();
}
