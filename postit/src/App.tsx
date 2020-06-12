import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Jumbotron } from "reactstrap";
import { Login } from "./components/login";
import { UserProfile } from "./components/userProfile";
import { User } from "./models/user";
import { Home } from "./components/home";
import { PostMultiRoute } from "./components/postMultiRouts";
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
      <div className="App">
        <Router>
          <Navigation
            logoutUser={this.logoutUser}
            loggedInUser={this.state.loggedInUser}
          />
          <Jumbotron>
            <h1 className="display-4">
              <span role="img">Post your thoughts</span>
            </h1>
          </Jumbotron>
          <Switch>
            <Route exact path="/">
              {this.state.loggedInUser ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route
              path="/login"
              render={(props: any) => {
                return (
                  <Login
                    {...props}
                    path="/login"
                    updateUser={this.updateUser}
                  />
                );
              }}
            />
            <Route path="/home">
              {this.state.loggedInUser && true ? (
                <Home loggedInUser={this.state.loggedInUser} path="/home" />
              ) : (
                <h4>Please Login</h4>
              )}
            </Route>
            <Route loggedInUser={this.state.loggedInUser} path="/users">
              {this.state.loggedInUser && true ? (
                <UserProfile
                  loggedInUser={this.state.loggedInUser}
                  path="/home"
                />
              ) : (
                <h4>Please Login</h4>
              )}
            </Route>
            <Route>
              <PostMultiRoute
              loggedInUser={this.state.loggedInUser}
              path="/posts"
            />
            </Route>
            <Route path="/logout"></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
