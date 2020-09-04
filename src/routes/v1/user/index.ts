import express, { Express } from 'express';

import createUserRouter from './create';
import loginUserRouter from './login';

const userRouter: Express = express();

userRouter.use('/create', createUserRouter);
userRouter.use('/login', loginUserRouter);

export default userRouter;
