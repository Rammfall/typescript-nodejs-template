import request from 'supertest';
import { createSession } from '../../../testUtils/session';
import { createUser } from '../../../testUtils/dbUser';
import application from '../../../application';
import setCookies from '../../../testUtils/setCookies';
import runNTimes from '../../../testUtils/runNTimes';

describe('checking get all sessions with', () => {
  it('logged user who has 3 session', async () => {
    expect.assertions(3);
    const user = await createUser();
    await runNTimes(5, async () => await createSession(user));
    const { accessToken, refreshToken } = await createSession(user);
    const result = await request(application)
      .post('/api/v1/user/sessions/show/')
      .set('Cookie', setCookies(accessToken, refreshToken));
    const { body } = result;

    expect(result.status).toStrictEqual(200);
    expect(typeof body.sessions === 'object').toStrictEqual(true);
    expect(body.sessions).toHaveLength(6);

    await user.remove();
  });
});
