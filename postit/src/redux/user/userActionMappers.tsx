import { User } from '../../models/user';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

import { login } from '../../apis/login';
import { addNewUser } from '../../apis/user';
import { Dispatch } from 'redux';

export const signupUser = (user: User) => async (dispatch: Dispatch) => {
  console.log('in signup mapper');
  try {
    console.log('in mapper user: ', user);
    const newUser = await addNewUser(user);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        newUser,
      },
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: {
        error,
      },
    });
  }
};

export const loginUser = (username: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    const user = await login(username, password);
    if (user.userId) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user,
        },
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: {},
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: {
        error,
      },
    });
  }
};

export const logoutUser = () => {
  return { type: LOGOUT };
};
