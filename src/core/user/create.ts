import { hash } from 'bcrypt';

import AppUser from '../../db/entity/AppUser';

export default async function createUser(
  username: string,
  email: string,
  password: string
): Promise<AppUser> {
  const user: AppUser = new AppUser();

  user.username = username;
  user.email = email;
  user.password = await hash(password, 10);

  return await user.save();
}
