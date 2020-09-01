import express, { Express } from 'express';

import v1 from './v1';

const applicationRouter: Express = express();

applicationRouter.use('/v1', v1);

export default applicationRouter;
