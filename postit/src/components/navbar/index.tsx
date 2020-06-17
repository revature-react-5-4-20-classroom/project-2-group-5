import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import { UserState } from '../../redux/user/userReducer';
import { logoutUser } from '../../redux/user/userActionMappers';
import { connect } from 'react-redux';

export class NavigationComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  logout = (e: any) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        {/*just writing the name of a prop is shorthand for prop={true}*/}
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>PostIt</NavbarBrand>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink
                to='/home'
                color='secondary'
                hidden={!this.props.currUser}
                className='nav-link'
                activeClassName='active'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                hidden={!this.props.currUser}
                className='nav-link'
                to='/user'
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={!this.props.currUser}
                className='nav-link'
                to='/posts/all'
              >
                Search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={!this.props.currUser}
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
                hidden={!this.props.currUser}
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
                hidden={this.props.currUser}
                className='nav-link'
                to='/login'
              >
                login
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
                signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName='active'
                hidden={!this.props.currUser}
                className='nav-link'
                to='/logout'
                onClick={this.logout}
              >
                logout
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
