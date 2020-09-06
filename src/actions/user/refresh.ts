import { Request, Response } from 'express';

export default async function refreshUserHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { accessToken, refreshToken } = req.cookies;
}
