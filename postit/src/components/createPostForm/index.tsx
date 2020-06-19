import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import { Post } from "../../models/post";
import { addNewPost } from "../../apis/posts";
import { UserState } from "../../redux/user/userReducer";
import { connect } from "react-redux";

// Component that has form to take in title and content

class CreatePostFormComponents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postId: 0,
      author: 0, //this.props.currentUser.userId,
      username: "", // this.props.currUser.Username,
      datePosted: 2020,
      title: "",
      content: "",
      response: "any",
    };
  }

  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  submitPost = async (e: any) => {
    e.preventDefault();
    const newPost = new Post(
      0,
      this.props.currUser.userId,
      this.props.currUser.username,
      2020,
      // new Date().toISOString().substring(0, 10),
      this.state.title,
      this.state.content
    );
    this.setState({
      response: await addNewPost(newPost),
      title: "",
      content: "",
    });
  };

  render() {
    return (
      <div className="container">
        <Col md={{ size: 8, offset: 2 }}>
          <Form onSubmit={this.submitPost}>
            <FormGroup>
              <Label>Titile:</Label>
              <Input
                value={this.state.title}
                name="title"
                id="name"
                placeholder="Title"
                onChange={this.bindInputChangeToState}
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>post:</Label>
              <Input
                type="textarea"
                value={this.state.content}
                placeholder="Post"
                name="content"
                id="content"
                onChange={this.bindInputChangeToState}
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button color="secondary">Submit</Button>
            </FormGroup>
          </Form>
        </Col>
      </div>
    );
  }
}
const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const CreatePostForm = connect(mapStateToProps)(
  CreatePostFormComponents
);
