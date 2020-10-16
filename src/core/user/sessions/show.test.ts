import { createUser } from '../../../testUtils/dbUser';
import { createSession } from '../../../testUtils/session';
import showSessions from './show';
import User from '../../../db/entity/User';

describe('get all sessions', () => {
  it('array with session', async () => {
    expect.assertions(1);

    const user = await createUser();
    await createSession(user);
    await createSession(user);
    await createSession(user);
    const dbUser = await User.findOne({
      where: { id: user.id },
      relations: ['sessions'],
    });

    // eslint-disable-next-line jest/no-conditional-expect
    if (dbUser) expect(await showSessions(dbUser)).toHaveLength(3);
  });
});
