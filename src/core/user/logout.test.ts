import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import User from '../../db/entity/User';
import { createUser } from '../../testUtils/dbUser';
import UserSession from '../../db/entity/UserSession';
import { createSession } from '../../testUtils/session';
import logoutUser from './logout';

describe('session remove', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('session must be destroyed', async () => {
    expect.assertions(1);
    const { refreshToken } = await createSession(user);
    await logoutUser(refreshToken);

    expect(await UserSession.findOne({ refreshToken })).toBeUndefined();
  });
});
