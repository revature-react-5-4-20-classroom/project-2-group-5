import React from 'react';
import { User } from '../../models/user';
import img from './1.png';
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
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  updateUser,
  uploadfrofilePic,
  getImage,
  deleteUser,
} from '../../apis/user';

class UpdateUserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: this.props.currUser.userId,
      username: this.props.currUser.username,
      alias: this.props.currUser.alias,
      role: this.props.currUser.role,
      password: this.props.currUser.role,
      response: 'Any',
      profilePic: img,
    };
  }
  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  updateInfo = async (e: any) => {
    e.preventDefault();
    try {
      const newUser = new User(
        this.state.userId,
        this.state.username,
        this.state.alias,
        'this.state.role,',
        this.state.password
      );
      console.log(
        this.state.userId,
        this.state.username,
        this.state.alias,
        'this.state.role,',
        this.state.password
      );

      this.setState({
        response: await updateUser(newUser),
      });
    } catch (err) {
      console.log(err);
    }
  };
  changeProfilepic = async (e: any) => {
    e.preventDefault();
    this.setState({
      message: await uploadfrofilePic(
        this.props.currUser.userId,
        e.currentTarget.value
      ),
      profilePic: await getImage(this.props.currUser.userId),
    });
  };
  deleteUseracc = async (e: any) => {
    e.preventDefault();
    this.setState({
      response: await deleteUser(this.props.currUser.userId)
    });
  };
  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <img src={img}></img>
        <br />
        <Input type='file' onChange={this.changeProfilepic}></Input>
        <Form className='center'>
          <FormGroup>
            <Label for='username'>Username:</Label>
            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.username}
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='username'>Alias:</Label>
            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.alias}
              type='text'
              name='alias'
              id='alias'
              placeholder='Alias'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for='text'>Password:</Label>

            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.password}
              type='text'
              name='password'
              id='password'
              placeholder='Password'
              required
            />
          </FormGroup>

          <FormGroup
          // style={{
          //   display: this.props.currUser.role == 'admin' ? 'block' : 'none',
          // }}
          >
            <Label for='role'>Role:</Label>

            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.role}
              type='text'
              name='role'
              id='role'
              placeholder='Role'
              required
            />
          </FormGroup>

          <Button color='secondary' onClick={this.updateInfo}>
            Update
          </Button>
          <Button color='secondary' onClick={this.deleteUseracc}>
            delete
          </Button>
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

export const UpdateUserInfo = connect(mapStateToProps)(UpdateUserInfoComponent);

// delete user
// constructor(props: any) {
//     super(props);
//     this.state = {
//       userId: this.props.currUser.userId,
//       username: this.props.currUser.username,
//       alias: this.props.currUser.alias,
//       reole: this.props.currUser.role,
//       password: this.props.currUser.password,
//       response: 'Any',
//     };
//   }

//   deleteUser = async (e: any) => {
//     e.preventDefault();
//     const newUser = new User(
//       this.state.userId,
//       this.state.username,
//       this.state.alias,
//       this.state.role,
//       this.state.password
//     );
//     this.setState({
//       response: await deleteUser(newUser),
//     });
//   };
