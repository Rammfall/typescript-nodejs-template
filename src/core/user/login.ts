import { compare } from 'bcrypt';
import { v4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import UserSession from '../../db/entity/UserSession';
import AppUser from '../../db/entity/AppUser';
import {
  JWT_ACCESS_EXPIRED,
  JWT_ACCESS_SECRET,
  REFRESH_TOKEN_EXPIRED,
} from '../../config/application';
import { ERROR_PASSWORD_NOT_CORRECT } from '../../constants/user';

export default async function loginUser(
  email: string,
  password: string,
  accessExpired = JWT_ACCESS_EXPIRED,
  expiredRefresh = REFRESH_TOKEN_EXPIRED,
  accessSecret = JWT_ACCESS_SECRET
): Promise<UserSession> {
  const user: AppUser | undefined = await AppUser.findOne({ email });

  if (user && (await compare(password, user.password))) {
    const { username, id, email: userEmail } = user;
    const session: UserSession = new UserSession();

    session.refreshToken = v4();
    session.accessToken = await sign(
      { username, id, email: userEmail },
      accessSecret,
      {
        expiresIn: accessExpired,
      }
    );
    session.expiredDate = new Date(+new Date() + expiredRefresh);
    session.user = user;

    return await session.save();
  }

  throw new Error(ERROR_PASSWORD_NOT_CORRECT);
}
