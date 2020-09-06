import express, { Express } from 'express';

import createUserRouter from './create';
import loginUserRouter from './login';
import refreshUserRouter from './refresh';
import twoFARouter from './2fa';

const userRouter: Express = express();

userRouter.use('/create', createUserRouter);
userRouter.use('/login', loginUserRouter);
userRouter.use('/refresh', refreshUserRouter);
userRouter.use('/2fa', twoFARouter);

export default userRouter;
