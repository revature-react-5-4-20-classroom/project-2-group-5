import React from "react";
import {
  Container,
  Row,
  Card,
  Col,
  CardImg,
  CardBody,
  CardTitle,
  Label,
  Input,
  Spinner,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { getAllCommentsByPostId, createComment } from "../../apis/comments";
import { UserState } from "../../redux/user/userReducer";
import { connect } from "react-redux";
import { Comment } from "../../models/comment";
// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

class CommnetsComponents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: "any",
      cFlag: false,
      content: "",
    };
  }

  componentDidMount = async () => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.id),
      cFlag: true,
    });
  };
  newComment = async (e: any) => {
    e.preventDefault();
    // if (e.keyCode == 13) {

    const newComment = new Comment(
      0,
      this.props.id,
      this.state.currUser.userId,
      // this.state.currUser.userId,
      this.state.content
    );
    console.log(
      newComment.commentId,
      newComment.content,
      newComment.author,
      newComment.postId
    );

    this.setState({
      comment: await createComment(newComment),
    });
  };
  getComment = async () => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.id),
      cFlag: true,
    });
  };
  bindInputChangeToState = (changeEvent: any) => {
    //@ts-ignore
    this.setState({
      [changeEvent.currentTarget.name]: changeEvent.currentTarget.value,
    });
  };
  render() {
    return (
      <Container>
        {this.state.cFlag ? (
          <>
            {this.state.comments.length != 0 ? (
              <ul>
                {this.state.comments.map((obj: any, index: number) => {
                  return <li>{obj.content}</li>;
                })}
              </ul>
            ) : (
              <h3>no comments to show</h3>
            )}
          </>
        ) : (
          <Spinner></Spinner>
        )}
        <div style={{ display: this.state.curUser ? "block" : "none" }}>
          <InputGroup className="input-box">
            <Input
              type="text"
              placeholder="commnet here"
              name="content"
              onChange={this.bindInputChangeToState}
            ></Input>
            <InputGroupAddon addonType="append">
              <Button onClick={this.newComment}>post</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state: UserState) => {
  return {
    ...state,
  };
};

export const Commnets = connect(mapStateToProps)(CommnetsComponents);
