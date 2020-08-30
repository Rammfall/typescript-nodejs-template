import { application } from '../../config';

const { port } = application;

export const PORT: number = +port;
export const ENV: string = process.env.ENV || 'development';
export const BCRYPT_NUM: number =
  (process.env.BCRYPT_NUM && +process.env.BCRYPT_NUM) || 10;
export const JWT_ACCESS_SECRET: string =
  process.env.JWT_ACCESS_SECRET || 'secret';
export const JWT_ACCESS_EXPIRED: string =
  process.env.JWT_ACCESS_EXPIRED || '15m';
export const REFRESH_TOKEN_EXPIRED: number =
  (process.env.REFRESH_TOKEN_EXPIRED && +process.env.REFRESH_TOKEN_EXPIRED) ||
  1000 * 60 * 60 * 24 * 75;
