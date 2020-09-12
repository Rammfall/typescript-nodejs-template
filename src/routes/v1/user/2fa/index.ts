import express, { Express } from 'express';

import twoFACodeRouter from './code';
import twoFARecoveryRouter from './recovery';
import twoFACreateRouter from './create';
import twoFAUpdateRouter from './update';
import twoFARemoveRouter from './remove';
import auth from '../../../../middlewares/auth';

const twoFARouter: Express = express();

twoFARouter.use('/code', twoFACodeRouter);
twoFARouter.use('/recovery', twoFARecoveryRouter);
twoFARouter.use('/create', twoFACreateRouter);
twoFARouter.use('/update', auth, twoFAUpdateRouter);
twoFARouter.use('/remove', auth, twoFARemoveRouter);

export default twoFARouter;
