import { hash } from 'bcrypt';
import { BCRYPT_NUM } from '../../../config/application';

export default async function hashPassword(password: string): Promise<string> {
  return await hash(password, BCRYPT_NUM);
}
