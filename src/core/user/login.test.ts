import validator from 'validator';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import User from '../../db/entity/User';
import loginUser from './login';
import { createUser } from '../../testUtils/dbUser';
import { ERROR_PASSWORD_NOT_CORRECT } from '../../constants/user';

const { isJWT, isUUID } = validator;

describe('check core login', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('check success login', async () => {
    expect.assertions(2);
    const { email } = user;
    const { accessToken, refreshToken } = await loginUser(
      email,
      '11111111',
      'Chrome'
    );

    expect(isUUID(refreshToken)).toStrictEqual(true);
    expect(isJWT(accessToken)).toStrictEqual(true);
  });

  it('throwing error', async () => {
    expect.assertions(1);
    const { email } = user;
    await expect(loginUser(email, '111', 'Chrome')).rejects.toThrow(
      ERROR_PASSWORD_NOT_CORRECT
    );
  });
});
