import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../../../../constants/user';
import updatePasswordHandler from '../../../../actions/user/profile/updatePassword';

const updatePasswordRouter: Router = Router();

updatePasswordRouter.use(
  '/',
  validatePostBody({
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH)
      .required(),
    newPassword: yup
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH)
      .required(),
  })
);
updatePasswordRouter.post('/', updatePasswordHandler);

export default updatePasswordRouter;
