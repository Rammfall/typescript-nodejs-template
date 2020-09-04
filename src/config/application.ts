import { application } from '../../config';

const { port, environment, bcryptSalt } = application;

export const PORT: number = +port;
export const ENV: string = environment;
export const BCRYPT_NUM: number = +bcryptSalt;
export const JWT_ACCESS_SECRET: string =
  process.env.JWT_ACCESS_SECRET || 'secret';
export const JWT_ACCESS_EXPIRED: string =
  process.env.JWT_ACCESS_EXPIRED || '15m';
export const REFRESH_TOKEN_EXPIRED: number =
  (process.env.REFRESH_TOKEN_EXPIRED && +process.env.REFRESH_TOKEN_EXPIRED) ||
  1000 * 60 * 60 * 24 * 75;
