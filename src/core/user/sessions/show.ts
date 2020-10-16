import User from '../../../db/entity/User';
import UserSession from '../../../db/entity/UserSession';

export default async function showSessions(
  user: User,
  take: number | undefined = 20,
  skip: number | undefined = 0
): Promise<UserSession[]> {
  const sessions = await UserSession.find({
    where: { user },
    take,
    skip,
    select: ['device', 'sessionIdentifier', 'ipAddress'],
  });

  if (sessions) return sessions;
  return [];
}
