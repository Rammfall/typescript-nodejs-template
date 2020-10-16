import { Response, Request } from 'express';

import User from '../../../db/entity/User';
import { ERROR_USER_NOT_EXIST } from '../../../constants/user';
import showSessions from '../../../core/user/sessions/show';

export default async function showSessionsHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.body.auth;
  const { query } = req;
  const user = await User.findOne({ id });

  if (user) {
    const take = query.take ? +query.take : undefined;
    const skip = query.skip ? +query.skip : undefined;
    const sessions = await showSessions(user, take, skip);

    return res.json({ sessions });
  }

  return res.status(400).json({ info: ERROR_USER_NOT_EXIST });
}
