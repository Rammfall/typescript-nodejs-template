import { application } from '../../config';

const {
  port,
  environment,
  bcryptSalt,
  twoFaToken,
  refreshTokenExpired,
  jwtAccessSecret,
  jwtAccessExpired,
} = application;

export const PORT: number = +port;
export const ENV: string = environment;
export const BCRYPT_NUM: number = +bcryptSalt;
export const TWO_FA_TOKEN: string = twoFaToken;
export const JWT_ACCESS_SECRET: string = jwtAccessSecret;
export const JWT_ACCESS_EXPIRED: string = jwtAccessExpired;
export const REFRESH_TOKEN_EXPIRED: number = +refreshTokenExpired;
