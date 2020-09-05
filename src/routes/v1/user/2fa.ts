import { Router, Request, Response } from 'express';
import * as yup from 'yup';

const TwoFARouter: Router = Router();

TwoFARouter.use('/');
TwoFARouter.post('/', (req: Request, res: Response) => {});

export default TwoFARouter;
