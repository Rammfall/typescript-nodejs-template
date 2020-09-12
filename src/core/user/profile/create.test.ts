import { name } from 'faker';

import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import User from '../../../db/entity/User';
import { createUser } from '../../../testUtils/dbUser';
import createProfile from './create';
import UserProfile from '../../../db/entity/UserProfile';

describe('check core function of create profile', () => {
  let user: User;

  beforeAll(async () => {
    await beforeAllHook();
    user = await createUser();
  });

  afterAll(async () => {
    await user.remove();
    await afterAllHook();
  });

  it('profile created in db', async () => {
    expect.assertions(1);

    const profile = await createProfile(
      user,
      name.firstName(),
      name.lastName(),
      'about info',
      'Ukraine',
      'phoet'
    );

    expect(profile).toStrictEqual(
      await UserProfile.findOne({
        where: { userId: profile.userId },
        relations: ['user'],
      })
    );
  });
});
