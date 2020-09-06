import { Router } from 'express';
import * as yup from 'yup';

import sanitize from '../../../modules/sanitizers/sanitize';
import validatePostBody from '../../../middlewares/validation';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../../../constants/user';
import loginUserHandler from '../../../actions/user/login';

const loginUserRouter: Router = Router();

loginUserRouter.use(
  '/',
  sanitize,
  validatePostBody(
    {
      email: yup
        .string()
        .email()
        .min(EMAIL_MIN_LENGTH)
        .max(EMAIL_MAX_LENGTH)
        .required(),
      password: yup
        .string()
        .min(PASSWORD_MIN_LENGTH)
        .max(PASSWORD_MAX_LENGTH)
        .required(),
    },
    'body'
  )
);

loginUserRouter.post('/', loginUserHandler);

export default loginUserRouter;
