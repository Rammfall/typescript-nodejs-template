import { Response, Request } from 'express';
import User from '../../../db/entity/User';
import updateProfile from '../../../core/user/profile/update';

export default async function updateProfileHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const { firstName, lastName, location, about, photo } = req.body;
  const user: User | undefined = await User.findOne({
    where: { id },
    relations: ['profile'],
  });

  if (user) {
    try {
      const result = await updateProfile(user, {
        firstName,
        lastName,
        location,
        about,
        photo,
      });

      return res.json({
        firstName: result.firstName,
        lastName: result.lastName,
        location: result.location,
        about: result.about,
        photo: result.photo,
      });
    } catch (e) {
      return res.status(400).json({ info: e.message });
    }
  }

  return res.status(500);
}
