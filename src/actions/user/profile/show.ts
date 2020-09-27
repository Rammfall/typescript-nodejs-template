import { Response, Request } from 'express';
import User from '../../../db/entity/User';
import { showProfile } from '../../../core/user/profile/show';

export default async function showProfileHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const user: User | undefined = await User.findOne({
    where: { id },
    relations: ['profile'],
  });

  if (user) {
    try {
      const result = await showProfile(user);

      return res.json(result);
    } catch (e) {
      return res.status(400).json({ info: e.message });
    }
  }

  return res.status(500);
}
