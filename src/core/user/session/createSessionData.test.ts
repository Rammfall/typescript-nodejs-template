import validator from 'validator';

import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import User from '../../../db/entity/User';
import { createUser } from '../../../testUtils/dbUser';
import UserSession from '../../../db/entity/UserSession';
import { createSession } from '../../../testUtils/session';
import createSessionData from './createSessionData';

import isUUID = validator.isUUID;
import isJWT = validator.isJWT;

describe('check create session data', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('check data', async () => {
    expect.assertions(3);
    const session: UserSession = await createSession(user);
    const { refreshToken, accessToken, expiredDate } = await createSessionData(
      session
    );

    expect(isUUID(refreshToken)).toStrictEqual(true);
    expect(isJWT(accessToken)).toStrictEqual(true);
    expect(typeof expiredDate).toStrictEqual('object');
  });
});
