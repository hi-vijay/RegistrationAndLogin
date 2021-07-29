import {TYPES} from './types';

export const addUser = user => {
  return {
    type: TYPES.LOGIN,
    userName: user.userName,
    authToken: user.authToken,
    mail: user.mail,
  };
};
