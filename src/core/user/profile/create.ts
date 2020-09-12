import UserProfile from '../../../db/entity/UserProfile';
import User from '../../../db/entity/User';

async function createProfile(
  user: User,
  firstName: string,
  lastName: string,
  about?: string,
  location?: string,
  photo?: string
): Promise<UserProfile> {
  const profile: UserProfile = new UserProfile();

  profile.userId = user.id;
  profile.user = user;
  profile.firstName = firstName;
  profile.lastName = lastName;
  profile.about = about;
  profile.location = location;
  profile.photo = photo;

  return await profile.save();
}

export default createProfile;
