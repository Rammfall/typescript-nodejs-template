import User from '../../../db/entity/User';

interface UniqueField {
  username?: string;
  email?: string;
}

export async function isExistUser(fields: UniqueField): Promise<boolean> {
  const user: User | undefined = await User.findOne(fields);

  return !!user;
}
