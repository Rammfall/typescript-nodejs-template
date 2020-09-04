import { hash } from 'bcrypt';

import AppUser from '../../db/entity/AppUser';
import { BCRYPT_NUM } from '../../config/application';

export default async function createUser(
  username: string,
  email: string,
  password: string
): Promise<AppUser> {
  const user: AppUser = new AppUser();

  user.username = username;
  user.email = email;
  user.password = await hash(password, BCRYPT_NUM);

  return await user.save();
}
