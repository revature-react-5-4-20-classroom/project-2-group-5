import React from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { UserState } from '../../redux/user/userReducer';
import { signupUser } from '../../redux/user/userActionMappers';
import { connect } from 'react-redux';
import { User } from '../../models/user';

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.

interface ISignupState {
  username: string;
  alias: string;
  password: string;
}

export class SignUpComponent extends React.Component<any, ISignupState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      alias: '',
      password: '',
    };
  }

  setUsername = (un: any) => {
    this.setState({
      username: un.currentTarget.value,
    });
  };
  setAlias = (un: any) => {
    this.setState({
      alias: un.currentTarget.value,
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
  addNewUser = async (event: any) => {
    event.preventDefault();
    console.log('in add new user function');
    if (
      this.state.username.length < 1 ||
      this.state.alias.length < 1 ||
      this.state.password.length < 1
    ) {
      return;
    }
    try {
      let newUser = new User(
        0,
        this.state.username,
        this.state.alias,
        'user',
        this.state.password
      );
      const createNewUser: User = await this.props.signupUser(newUser);
      this.setState({
        username: '',
        alias: '',
        password: '',
      });
      this.props.history.push('/home');
    } catch (error) {
      this.setState({
        username: '',
        alias: '',
        password: '',
      });
    }
  };

  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <Form className='center' onSubmit={this.addNewUser}>
          <FormGroup>
            <Label for='username'>Username:</Label>

            {/* onChange lets Input change state, value lets Input display state */}
            <Input
              onChange={this.setUsername}
              value={this.state.username}
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='username'>Username:</Label>

            {/* onChange lets Input change state, value lets Input display state */}
            <Input
              onChange={this.setAlias}
              value={this.state.alias}
              type='text'
              name='alias'
              id='alias'
              placeholder='Alias'
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
            <Button color='secondary'>Sign Up</Button>
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
  signupUser,
};

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpComponent);
