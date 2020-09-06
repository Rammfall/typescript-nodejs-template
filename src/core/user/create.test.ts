import { name, internet } from 'faker';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import User from '../../db/entity/User';
import createUser from './create';

describe('test create core logic', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('user created with core function', async () => {
    expect.assertions(1);
    const username = name.findName();
    const email = internet.email();

    user = await createUser(username, email, '11');
    const dbUser: User | undefined = await User.findOne({ username });

    expect(user).toStrictEqual(dbUser);
  });
});
