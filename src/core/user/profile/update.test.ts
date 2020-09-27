import { internet, name, address } from 'faker';

import update from './update';
import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import User from '../../../db/entity/User';
import { createUser } from '../../../testUtils/dbUser';
import UserProfile from '../../../db/entity/UserProfile';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

describe('check core logic', () => {
  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    await afterAllHook();
  });

  it('if profile exist we change him', async () => {
    expect.assertions(1);

    const user: User = await createUser({
      withProfile: true,
      password: '11111111',
    });
    const { profile } = user;
    await update(user, {
      firstName: name.firstName(),
      lastName: name.lastName(),
      about: name.jobArea(),
      location: address.city(),
      photo: internet.url(),
    });

    expect(await UserProfile.findOne({ user })).toStrictEqual(profile);

    await user.remove();
  });

  it('if profile not exist we have error', async () => {
    expect.assertions(1);

    const user = await createUser();
    await expect(update(user, {})).rejects.toThrow(PROFILE_NOT_EXIST);

    await user.remove();
  });
});
