import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import updateProfileHandler from '../../../../actions/user/profile/update';

const updateProfileRouter: Router = Router();

updateProfileRouter.use(
  '/',
  validatePostBody({
    firstName: yup.string().min(2).max(30),
    lastName: yup.string().min(2).max(30),
    about: yup.string().min(2).max(3000),
    location: yup.string().min(2).max(70),
    photo: yup.string().url(),
  })
);
updateProfileRouter.post('/', updateProfileHandler);

export default updateProfileRouter;
