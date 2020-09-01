import express, { Express } from 'express';

import userRouter from './user';

const v1: Express = express();

v1.use('/user', userRouter);

export default v1;
