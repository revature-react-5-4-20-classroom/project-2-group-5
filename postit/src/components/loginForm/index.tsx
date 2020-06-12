import React from 'react';
import { User } from '../../models/user';
import { login } from '../../apis/login';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

// Component that has form that takes username/password and has login button

export class Login extends React.Component<any, any> {
  setusername = (un: any) => {
    this.setState({
      username: un.currentTarget.value,
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
  attemptLogin = async (event: any) => {
    event.preventDefault();
    // console.log(event);
    try {
      const loggedInUser: User = await login(
        this.state.username,
        this.state.password
      );
      this.props.updateUser(loggedInUser);
      this.props.history.push('/home');
    } catch (error) {
      this.setState({
        password: '',
        isError: true,
        errorMessage: error.message,
      });
    }
  };
  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <Form className='center' onSubmit={this.attemptLogin}>
          <FormGroup>
            <Label for='username'>Username:</Label>

            {/* onChange lets Input change state, value lets Input display state */}
            <Input
              onChange={this.setusername}
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
            <Button color='secondary'>Submit</Button>
          </FormGroup>
        </Form>
      </Col>
    );
  }
}
