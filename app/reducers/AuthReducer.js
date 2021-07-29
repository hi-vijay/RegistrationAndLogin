import {TYPES} from '../actions/types';

const INTIAL_STATE = {
  userName: '',
  userPassword: '',
  mail: '',
  authToken: '',
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        ...state,
        userName: action.userName,
        authToken: action.authToken,
        mail: action.mail,
      };
    case TYPES.REGISTER:
      return {
        ...state,
        userPassword: action.payload.password,
        userName: action.payload.userName,
        mail: action.payload.mail,
      };
    case TYPES.LOGOUT:
      return {
        ...state,
        authToken: null,
        userPassword: '',
        userName: '',
        mail: '',
      };
    default:
      return {...state};
  }
};
