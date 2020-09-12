import * as yup from 'yup';

import validatePostBody from '../validation';

const authValidation = validatePostBody(
  {
    accessToken: yup.string().required(),
    refreshToken: yup.string().uuid().required(),
  },
  'cookies'
);

export default authValidation;
