import { createUser } from '../../../testUtils/dbUser';
import updatePassword from './updatePassword';
import User from '../../../db/entity/User';

describe('check core password change', () => {
  it('if password correct we change him', async () => {
    expect.assertions(2);

    const user = await createUser({ password: '12312312' });
    const { password } = user;
    const result = await updatePassword(user, '12312312', '11111111');

    expect(result).toStrictEqual(true);
    expect(
      (await User.findOne({ id: user.id }))?.password !== password
    ).toStrictEqual(true);

    await user.remove();
  });

  it('if password not correct function return false', async () => {
    expect.assertions(2);

    const user = await createUser({ password: '12312312' });
    const { password } = user;
    const result = await updatePassword(user, '12121212', '11111111');

    expect(result).toStrictEqual(false);
    expect(
      (await User.findOne({ id: user.id }))?.password === password
    ).toStrictEqual(true);

    await user.remove();
  });
});
