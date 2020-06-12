import { User } from '../../../models/user';
import { AnyAction } from 'redux';

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
    case userActionTypes.LOGIN: {
      return a;
    }
    default:
      //Leaves state alone if there are no action matches
      return state;
  }
};
