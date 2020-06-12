import React from "react";
import { Switch, Route, Router } from "react-router";
import { Nav, Navbar, NavItem, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NewPost } from "./newPost";
import { PostById } from "./postsById";

export class PostMultiRoute extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      pathUrl: "",
    };
  }

  render() {
    return (
      <>
        <Navbar expand="md">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/allPosts" hidden={!this.props.loggedInUser}>
                <Button>posts</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/posts" hidden={!this.props.loggedInUser}>
                <Button>new post</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Posts/postid" hidden={!this.props.loggedInUser}>
                <Button> Post Id</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/posts/userId" hidden={!this.props.loggedInUser}>
                <Button> User Id</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/posts/subscribeeId"
                hidden={!this.props.loggedInUser}
              >
                <Button>subscribee Id</Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route path={`${this.props.path}`}>
            {this.props.loggedInUser ? (
              <NewPost
                path={`${this.props.path}`}
                loggedInUser={this.props.loggedInUser}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>

          <Route path={`${this.props.path}/userId`}>
            {this.props.loggedInUser ? (
              <PostById
                path={`${this.props.path}/userId`}
                loggedInUser={this.props.loggedInUser}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>

          <Route path={`${this.props.path}/allposts`}>
            {this.props.loggedInUser ? (
              <PostById
                loggedInUser={this.props.loggedInUser}
                path={`${this.props.path}`}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>
          <Route path={`${this.props.path}/postid`}>
            {this.props.loggedInUser ? (
              <PostById
                loggedInUser={this.props.loggedInUser}
                path={`${this.props.path}`}
              />
            ) : (
              <h4>Please Login</h4>
            )}
          </Route>
          <Route path={`${this.props.path}/subscribeeId`}>
            {this.props.loggedInUser ? (
              <PostById
                loggedInUser={this.props.loggedInUser}
                path={`${this.props.path}`}
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
