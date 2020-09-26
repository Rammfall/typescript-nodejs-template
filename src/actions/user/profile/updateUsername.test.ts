import request from 'supertest';
import { internet } from 'faker';

import User from '../../../db/entity/User';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import application from '../../../application';
import { createSession } from '../../../testUtils/session';
import setCookies from '../../../testUtils/setCookies';
import { ERROR_USERNAME_EXIST } from '../../../constants/user';

describe('update email on api', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('request on api change username in user', async () => {
    expect.assertions(3);
    const { accessToken, refreshToken } = await createSession(user);
    const newUsername = internet.userName();
    const result = await request(application)
      .post('/api/v1/user/profile/updateUsername/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({ username: newUsername });
    const dbUser = await User.findOne({ email: user.email });

    expect(result.status).toStrictEqual(200);
    expect(result.body.username).toStrictEqual(newUsername);
    expect(dbUser?.username).toStrictEqual(newUsername);
  });

  it('request with exist username not change his', async () => {
    expect.assertions(3);
    const newUser = await createUser();
    const { accessToken, refreshToken } = await createSession(newUser);
    const existedUser = await createUser();
    const result = await request(application)
      .post('/api/v1/user/profile/updateUsername/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({ username: existedUser.username });
    const dbUser = await User.findOne({ username: newUser.username });

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(ERROR_USERNAME_EXIST);
    expect(dbUser?.email).toStrictEqual(newUser.email);

    await newUser.remove();
    await existedUser.remove();
  });
});
