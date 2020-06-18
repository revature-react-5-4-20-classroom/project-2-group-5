import React from "react";
import { Post } from "../../models/post";
import img from "./1.png";
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
  Button,
  CardText,
} from "reactstrap";
import { getAllCommentsByPostId } from "../../apis/comments";
import { Commnets } from "../comments";
// import { Commnets } from "";
// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

export class PostContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postId: "any",
      cFlag: false,
      
    };
  }
  componentDidMount = async () => {
    //await getPostsById(this.props.userId);
  };
  getPostsById = async () => {};

  // newComment = async (id: number) => {
  //   const newComment = new Comment();
  //   this.setState({});
  // };
  showComment = async (id: number) => {
    this.setState({
      postId: id,
      cFlag:(this.state.cFlag)?false:true
     
    });
  };

  render() {
    return (
      <Container style={{ textAlign: "left" }}>
        <h3>Discover: </h3>
        <Card className="card mb-3 ">
          {this.props.postObject.map((obj: any, index: number) => {
            return (
              <>
                <Row className="">
                  <Col md={2}>
                    <CardImg src={img} alt="profile pic" />
                  </Col>
                  <Col md={6}>
                    <CardBody className="">
                      {/* //need to change post class in models because backend sends whole user object */}
                      <CardTitle>
                        <h4>{obj.username}</h4>
                      </CardTitle>
                      <CardText>{obj.content}</CardText>
                      <CardText className="card-text">
                        <small className="">
                          <Button
                            onClick={(e) => {
                              this.showComment(obj.postId);
                            }}
                          >
                            {" "}
                            comments
                          </Button>
                        </small>
                      </CardText>
                      <Card >
                        {this.state.cFlag && this.state.postId == obj.postId ? (
                          <Commnets id={this.state.postId} />
                        ) : (
                          <></>
                        )}
                      </Card>
                    </CardBody>
                  </Col>
                </Row>
              </>
            );
          })}
        </Card>
      </Container>
    );
  }
}
