import AppUser from '../../../db/entity/AppUser';

interface UniqueField {
  username?: string;
  email?: string;
}

export async function isExistUser(fields: UniqueField): Promise<boolean> {
  const user: AppUser | undefined = await AppUser.findOne(fields);

  return !!user;
}
