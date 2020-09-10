import express, { Express } from 'express';

import twoFACodeRouter from './code';
import twoFARecoveryRouter from './recovery';
import twoFACreateRouter from './create';
import twoFAUpdateRouter from './update';
import twoFARemoveRouter from './remove';

const twoFARouter: Express = express();

twoFARouter.use('/code', twoFACodeRouter);
twoFARouter.use('/recovery', twoFARecoveryRouter);
twoFARouter.use('/create', twoFACreateRouter);
twoFARouter.use('/update', twoFAUpdateRouter);
twoFARouter.use('/remove', twoFARemoveRouter);

export default twoFARouter;
