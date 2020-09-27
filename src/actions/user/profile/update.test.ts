import request from 'supertest';
import { name, internet, address } from 'faker';

import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import application from '../../../application';
import setCookies from '../../../testUtils/setCookies';
import { createSession } from '../../../testUtils/session';
import UserProfile from '../../../db/entity/UserProfile';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

describe('check api request on update profile', () => {
  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    await afterAllHook();
  });

  it('check update success profile', async () => {
    expect.assertions(2);

    const user = await createUser({ withProfile: true, password: '12341234' });
    const { accessToken, refreshToken } = await createSession(user);
    const firstName = name.firstName();
    const lastName = name.lastName();
    const location = address.city();
    const about = name.jobDescriptor();
    const photo = internet.url();
    const result = await request(application)
      .post('/api/v1/user/profile/update/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({
        firstName,
        lastName,
        location,
        about,
        photo,
      });
    const profile = await UserProfile.findOne({ userId: user.id });

    expect(result.status).toStrictEqual(200);
    expect({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      location: profile?.location,
      about: profile?.about,
      photo: profile?.photo,
      userId: profile?.userId,
    }).toStrictEqual({
      firstName,
      lastName,
      location,
      about,
      photo,
      userId: user.id,
    });

    await user.remove();
  });

  it('check update profile without profile', async () => {
    expect.assertions(2);

    const user = await createUser();
    const { accessToken, refreshToken } = await createSession(user);
    const firstName = name.firstName();
    const lastName = name.lastName();
    const location = address.city();
    const about = name.jobDescriptor();
    const photo = internet.url();
    const result = await request(application)
      .post('/api/v1/user/profile/update/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({
        firstName,
        lastName,
        location,
        about,
        photo,
      });

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(PROFILE_NOT_EXIST);

    await user.remove();
  });
});
