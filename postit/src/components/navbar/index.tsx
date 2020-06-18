import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export class Navigation extends React.Component<any, any> {
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
                className='nav-link'
                activeClassName='active'
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                hidden={!this.props.loggedInUser}
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
                hidden={!this.props.loggedInUser}
                className='nav-link'
                to='/search'
              >
                search
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                color='secondary'
                activeClassName='active'
                hidden={!!this.props.loggedInUser}
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
                hidden={!!this.props.loggedInUser}
                className='nav-link'
                to='/signup'
              >
                signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                activeClassName='active'
                hidden={!this.props.loggedInUser}
                className='nav-link'
                to='/login'
                onClick={this.props.logoutUser}
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
