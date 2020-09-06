import createSession from './createSession';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import User from '../../../db/entity/User';
import { createUser } from '../../../testUtils/dbUser';
import UserSession from '../../../db/entity/UserSession';

describe('check function create session', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('user session create', async () => {
    expect.assertions(1);
    const session: UserSession = await createSession(user);

    expect(session.expiredDate > new Date()).toStrictEqual(true);
  });
});
