import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import updateEmailHandler from '../../../../actions/user/profile/updateEmail';

const updateEmailRouter: Router = Router();

updateEmailRouter.use(
  '/',
  validatePostBody(
    {
      email: yup.string().email().required(),
    },
    'body'
  )
);
updateEmailRouter.post('/', updateEmailHandler);

export default updateEmailRouter;
