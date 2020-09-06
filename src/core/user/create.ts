import { hash } from 'bcrypt';

import User from '../../db/entity/User';
import { BCRYPT_NUM } from '../../config/application';

export default async function createUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const user: User = new User();

  user.username = username;
  user.email = email;
  user.password = await hash(password, BCRYPT_NUM);

  return await user.save();
}
