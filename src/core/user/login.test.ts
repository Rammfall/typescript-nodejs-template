import validator from 'validator';

import loginUser from './login';
import { createUser } from '../../testUtils/dbUser';
import { ERROR_PASSWORD_NOT_CORRECT } from '../../constants/user';

const { isJWT, isUUID } = validator;

describe('check core login', () => {
  it('check success login', async () => {
    expect.assertions(2);
    const user = await createUser();
    const { email } = user;
    const { accessToken, refreshToken } = await loginUser(
      email,
      '11111111',
      'Chrome',
      'localhost'
    );

    expect(isUUID(refreshToken)).toStrictEqual(true);
    expect(isJWT(accessToken)).toStrictEqual(true);

    await user.remove();
  });

  it('throwing error', async () => {
    expect.assertions(1);
    const user = await createUser();
    const { email } = user;
    await expect(
      loginUser(email, '111', 'Chrome', 'localhost')
    ).rejects.toThrow(ERROR_PASSWORD_NOT_CORRECT);
    await user.remove();
  });
});
