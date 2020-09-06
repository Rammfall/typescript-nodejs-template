import request from 'supertest';
import validator from 'validator';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import User from '../../db/entity/User';
import { createUser } from '../../testUtils/dbUser';
import application from '../../application';
import UserSession from '../../db/entity/UserSession';
import { createSession } from '../../testUtils/session';
import { readCookie } from '../../testUtils/readCookie';
import isUUID = validator.isUUID;
import isJWT = validator.isJWT;

describe('refresh on api', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('success refresh', async () => {
    expect.assertions(4);
    const { accessToken, refreshToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/refresh/')
      .set('Cookie', [
        `accessToken=${accessToken};refreshToken=${refreshToken}`,
      ]);
    const newRefreshToken = readCookie(result.header['set-cookie'][0]);
    const newAccessToken = readCookie(result.header['set-cookie'][1]);

    expect(result.status).toStrictEqual(200);
    expect(isUUID(newRefreshToken)).toStrictEqual(true);
    expect(isJWT(newAccessToken)).toStrictEqual(true);
    expect(await UserSession.findOne({ refreshToken })).toBeUndefined();
  });
});
