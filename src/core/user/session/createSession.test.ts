import createSession from './createSession';
import { createUser } from '../../../testUtils/dbUser';
import UserSession from '../../../db/entity/UserSession';

describe('check function create session', () => {
  it('user session create', async () => {
    expect.assertions(1);
    const user = await createUser();
    const session: UserSession = await createSession(
      user,
      'chrome',
      'localhost'
    );

    expect(session.expiredDate > new Date()).toStrictEqual(true);

    await user.remove();
  });
});
