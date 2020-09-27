import express, { Express } from 'express';

import showProfileRouter from './show';
import updateProfileRouter from './update';
import updateEmailRouter from './updateEmail';
import updatePasswordRouter from './updatePassword';
import updateUsernameRouter from './updateUsername';
import createProfileRouter from './create';

const profileRouter: Express = express();

profileRouter.use('/create', createProfileRouter);
profileRouter.use('/show', showProfileRouter);
profileRouter.use('/update', updateProfileRouter);
profileRouter.use('/updateEmail', updateEmailRouter);
profileRouter.use('/updateUsername', updateUsernameRouter);
profileRouter.use('/updatePassword', updatePasswordRouter);

export default profileRouter;
