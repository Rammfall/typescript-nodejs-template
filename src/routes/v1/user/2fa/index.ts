import express, { Express } from 'express';

import twoFACodeRouter from './code';
import twoFARecoveryRouter from './recovery';

const twoFARouter: Express = express();

twoFARouter.use('/code', twoFACodeRouter);
twoFARouter.use('/recovery', twoFARecoveryRouter);

export default twoFARouter;
