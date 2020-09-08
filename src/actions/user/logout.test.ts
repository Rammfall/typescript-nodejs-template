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

  it('jwt expired', async () => {
    expect.assertions(2);
    const { refreshToken, accessToken } = await createSession(
      user,
      undefined,
      undefined,
      '0.1ms'
    );
    const result = await request(application)
      .post('/api/v1/user/logout/')
      .set('Cookie', [
        `accessToken=${accessToken};refreshToken=${refreshToken}`,
      ]);

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual('jwt expired');
  });

  it('session removed, if JWT valid, must be error', async () => {
    expect.assertions(2);
    const session = await createSession(user);
    const { refreshToken, accessToken } = session;
    await session.remove();
    const result = await request(application)
      .post('/api/v1/user/logout/')
      .set('Cookie', [
        `accessToken=${accessToken};refreshToken=${refreshToken}`,
      ]);

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual('Internal error, sorry:(');
  });
});
