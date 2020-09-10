import { authenticator } from 'otplib';
import { Base32SecretKey } from '@otplib/core/authenticator';

export function generateSecret(): Base32SecretKey {
  return authenticator.generateSecret();
}

export function generateToken(secret: Base32SecretKey): string {
  return authenticator.generate(secret);
}

export function verify(token: string, secret: Base32SecretKey): boolean {
  return authenticator.verify({ secret, token });
}

export function generateLink(email: string, secret: Base32SecretKey): string {
  return authenticator.keyuri(email, 'Template application', secret);
}
