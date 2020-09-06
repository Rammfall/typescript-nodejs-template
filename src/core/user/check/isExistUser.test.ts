import { name, internet } from 'faker';

import { isExistUser } from './isExistUser';
import User from '../../../db/entity/User';
import { createUser } from '../../../testUtils/dbUser';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';

describe('check unique function', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('check unique state by username', async () => {
    expect.assertions(2);
    const { username } = user;

    expect(await isExistUser({ username })).toStrictEqual(true);
    expect(await isExistUser({ username: name.findName() })).toStrictEqual(
      false
    );
  });

  it('check unique state by email', async () => {
    expect.assertions(2);
    const { email } = user;

    expect(await isExistUser({ email })).toStrictEqual(true);
    expect(await isExistUser({ email: internet.email() })).toStrictEqual(false);
  });
});
