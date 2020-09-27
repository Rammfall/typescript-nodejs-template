import { hash } from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { internet, name, address } from 'faker';

import User from '../db/entity/User';
import UserProfile from '../db/entity/UserProfile';
import { BCRYPT_NUM } from '../config/application';

export async function createUser(
  {
    password,
    withProfile,
  }: {
    password?: string;
    withProfile?: boolean;
  } = {
    password: '11111111',
    withProfile: false,
  }
): Promise<User> {
  const user: User = new User();

  user.username = internet.userName();
  user.email = internet.email();
  user.password = await hash(password, BCRYPT_NUM);

  if (withProfile) {
    await user.save();
    const profile = new UserProfile();

    profile.userId = user.id;
    profile.firstName = name.firstName();
    profile.lastName = name.lastName();
    profile.about = name.jobDescriptor();
    profile.location = address.city();
    profile.photo = internet.url();
    user.profile = profile;

    await profile.save();

    return user;
  }

  return await user.save();
}
