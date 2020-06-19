import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/user/userStore';
import { ParentPage } from './components/parentPage';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ParentPage  />      
      </Provider>
    );
  }
}

export default App;

// TO USE STATE IN COMPONENT:

// We need to turn said component into a 'higher order' Component.  Do not export the Component
// you made.  Instead, copy/paste the below  code into your component (making sure to copy the
// imports [must change route to redux file!]:

// import { UserState } from "./redux/user/userReducer";
// import { signupUser, loginUser, logoutUser} from './redux/user/userActionMappers'
// import { connect } from 'react-redux';
// )
//
// Then using that last const, name component and insert local component where it says COMPONENT
//
// const mapStateToProps = (state: UserState) => {
//   return {
//     ...state
//   }
// }

// const mapDispatchToProps = {
//   signupUser,
//   loginUser,
//   logoutUser
// }

// export const testHigherOrderComp = connect(mapStateToProps, mapDispatchToProps)(COMPONENT);
