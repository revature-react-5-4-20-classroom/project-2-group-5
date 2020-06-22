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
import {
  updateUser,
  uploadfrofilePic,
  deleteUser,
  getUsersById,
} from "../../apis/user";
import { Link } from "react-router-dom";

class UpdateUserInfoComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userId: this.props.currUser.userId,
      username: this.props.currUser.username,
      alias: this.props.currUser.alias,
      role: this.props.currUser.role,
      password:'',
      response: "Any",
      profilePic: img,
    };
  }


  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  bindInputChangeToState1 = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      file: changeEvent.target.files[0],
    });
  };
  updateInfo = async (e: any) => {
    e.preventDefault();
    if(this.state.password.length==0){return }
    try {
      const newUser = new User(
        this.state.userId,
        this.state.username,
        this.state.alias,
        this.state.role,
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
    // const formData = new FormData();
    // formData.append("file" , this.state.file);

    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", this.state.file);

    this.setState({
      message: await uploadfrofilePic(this.props.currUser.userId, formData),
      //profilePic: await getImage(this.props.currUser.userId),
    });
    console.log("front end", this.state.file.name);
  };
  deleteUseracc = async (e: any) => {
    e.preventDefault();
    this.setState({
      response: await deleteUser(this.props.currUser.userId),
    });
  };
  setPassword=(e:any)=>{
    this.setState({
      password:e.currentTarget.value,
    })
  }

  render() {
    return (
      <Col md={{ size: 8, offset: 2 }}>
        <img src={`http://18.191.138.4:8081/pics/${this.state.userId}`}></img>
        <br />
        <Form enctype="multipart/form-data">
          <Input
            type="file"
            accept="image/*"
            name="file"
            id="name"
            visbility="hidden"
            onChange={this.bindInputChangeToState1}
          ></Input>
        </Form>
        <button onClick={this.changeProfilepic}>upload</button>
        <br />
        <br />
        <Form className="center" onSubmit={this.updateInfo}>
          <FormGroup>
            <Label for="username" pp>
              Username:
            </Label>
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
              value={this.state.alias}
              type="text"
              name="alias"
              id="alias"
              placeholder="Alias"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="text">Password:</Label>
            <Input
              onChange={this.setPassword}
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              placeholder="Password"
              required
            />
          </FormGroup>
          
          <FormGroup
            style={{
              display: this.props.currUser.role == "admin" ? "block" : "none",
            }}
          >
            <Label for="role">Role:</Label>

            <Input
              onChange={this.bindInputChangeToState}
              value={this.state.role}
              type="text"
              name="role"
              id="role"
              placeholder="Role"
              required
            />
          </FormGroup>
          <Row>
            <Col>
              {" "}
              <Button color="secondary" >
                Update
              </Button>
            </Col>
            <Col>
              <Link to="/signup">
                <Button color="secondary" onClick={this.deleteUseracc}>
                  delete
                </Button>
              </Link>
            </Col>
          </Row>
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
