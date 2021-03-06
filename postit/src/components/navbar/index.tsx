import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { UserState } from '../../redux/user/userReducer';
import { logoutUser } from '../../redux/user/userActionMappers';
import { connect } from 'react-redux';
import { logout } from '../../apis/login';

export class NavigationComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  logout = async (event: any) => {
    logout();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <Navbar color='light' light expand='md'>
          <Link className='navbar-brand' to='/'>
            PostIt
          </Link>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink
                to='/home'
                color='secondary'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                activeClassName='active'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/profile'
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/post'
              >
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/subscribers'
              >
                Subscribers
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/messages'
              >
                Messages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/createpost'
              >
                Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.currUser}
                className='nav-link'
                to='/login'
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={this.props.currUser}
                className='nav-link'
                to='/signup'
              >
                Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName='active'
                hidden={this.props.isAuthenticated === false}
                className='nav-link'
                to='/logout'
                onClick={this.logout}
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  logoutUser,
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent);
