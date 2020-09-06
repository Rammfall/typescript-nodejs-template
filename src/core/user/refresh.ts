import UserSession from '../../db/entity/UserSession';
import { ERROR_SESSION_ARE_EXPIRED } from '../../constants/user';
import createSession from './session/createSession';

export default async function refreshUser(
  refreshToken: string
): Promise<UserSession> {
  const session: UserSession | undefined = await UserSession.findOne({
    where: { refreshToken },
    relations: ['user'],
  });

  if (session && session.expiredDate > new Date()) {
    const { user } = session;
    await session.remove();
    return await createSession(user);
  }

  throw new Error(ERROR_SESSION_ARE_EXPIRED);
}
