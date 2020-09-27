import { compare } from 'bcrypt';

import hashPassword from './hashPassword';

describe('hashing password', () => {
  it('can return string hash', async () => {
    expect.assertions(1);
    expect(await compare('123123', await hashPassword('123123'))).toStrictEqual(
      true
    );
  });
});
