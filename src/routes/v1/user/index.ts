import express, { Express } from 'express';

import createUserRouter from './create';
import loginUserRouter from './login';
import refreshUserRouter from './refresh';
import logoutUserRouter from './logout';
import removeUserRouter from './remove';
import twoFARouter from './2fa';
import profileRouter from './profile';

const userRouter: Express = express();

userRouter.use('/create', createUserRouter);
userRouter.use('/login', loginUserRouter);
userRouter.use('/refresh', refreshUserRouter);
userRouter.use('/logout', logoutUserRouter);
userRouter.use('/remove', removeUserRouter);
userRouter.use('/2fa', twoFARouter);
userRouter.use('/profile', profileRouter);

export default userRouter;
