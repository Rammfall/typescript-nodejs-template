import { name, internet } from 'faker';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import AppUser from '../../db/entity/AppUser';
import createUser from './create';

describe('test create core logic', () => {
  let user: AppUser;

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
    const dbUser: AppUser | undefined = await AppUser.findOne({ username });

    expect(user).toStrictEqual(dbUser);
  });
});
