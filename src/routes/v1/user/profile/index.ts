import express, { Express } from 'express';

import profileShowRouter from './show';
import profileUpdateRouter from './update';
import updateEmailRouter from './updateEmail';
import profilePasswordRouter from './password';
import updateUsernameRouter from './updateUsername';
import createProfileRouter from './create';

const profileRouter: Express = express();

profileRouter.use('/create', createProfileRouter);
profileRouter.use('/show', profileShowRouter);
profileRouter.use('/update', profileUpdateRouter);
profileRouter.use('/updateEmail', updateEmailRouter);
profileRouter.use('/updateUsername', updateUsernameRouter);
profileRouter.use('/password', profilePasswordRouter);

export default profileRouter;
