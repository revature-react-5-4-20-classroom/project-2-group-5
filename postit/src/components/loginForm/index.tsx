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
import { UserState } from '../../redux/user/userReducer';
import { loginUser } from '../../redux/user/userActionMappers';
import { connect } from 'react-redux';

// Component that has form that takes username/password and has login button

interface ILoginState {
  username: string;
  password: string;
}

class LoginComponent extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

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

  // clearError = () => {
  //   this.setState({
  //     errorMessage: '',
  //     isError: false,
  //   });
  // };
  attemptLogin = async (event: any) => {
    event.preventDefault();
    let un = this.state.username;
    let pw = this.state.password;
    if (un.length < 1 || pw.length < 1) {
      return;
    }
    try {
      const loggedInUser: User = await this.props.loginUser(un, pw);
      this.setState({
        username: '',
        password: '',
      });
      // this.props.updateUser(loggedInUser);
      this.props.history.push('/home');
    } catch (error) {
      this.setState({
        password: '',
        // isError: true,
        // errorMessage: error.message,
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
              value={this.state.username}
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
              value={this.state.password}
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

const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
