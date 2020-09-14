import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../../constants/user';
import updateUsernameHandler from '../../../../actions/user/profile/updateUsername';

const updateUsernameRouter: Router = Router();

updateUsernameRouter.use(
  '/',
  validatePostBody({
    username: yup
      .string()
      .min(USERNAME_MIN_LENGTH)
      .max(USERNAME_MAX_LENGTH)
      .required(),
  })
);

updateUsernameRouter.post('/', updateUsernameHandler);

export default updateUsernameRouter;
