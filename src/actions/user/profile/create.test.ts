import request from 'supertest';
import { name } from 'faker';

import User from '../../../db/entity/User';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import application from '../../../application';
import setCookies from '../../../testUtils/setCookies';
import { createSession } from '../../../testUtils/session';

describe('check api creating profile', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('user created successfull', async () => {
    expect.assertions(2);

    const firstName = name.firstName();
    const { refreshToken, accessToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/profile/create/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({
        firstName,
        lastName: name.lastName(),
      });

    expect(result.status).toStrictEqual(200);
    expect(result.body.firstName).toStrictEqual(firstName);
  });
});
