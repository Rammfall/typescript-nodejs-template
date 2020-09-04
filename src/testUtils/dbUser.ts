import { hash } from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { name, internet } from 'faker';

import AppUser from '../db/entity/AppUser';
import { BCRYPT_NUM } from '../config/application';

export async function createUser(password = '1111'): Promise<AppUser> {
  const user: AppUser = new AppUser();

  user.username = name.findName();
  user.email = internet.email();
  user.password = await hash(password, BCRYPT_NUM);

  return await user.save();
}
