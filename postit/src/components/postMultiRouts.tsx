import React from 'react';
import { Switch, Route, Router } from 'react-router';
import { Nav, Navbar, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { CreatePostForm } from './createPostForm';
import { PostContainer } from './postsContainer';
import { SearchPage } from './pages/Search';

export class PostMultiRoute extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pathUrl: '',
    };
  }

  render() {
    return (
      <>
        <Navbar expand='md'>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink to='/allPosts' hidden={!this.props.loggedInUser}>
                <Button>posts</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/posts' hidden={!this.props.loggedInUser}>
                <Button>new post</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/posts/postid' hidden={!this.props.loggedInUser}>
                <Button> Post Id</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/posts/user' hidden={!this.props.loggedInUser}>
                <Button> User Id</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/posts/subscribeeId'
                hidden={!this.props.loggedInUser}
              >
                <Button>subscribee Id</Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path={`${this.props.path}`}>
            {this.props.loggedInUser ? (
              <CreatePostForm
                path={`${this.props.path}`}
                loggedInUser={this.props.loggedInUser}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>

          <Route path={`${this.props.path}/user`}>
            {this.props.loggedInUser ? (
              <SearchPage path={`${this.props.path}/user`} />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>

          <Route path={`${this.props.path}/allposts`}>
            {this.props.loggedInUser ? (
              <PostContainer
                posts={[]}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>
          <Route path={`${this.props.path}/postid`}>
            {this.props.loggedInUser ? (
              <PostContainer
                posts={[]}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>
          <Route path={`${this.props.path}/subscribeeId`}>
            {this.props.loggedInUser ? (
              <PostContainer
                posts={[]}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>
        </Switch>
      </>
    );
  }
}
