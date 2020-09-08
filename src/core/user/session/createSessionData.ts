import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_EXPIRED,
} from '../../../config/application';
import UserSession from '../../../db/entity/UserSession';

interface SessionData {
  accessToken: string;
  refreshToken: string;
  expiredDate: Date;
}

export default async function createSessionData(
  session: UserSession
): Promise<SessionData> {
  const { username, id, email } = session.user;

  const accessToken = await sign(
    {
      username,
      id,
      email,
    },
    JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRED }
  );
  const refreshToken = v4();
  const expiredDate: Date = new Date(+new Date() + REFRESH_TOKEN_EXPIRED);

  return { accessToken, refreshToken, expiredDate };
}
