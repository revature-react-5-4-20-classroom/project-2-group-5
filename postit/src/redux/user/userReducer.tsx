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
    case LOGIN_SUCCESS: {
      const u = action.payload.user;
      if (!u) {
        return state;
      } else {
        let fetchedUser = new User(u.userId, u.username, u.alias, u.role);
        return {
          currUser: fetchedUser,
        };
      }
    }
    case LOGIN_FAIL: {
      return {
        currUser: null,
      };
    }
    case SIGNUP_SUCCESS: {
      const u = action.payload.newUser;
      console.log('in reducer signup_success', u);
      let newUser = new User(u.userId, u.username, u.alias, u.role);
      if (!newUser) {
        return state;
      } else {
        return {
          currUser: newUser,
        };
      }
    }

    case SIGNUP_FAIL: {
      return {
        currUser: null,
      };
    }
    case LOGOUT: {
      return {
        currUser: null,
      };
    }
    default:
      console.log('default of reducer');
      return state;
  }
};
