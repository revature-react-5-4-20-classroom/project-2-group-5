import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { UserState } from '../../redux/user/userReducer';
import { connect } from 'react-redux';
import { SubscribersPage } from '../pages/Subscribers';
import { MessagesPage } from '../pages/Messages';
import { Home } from '../pages/Home';
import { UserProfile } from '../pages/Profile';
import { CreatePostForm } from '../createPostForm';
import { PostContainer } from '../postsContainer';
import { SearchPage } from '../pages/Search';

class PrivateRoutesComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/'>
          {this.props.isAuthenticated === true ? (
            <Redirect to='/home' />
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
        <Route path='/home'>
          {this.props.isAuthenticated === true ? (
            <Home path='/home' />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route path='/users'>
          {this.props.isAuthenticated === true ? (
            <UserProfile path='/users' />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route path='/post'>
          {this.props.isAuthenticated === true ? (
            <SearchPage path='/post' />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route path='/subscribers'>
          {this.props.isAuthenticated === true ? (
            <SubscribersPage path='/subscribers' />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route path='/messages'>
          {this.props.isAuthenticated === true ? (
            <MessagesPage path='/messages' userId={this.props.currUser.userId} />
          ) : (
            <Redirect to='/' />
          )}
        </Route>
        <Route
          path='*'
          render={(props: any) => {
            return <Redirect to='/' />;
          }}
        ></Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const PrivateRoutes = connect(mapStateToProps)(PrivateRoutesComponent);
