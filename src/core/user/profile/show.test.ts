import { afterAllHook, beforeAllHook } from '../../../testUtils/hooks';
import { createUser } from '../../../testUtils/dbUser';
import { showProfile } from './show';
import UserProfile from '../../../db/entity/UserProfile';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

describe('check core show profile', () => {
  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    await afterAllHook();
  });

  it('if user have profile, we can show him', async () => {
    expect.assertions(1);

    const user = await createUser({ withProfile: true, password: '12341234' });

    expect(await showProfile(user)).toStrictEqual(
      await UserProfile.findOne({ userId: user.id })
    );

    await user.remove();
  });

  it('if user have`not profile, function throwing error', async () => {
    expect.assertions(1);

    const user = await createUser();

    await expect(showProfile(user)).rejects.toThrow(PROFILE_NOT_EXIST);

    await user.remove();
  });
});
