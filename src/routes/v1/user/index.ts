import express, { Express } from 'express';

import createUserRouter from './create';
import loginUserRouter from './login';
import refreshUserRouter from './refresh';
import logoutUserRouter from './logout';
import removeUserRouter from './remove';
import twoFARouter from './2fa';
import profileRouter from './profile';
import sessionsRouter from './sessions';
import auth from '../../../middlewares/auth';
import authValidation from '../../../middlewares/authValidation';

const userRouter: Express = express();

userRouter.use('/create', createUserRouter);
userRouter.use('/login', loginUserRouter);
userRouter.use('/refresh', refreshUserRouter);
userRouter.use('/logout', authValidation, auth, logoutUserRouter);
userRouter.use('/remove', authValidation, auth, removeUserRouter);
userRouter.use('/2fa', twoFARouter);
userRouter.use('/profile', authValidation, auth, profileRouter);
userRouter.use('/sessions', authValidation, auth, sessionsRouter);

export default userRouter;
