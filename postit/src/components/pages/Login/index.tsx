import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { Login } from '../../loginForm';

// site landing page for all guest users.  Will have conditionally rendered login/signup containers

export class LoginPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Container className='landing-container'>
        <Row className='h-100'>
          <Col className='left-panel' xs={8}></Col>
          <Col className='right-panel' xs={4}>
            <Row className='flex-container'>
              <h3 className='title-text'>Sign In</h3>
            </Row>
            <Row className='login-form'>
              <Login history={this.props.history} />
            </Row>
            <Row className='flex-container'>
              <p className='sub-text'>
                Don't have an account? <br />
                Sign Up <a href='/signup'>here</a>!
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
