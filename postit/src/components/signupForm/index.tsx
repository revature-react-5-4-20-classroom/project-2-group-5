import React from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.

export class SignUp extends React.Component<any, any> {
  setEmail = (un: any) => {
    this.setState({
      email: un.currentTarget.value,
    });
  };
  setuserName = (un: any) => {
    this.setState({
      userName: un.currentTarget.value,
    });
  };
  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    });
  };

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
    });
  };
  addNewUser = () => {};

  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <Form className='center'>
          <FormGroup>
            <Label for='email'>Email:</Label>

            {/* onChange lets Input change state, value lets Input display state */}
            <Input
              onChange={this.setEmail}
              //value={this.state.email}
              type='email'
              name='email'
              id='email'
              placeholder='email'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='username'>Username:</Label>

            {/* onChange lets Input change state, value lets Input display state */}
            <Input
              onChange={this.setuserName}
              //value={this.state.username}
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password:</Label>

            <Input
              onChange={this.setPassword}
              //value={this.state.password}
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              required
            />
          </FormGroup>
          <FormGroup>
            <Button color='secondary'>Sign Up</Button>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}
