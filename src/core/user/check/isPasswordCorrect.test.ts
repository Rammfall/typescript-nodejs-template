import { createUser } from '../../../testUtils/dbUser';
import { isPasswordCorrect } from './isPasswordCorrect';

describe('checking password correct', () => {
  it('all cases', async () => {
    expect.assertions(2);

    const user = await createUser({ password: '12341234' });
    expect(await isPasswordCorrect(user, '12341234')).toStrictEqual(true);
    expect(await isPasswordCorrect(user, '0000000')).toStrictEqual(false);

    await user.remove();
  });
});
