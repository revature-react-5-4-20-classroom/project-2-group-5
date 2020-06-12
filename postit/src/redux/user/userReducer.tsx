import { AnyAction } from 'redux';
import { User } from '../../models/user';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

export interface UserState {
  currUser: User | null;
}

const initialUserState: UserState = {
  currUser: null,
};

export const userReducer = (
  state: UserState = initialUserState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const fetchedUser = action.payload.user;
      if (!fetchedUser) {
        return state;
      } else {
        return {
          currUser: fetchedUser,
        };
      }
    case LOGIN_FAIL:
      return state;
    case SIGNUP_SUCCESS:
      const newUser = action.payload.user;
      if (!newUser) {
        return state;
      } else {
        return {
          currUser: newUser,
        };
      }
    case SIGNUP_FAIL:
      return state;
    case LOGOUT:
      return {
        currUser: null,
      };
    default:
      return state;
  }
};
