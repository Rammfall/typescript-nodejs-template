import UserSession from '../../db/entity/UserSession';
import { ERROR_SESSION_ARE_EXPIRED } from '../../constants/user';
import createSessionData from './session/createSessionData';

export default async function refreshUser(
  refreshToken: string
): Promise<UserSession> {
  const session: UserSession | undefined = await UserSession.findOne({
    where: { refreshToken },
    relations: ['user'],
  });

  if (session && session.expiredDate > new Date()) {
    const {
      refreshToken: newRefreshToken,
      accessToken,
      expiredDate,
    } = await createSessionData(session);

    session.refreshToken = newRefreshToken;
    session.accessToken = accessToken;
    session.expiredDate = expiredDate;
    return await session.save();
  }

  await session?.remove();
  throw new Error(ERROR_SESSION_ARE_EXPIRED);
}
