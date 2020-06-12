import { compose, applyMiddleware, Store, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './userReducer';

// ---- Let's use use Redux Dev Tools in Chrome --------
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Enabling 'thunk' middleware
const enhancer = composeEnhancers(applyMiddleware(thunk));

// Creating Store:
export const store: Store<any> = createStore(userReducer, enhancer);
