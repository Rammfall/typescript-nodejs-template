import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../middlewares/validation';
import refreshUserHandler from '../../../actions/user/refresh';

const refreshUserRouter: Router = Router();

refreshUserRouter.use(
  '/',
  validatePostBody(
    {
      accessToken: yup.string().required(),
      refreshToken: yup.string().uuid().required(),
    },
    'cookies'
  )
);
refreshUserRouter.post('/', refreshUserHandler);

export default refreshUserRouter;
