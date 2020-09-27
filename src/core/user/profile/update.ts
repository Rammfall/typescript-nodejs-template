import UserProfile from '../../../db/entity/UserProfile';
import User from '../../../db/entity/User';
import { PROFILE_NOT_EXIST } from '../../../constants/profile';

export default async function updateProfile(
  user: User,
  {
    firstName,
    lastName,
    about,
    location,
    photo,
  }: {
    firstName?: string;
    lastName?: string;
    about?: string;
    location?: string;
    photo?: string;
  }
): Promise<UserProfile> {
  const { profile } = user;
  if (profile) {
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (about) profile.about = about;
    if (location) profile.location = location;
    if (photo) profile.photo = photo;

    return await profile.save();
  }

  throw new Error(PROFILE_NOT_EXIST);
}
