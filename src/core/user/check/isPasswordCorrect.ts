import { compare } from 'bcrypt';
import User from '../../../db/entity/User';

export async function isPasswordCorrect(
  user: User,
  password: string
): Promise<boolean> {
  return await compare(password, user.password);
}
