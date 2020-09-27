import User from '../../db/entity/User';
import hashPassword from './logic/hashPassword';

export default async function createUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const user: User = new User();

  user.username = username;
  user.email = email;
  user.password = await hashPassword(password);
  return await user.save();
}
