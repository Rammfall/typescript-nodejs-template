import UserSession from '../../db/entity/UserSession';

export default async function logoutUser(refreshToken: string): Promise<any> {
  const session: UserSession | undefined = await UserSession.findOne({
    refreshToken,
  });

  return await session?.remove();
}
