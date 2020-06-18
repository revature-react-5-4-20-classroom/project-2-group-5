import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { Navigation } from './components/navbar';
import { Jumbotron } from 'reactstrap';
import { Login } from './components/loginForm';
import { UserProfile } from './components/pages/Profile';
import { User } from './models/user';
import { Home } from './components/pages/Home';
import { PostMultiRoute } from './components/postMultiRouts';
import { Provider } from 'react-redux';
import { store } from './redux/user/userStore';
import { LoginPage } from './components/pages/Login';
import { SignupPage } from './components/pages/Signup';
import { SubscribersPage } from './components/pages/Subscribers';
import { MessagesPage } from './components/pages/Messages';
import { SearchPage } from './components/pages/Search';

interface IAppState {
  loggedInUser: User | null;
}
export class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: null,
    };
  }

  updateUser = (user: User) => {
    console.log(user);
    this.setState({
      loggedInUser: user,
    });
  };
  logoutUser = () => {
    this.setState({
      loggedInUser: null,
    });
  };
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Router>
            <Navigation
              logoutUser={this.logoutUser}
              loggedInUser={this.state.loggedInUser}
            />
            <Switch>
              <Route exact path='/'>
                {this.state.loggedInUser ? (
                  <Redirect to='/home' />
                ) : (
                  <Redirect to='/login' />
                )}
              </Route>
              <Route
                path='/login'
                render={(props: any) => {
                  return (
                    <LoginPage
                      {...props}
                      path='/login'
                      updateUser={this.updateUser}
                    />
                  );
                }}
              />
              <Route
                path='/signup'
                render={(props: any) => {
                  return (
                    <SignupPage
                      {...props}
                      path='/login'
                      updateUser={this.updateUser}
                    />
                  );
                }}
              />
              <Route path='/home'>
                <Home loggedInUser={this.state.loggedInUser} path='/home' />
              </Route>
              <Route path='/subscribers'>
                {/* {this.state.loggedInUser && true ? ( */}
                <SubscribersPage path='/subscribers' />
                {/* ) : (
                  <h4>Please Login</h4>
                )} */}
              </Route>
              <Route path='/messages'>
                {/* {this.state.loggedInUser && true ? ( */}
                <MessagesPage path='/messages' />
                {/* ) : (
                  <h4>Please Login</h4>
                )} */}
              </Route>
              <Route loggedInUser={this.state.loggedInUser} path='/users'>
                {/* {this.state.loggedInUser && true ? ( */}
                  <UserProfile
                    loggedInUser={this.state.loggedInUser}
                    path='/home'
                  />
                {/* // ) : (
                //   <h4>Please Login</h4>
                // )} */}
              </Route>
              <Route>
                <PostMultiRoute
                  loggedInUser={this.state.loggedInUser}
                  path='/posts'
                />
              </Route>
              <Route path='/logout'></Route>
            </Switch>
          </Router>
        </div>
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
//     ...state.currUser
//   }
// }

// const mapDispatchToProps = {
//   signupUser,
//   loginUser,
//   logoutUser
// }

// export const testHigherOrderComp = connect(mapStateToProps, mapDispatchToProps)(COMPONENT);
