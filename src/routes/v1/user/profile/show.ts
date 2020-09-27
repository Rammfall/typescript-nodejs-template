import { Router } from 'express';

import showProfileHandler from '../../../../actions/user/profile/show';

const showProfileRouter: Router = Router();

showProfileRouter.post('/', showProfileHandler);

export default showProfileRouter;
