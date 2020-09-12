import express, { Express } from 'express';

import removeSessionRouter from './remove';
import showSessionsRouter from './show';

const sessionsRouter: Express = express();

sessionsRouter.use('/remove', removeSessionRouter);
sessionsRouter.use('/show', showSessionsRouter);

export default sessionsRouter;
