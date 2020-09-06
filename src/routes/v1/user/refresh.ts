import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../modules/validation';

const refreshUserRouter: Router = Router();

refreshUserRouter.use(
  '/',
  validatePostBody(
    {
      accessToken: yup.string().required(),
      refreshToken: yup.string().required(),
    },
    'cookies'
  )
);
refreshUserRouter.post('/');

export default refreshUserRouter;
