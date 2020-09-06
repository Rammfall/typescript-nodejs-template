import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../middlewares/validation';
import auth from '../../../middlewares/auth';
import logoutUserHandler from '../../../actions/user/logout';

const logoutUserRouter: Router = Router();

logoutUserRouter.use(
  '/',
  validatePostBody(
    {
      accessToken: yup.string().required(),
      refreshToken: yup.string().uuid().required(),
    },
    'cookies'
  ),
  auth
);
logoutUserRouter.post('/', logoutUserHandler);

export default logoutUserRouter;
