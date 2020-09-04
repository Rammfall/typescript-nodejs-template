import { Response } from 'express';

export function cookieSet(
  res: Response,
  data: string[][],
  expires?: Date
): void {
  data.map((item) => {
    const [key, value] = item;
    return res.cookie(key, value, { httpOnly: true, expires });
  });
}
