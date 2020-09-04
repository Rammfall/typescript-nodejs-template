export function readCookie(cookie: string): string {
  return cookie.slice(cookie.indexOf('=') + 1, cookie.indexOf(';'));
}
