import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../modules/validation';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../constants/user';
import createUserHandler from '../../../actions/user/create';

const createUserRouter: Router = Router();

createUserRouter.use(
  '/',
  validatePostBody(
    {
      username: yup
        .string()
        .min(USERNAME_MIN_LENGTH)
        .max(USERNAME_MAX_LENGTH)
        .required(),
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

createUserRouter.post('/', createUserHandler);

export default createUserRouter;
