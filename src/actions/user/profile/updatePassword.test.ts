import request from 'supertest';
import { createUser } from '../../../testUtils/dbUser';
import { createSession } from '../../../testUtils/session';
import application from '../../../application';
import setCookies from '../../../testUtils/setCookies';
import { ERROR_PASSWORD_NOT_CORRECT, SUCCESS } from '../../../constants/user';

describe('check api password change', () => {
  it('if password correct we change him', async () => {
    expect.assertions(2);

    const password = '12121212';
    const user = await createUser({ password });
    const { accessToken, refreshToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/profile/updatePassword/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({ password, newPassword: '11111111' });

    expect(result.status).toStrictEqual(200);
    expect(result.body.info).toStrictEqual(SUCCESS);

    await user.remove();
  });
  it('if password not correct we send error', async () => {
    expect.assertions(2);

    const user = await createUser({ password: '12312312' });
    const { accessToken, refreshToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/profile/updatePassword/')
      .set('Cookie', setCookies(accessToken, refreshToken))
      .send({ password: 'wrong password', newPassword: '11111111' });

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(ERROR_PASSWORD_NOT_CORRECT);
  });
});
