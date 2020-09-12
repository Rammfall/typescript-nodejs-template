import { Response, Request } from 'express';

import User from '../../../db/entity/User';
import createProfile from '../../../core/user/profile/create';
import { ERROR_USER_NOT_EXIST } from '../../../constants/user';

async function profileCreateHandler(req: Request, res: Response): Promise<any> {
  const { firstName, lastName, about, location } = req.body;
  const { id }: { id: number } = req.body.auth;
  const user: User | undefined = await User.findOne({ id });

  if (user) {
    const profile = await createProfile(
      user,
      firstName,
      lastName,
      about,
      location
    );

    return res.json({
      firstName: profile.firstName,
      lastName: profile.lastName,
      about: profile.about,
      location: profile.location,
    });
  }

  return res.status(400).json({ info: ERROR_USER_NOT_EXIST });
}

export default profileCreateHandler;
