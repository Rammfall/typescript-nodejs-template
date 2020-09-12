import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import profileCreateHandler from '../../../../actions/user/profile/create';

const createProfileRouter: Router = Router();

createProfileRouter.use(
  '/',
  validatePostBody(
    {
      firstName: yup.string().min(2).max(30).required(),
      lastName: yup.string().min(2).max(30).required(),
      about: yup.string().min(2).max(1000),
      location: yup.string().min(2).max(70),
      photo: yup.string(),
    },
    'body'
  )
);
createProfileRouter.post('/', profileCreateHandler);

export default createProfileRouter;
