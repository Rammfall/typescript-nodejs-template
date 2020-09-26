import { internet } from 'faker';

import updateUsername from './updateUsername';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import User from '../../../db/entity/User';
import { ERROR_USERNAME_EXIST } from '../../../constants/user';

describe('check change username', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('check success updating username', async () => {
    expect.assertions(2);
    const oldUsername = user.username;
    const newUsername: string = await updateUsername(user, internet.userName());

    expect(oldUsername !== newUsername).toStrictEqual(true);
    expect((await User.findOne({ email: user.email }))?.username).toStrictEqual(
      newUsername
    );
  });

  it('check error updating username', async () => {
    expect.assertions(1);
    const newUser = await createUser();

    await expect(updateUsername(newUser, newUser.username)).rejects.toThrow(
      ERROR_USERNAME_EXIST
    );

    await newUser.remove();
  });
});
