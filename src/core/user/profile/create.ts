import UserProfile from '../../../db/entity/UserProfile';
import User from '../../../db/entity/User';
import { ERROR_PROFILE_IS_EXIST } from '../../../constants/user';

async function createProfile(
  user: User,
  firstName: string,
  lastName: string,
  about?: string,
  location?: string,
  photo?: string
): Promise<UserProfile> {
  const existProfile: UserProfile | undefined = await UserProfile.findOne({
    where: { user },
  });
  if (!existProfile) {
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

  throw new Error(ERROR_PROFILE_IS_EXIST);
}

export default createProfile;
