import { hash } from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { name, internet } from 'faker';

import User from '../db/entity/User';
import { BCRYPT_NUM } from '../config/application';

export async function createUser(password = '1111'): Promise<User> {
  const user: User = new User();

  user.username = name.findName();
  user.email = internet.email();
  user.password = await hash(password, BCRYPT_NUM);

  return await user.save();
}
