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
  isAuthenticated: boolean;
}

const initialUserState: UserState = {
  currUser: null,
  isAuthenticated: false,
};

export const userReducer = (
  state: UserState = initialUserState,
  action: AnyAction
): UserState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const u = action.payload.user;
      if (!u) {
        return {
          ...state,
          isAuthenticated: false,
        };
      } else {
        let fetchedUser = new User(u.userId, u.username, u.alias, u.role);
        return {
          currUser: fetchedUser,
          isAuthenticated: true,
        };
      }
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case SIGNUP_SUCCESS: {
      const u = action.payload.newUser;
      let newUser = new User(u.userId, u.username, u.alias, u.role);
      if (!newUser) {
        return {
          ...state,
          isAuthenticated: false,
        };
      } else {
        return {
          currUser: newUser,
          isAuthenticated: true,
        };
      }
    }

    case SIGNUP_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case LOGOUT: {
      return {
        currUser: null,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};
