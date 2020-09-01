import AppUser from '../../../db/entity/AppUser';

export async function isUniqueEmail(email: string): Promise<boolean> {
  const user: AppUser | undefined = await AppUser.findOne({ email });

  return !!user;
}

export async function isUniqueUsername(username: string): Promise<boolean> {
  const user: AppUser | undefined = await AppUser.findOne({ username });

  return !!user;
}
