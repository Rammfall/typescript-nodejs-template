import express, { Express } from 'express';

import twoFACodeRouter from './code';
import twoFARecoveryRouter from './recovery';
import twoFACreateRouter from './create';

const twoFARouter: Express = express();

twoFARouter.use('/code', twoFACodeRouter);
twoFARouter.use('/recovery', twoFARecoveryRouter);
twoFARouter.use('/create', twoFACreateRouter);

export default twoFARouter;
