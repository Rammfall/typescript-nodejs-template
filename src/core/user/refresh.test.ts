import refreshUser from './refresh';
import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import { ERROR_SESSION_ARE_EXPIRED } from '../../constants/user';
import User from '../../db/entity/User';
import UserSession from '../../db/entity/UserSession';
import { createUser } from '../../testUtils/dbUser';
import { createSession } from '../../testUtils/session';

describe('check refresh logic', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('success refresh if token not expired and old session removed', async () => {
    expect.assertions(2);
    const { refreshToken } = await createSession(user);
    const newSession: UserSession = await refreshUser(refreshToken);
    const expiredSession: UserSession | undefined = await UserSession.findOne({
      refreshToken,
    });

    expect(expiredSession).toBeUndefined();
    expect(newSession !== undefined).toStrictEqual(true);
  });

  it('error refresh if token expired', async () => {
    expect.assertions(1);
    const { refreshToken } = await createSession(user, -4);

    await expect(refreshUser(refreshToken)).rejects.toThrow(
      ERROR_SESSION_ARE_EXPIRED
    );
  });
});
