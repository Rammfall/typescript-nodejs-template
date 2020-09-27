import User from '../../../db/entity/User';
import UserProfile from '../../../db/entity/UserProfile';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

export async function showProfile(user: User): Promise<UserProfile> {
  const { profile } = user;

  if (profile) {
    return profile;
  }

  throw new Error(PROFILE_NOT_EXIST);
}
