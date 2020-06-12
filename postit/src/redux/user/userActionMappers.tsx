import { User } from '../../models/user';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

export const signupUser = (user: User) => {
  return {
    // this return is a placeholder!  Use trycatch below
    type: SIGNUP_SUCCESS,
    payload: {
      user,
    },
  };
  // try {
  //     const response = await axios.post('/signup', user);
  //     return {
  //         type: SIGNUP_SUCCESS,
  //         payload: {
  //             response.data
  //         }
  //     }
  // } catch (error) {
  //     return {
  //         type: SIGNUP_FAIL,
  //         payload: {
  //             error
  //         }
  // }
};

export const loginUser = (username: string, password: string) => {
  // Below variable and return are placeholders!  User try/catch below!!!
  let user: User = new User(1000, username, 'fake', password, 'fake)');
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
  // try {
  //     const response = await axios.post('/login', user);
  //     return {
  //         type: LOGIN_SUCCESS,
  //         payload: {
  //             response.data
  //         }
  //     }
  // } catch (error) {
  //     return {
  //         type: LOGIN_FAIL,
  //         payload: {
  //             error
  //         }
  // }
};

export const logoutUser = () => {
  return { type: LOGOUT };
};
