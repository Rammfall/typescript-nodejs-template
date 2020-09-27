import request from 'supertest';

import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import application from '../../../application';
import { createSession } from '../../../testUtils/session';
import setCookies from '../../../testUtils/setCookies';
import UserProfile from '../../../db/entity/UserProfile';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

describe('getting profile data on api', () => {
  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    await afterAllHook();
  });

  it('if we have profile, we get him', async () => {
    expect.assertions(2);

    const user = await createUser({ withProfile: true, password: '12312312' });
    const { refreshToken, accessToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/profile/show/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send();

    expect(result.status).toStrictEqual(200);
    expect(result.body).toStrictEqual({
      ...(await UserProfile.findOne({ userId: user.id })),
    });

    await user.remove();
  });

  it('if we have profile, we cant get', async () => {
    expect.assertions(2);

    const user = await createUser();
    const { refreshToken, accessToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/profile/show/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send();

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(PROFILE_NOT_EXIST);

    await user.remove();
  });
});
