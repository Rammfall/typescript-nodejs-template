import { internet } from 'faker';

import updateEmail from './updateEmail';
import User from '../../../db/entity/User';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import { ERROR_MAIL_EXIST } from '../../../constants/user';

describe('check core function for update email', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('should update email', async () => {
    expect.assertions(1);
    const { email: oldEmail } = user;
    const updatedUser = await updateEmail(user, internet.email());

    expect(updatedUser?.email !== oldEmail).toStrictEqual(true);
  });

  it('cant change email if email is exist', async () => {
    expect.assertions(1);
    const newUser = await createUser();
    const existUser = await createUser();

    await expect(updateEmail(newUser, existUser.email)).rejects.toThrow(
      ERROR_MAIL_EXIST
    );

    await existUser.remove();
    await newUser.remove();
  });
});
