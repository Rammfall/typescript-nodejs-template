import request from 'supertest';
import { name, internet } from 'faker';

import application from '../../application';
import { afterAllHook, beforeAllHook } from '../../testUtils/hooks';
import AppUser from '../../db/entity/AppUser';
import { createUser } from '../../testUtils/dbUser';
import { ERROR_MAIL_EXIST, ERROR_USERNAME_EXIST } from '../../constants/user';

describe('api test on create account', () => {
  const username = name.findName();
  const email = internet.email();

  beforeAll(async () => {
    await beforeAllHook();
  });

  afterAll(async () => {
    const user = await AppUser.findOne({ email });
    await user?.remove();
    await afterAllHook();
  });

  it('success request on route', async () => {
    expect.assertions(2);
    const result = await request(application)
      .post('/api/v1/user/create/')
      .send({ username, email, password: '11111111' });
    const user: AppUser | undefined = await AppUser.findOne({ email });
    const { username: usernameRequest, email: emailRequest } = result.body;

    expect(result.status).toStrictEqual(200);
    expect({ username: user?.username, email: user?.email }).toStrictEqual({
      username: usernameRequest,
      email: emailRequest,
    });
  });

  it('error with request not unique email', async () => {
    expect.assertions(2);
    const existUser: AppUser = await createUser();
    const { email: existEmail, username: existUsername } = existUser;

    const result = await request(application)
      .post('/api/v1/user/create/')
      .send({
        username: existUsername,
        email: existEmail,
        password: '11111111',
      });

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(ERROR_MAIL_EXIST);

    await existUser.remove();
  });

  it('error with request not unique username', async () => {
    expect.assertions(2);
    const existUser: AppUser = await createUser();
    const { username: existUsername } = existUser;

    const result = await request(application)
      .post('/api/v1/user/create/')
      .send({
        username: existUsername,
        email: 'existEmail@maik.ds',
        password: '11111111',
      });

    expect(result.status).toStrictEqual(400);
    expect(result.body.info).toStrictEqual(ERROR_USERNAME_EXIST);

    await existUser.remove();
  });

  it('test validation on routes', async () => {
    expect.assertions(2);

    const result = await request(application)
      .post('/api/v1/user/create/')
      .send({
        username: 'f',
        email: 'notEmail',
        password: '111',
      });

    expect(result.status).toStrictEqual(400);
    expect(result.body.errors).toStrictEqual([
      'username must be at least 2 characters',
      'email must be a valid email',
      'password must be at least 8 characters',
    ]);
  });
});
