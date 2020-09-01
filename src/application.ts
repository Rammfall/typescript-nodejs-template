import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'reflect-metadata';

import './db';
import applicationRouter from './routes';

const application = express();

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.use(cors());
application.use(cookieParser());
application.use(helmet());
application.use('/api', applicationRouter);

export default application;
