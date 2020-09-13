import express, { Express } from 'express';

import profileShowRouter from './show';
import profileUpdateRouter from './update';
import updateEmailRouter from './updateEmail';
import profilePasswordRouter from './password';
import profileUsernameRouter from './username';
import createProfileRouter from './create';

const profileRouter: Express = express();

profileRouter.use('/create', createProfileRouter);
profileRouter.use('/show', profileShowRouter);
profileRouter.use('/update', profileUpdateRouter);
profileRouter.use('/updateEmail', updateEmailRouter);
profileRouter.use('/password', profilePasswordRouter);
profileRouter.use('/username', profileUsernameRouter);

export default profileRouter;
