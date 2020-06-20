import React from "react";
import { User } from "../../models/user";
import img from "./1.png";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { UserState } from "../../redux/user/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { addNewUser } from "../../apis/user";

class UpdateUserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: this.props.currUser.userId,
      username: this.props.currUser.username,
      alias: this.props.currUser.alias,
      reole: this.props.currUser.role,
      password: this.props.currUser.password,
      response: "Any",
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
    const newUser = new User(
      this.state.userId,
      this.state.username,
      this.state.alias,
      this.state.role,
      this.state.password
    );
    this.setState({
      response: await addNewUser(newUser),
    });
  };

  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <Form className="center">
          {/* <img src={img}></img> */}
          <FormGroup>
            <Label for="username">Username:</Label>
            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Alias:</Label>
            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password:</Label>

            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </FormGroup>

          <Button color="secondary" onClick={this.updateInfo}>
            Update
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
//       response: "Any",
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