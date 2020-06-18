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
} from "reactstrap";
import { getAllCommentsByPostId } from "../../apis/comments";

// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

export class Commnets extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: "any",
      cFlag: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.id),
      cFlag: true,
    });
  };
  newComment = async (id: number) => {
    const newComment = new Comment();
    this.setState({});
  };
  getComment = async (id: number) => {
    this.setState({
      comments: await getAllCommentsByPostId(this.props.id),
      cFlag: true,
    });
  };

  render() {
    return (
      <Container>
        {this.state.cFlag ? (
          <>
            {this.state.comments[0] !== undefined ? (
              <ul>
                {this.state.comments.map((obj: any, index: number) => {
                  return <li>{obj.content}</li>;
                })}
              </ul>
            ) : (
              <Spinner></Spinner>
            )}
          </>
        ) : (
          <h3>no comments to show</h3>
        )}
        {/* <Label>comment here:</Label> */}
        <h2>{this.props.postId}</h2>
        <Input
          type="text"
          placeholder="commnet here"
          // onKeyPress={(e) => {
          //   e.keyCode === 13
          //     ? this.newComment(this.state.comments.postid)
          //     : null;
          // }}
        />
      </Container>
    );
  }
}
