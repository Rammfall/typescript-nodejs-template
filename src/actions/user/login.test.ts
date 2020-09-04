import request from 'supertest';
import validator from 'validator';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import AppUser from '../../db/entity/AppUser';
import { createUser } from '../../testUtils/dbUser';
import application from '../../application';
import { readCookie } from '../../testUtils/readCookie';
import {
  ERROR_EMAIL_NOT_EXIST,
  ERROR_PASSWORD_NOT_CORRECT,
} from '../../constants/user';

import isUUID = validator.isUUID;
import isJWT = validator.isJWT;

describe('api tests login', () => {
  const password = '11111111';
  let user: AppUser;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser(password);
  });

  afterAll(async () => {
    await user?.remove();
    await afterAllHook();
  });

  it('success login and set cookies', async () => {
    expect.assertions(3);
    const result = await request(application).post('/api/v1/user/login/').send({
      email: user.email,
      password,
    });
    const refreshToken = readCookie(result.header['set-cookie'][0]);
    const accessToken = readCookie(result.header['set-cookie'][1]);

    expect(result.status).toStrictEqual(200);
    expect(isUUID(refreshToken)).toStrictEqual(true);
    expect(isJWT(accessToken)).toStrictEqual(true);
  });

  it('error login with not exist email', async () => {
    expect.assertions(3);
    const result = await request(application)
      .post('/api/v1/user/login/')
      .send({
        email: `2${user.email}`,
        password,
      });

    expect(result.status).toStrictEqual(400);
    expect(result.header['set-cookie']).toBeUndefined();
    expect(result.body.info).toStrictEqual(ERROR_EMAIL_NOT_EXIST);
  });

  it('error login with incorrect password', async () => {
    expect.assertions(3);
    const result = await request(application).post('/api/v1/user/login/').send({
      email: user.email,
      password: '141414141414',
    });

    expect(result.status).toStrictEqual(400);
    expect(result.header['set-cookie']).toBeUndefined();
    expect(result.body.info).toStrictEqual(ERROR_PASSWORD_NOT_CORRECT);
  });
});
