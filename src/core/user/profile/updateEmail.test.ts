import { internet } from 'faker';

import updateEmail from './updateEmail';
import { createUser } from '../../../testUtils/dbUser';
import { ERROR_MAIL_EXIST } from '../../../constants/user';

describe('check core function for update email', () => {
  it('should update email', async () => {
    expect.assertions(1);
    const user = await createUser();
    const { email: oldEmail } = user;
    const updatedUser = await updateEmail(user, internet.email());

    expect(updatedUser?.email !== oldEmail).toStrictEqual(true);

    await user.remove();
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
