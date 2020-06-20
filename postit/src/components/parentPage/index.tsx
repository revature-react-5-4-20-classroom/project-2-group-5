import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navigation } from '../../components/navbar';
import { PrivateRoutes } from '../../components/privateRoutes';
import { LoginPage } from '../../components/pages/Login';
import { SignupPage } from '../../components/pages/Signup';
import { User } from '../../models/user';
import { credentials } from '../../apis/login';
import { UserState } from '../../redux/user/userReducer';
import { signupUser, loginUser, logoutUser } from '../../redux/user/userActionMappers';
import { connect } from 'react-redux';

class ParentPageComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      initialized: false
    }
  }

  componentDidMount(){
    this.initialize();
  }

  async initialize(){
    let user : User = await credentials();
    await this.props.loginUser(user.username, user.password);
    this.setState({initialized: true});
  }

  render() {
    return (
      <>
        {this.state.initialized ?
            <div className='App'>
                <Router>
                <Navigation />
                <Switch>
                    <Route
                    path='/login'
                    render={(props: any) => {
                        return <LoginPage {...props} path='/login' />;
                    }}
                    />
                    <Route
                    path='/signup'
                    render={(props: any) => {
                        return <SignupPage {...props} path='/signup' />;
                    }}
                    />
                    <Route path='/logout'>
                    <Redirect to='/login' />
                    </Route>
                    <Route>
                    <PrivateRoutes />
                    </Route>
                </Switch>
                </Router>
            </div>

          :
          
          <></>
        }
      </>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state
  }
}

const mapDispatchToProps = {
  signupUser,
  loginUser,
  logoutUser
}

export const ParentPage = connect(mapStateToProps, mapDispatchToProps)(ParentPageComponent);
