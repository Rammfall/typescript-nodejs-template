import { Router } from 'express';
import * as yup from 'yup';

import validatePostBody from '../../../../middlewares/validation';
import showSessionsHandler from '../../../../actions/user/sessions/show';

const showSessionsRouter: Router = Router();

showSessionsRouter.use(
  '/',
  validatePostBody(
    {
      length: yup.number(),
      offset: yup.number(),
    },
    'query'
  )
);
showSessionsRouter.post('/', showSessionsHandler);

export default showSessionsRouter;
