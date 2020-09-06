import request from 'supertest';

import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import User from '../../db/entity/User';
import { createUser } from '../../testUtils/dbUser';
import application from '../../application';
import { createSession } from '../../testUtils/session';
import UserSession from '../../db/entity/UserSession';

describe('logout user', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('user success logout', async () => {
    expect.assertions(3);
    const { refreshToken, accessToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/logout/')
      .set('Cookie', [
        `accessToken=${accessToken};refreshToken=${refreshToken}`,
      ]);

    expect(result.status).toStrictEqual(200);
    expect(result.body.info).toStrictEqual('success');
    expect(await UserSession.findOne({ refreshToken })).toBeUndefined();
  });
});
