import express, { Express } from 'express';

import createUserRouter from './create';

const userRouter: Express = express();

userRouter.use('/create', createUserRouter);

export default userRouter;
