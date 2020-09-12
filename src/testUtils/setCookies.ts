export default function setCookies(
  accessToken: string,
  refreshToken: string
): string[] {
  return [`accessToken=${accessToken};refreshToken=${refreshToken}`];
}
