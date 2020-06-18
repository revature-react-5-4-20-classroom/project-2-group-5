import React from "react";
import { Post } from "../../models/post";
import img from "./1.png";
import { Container, Row, Card, Col, CardImg, CardBody, CardTitle } from "reactstrap";
// Component that will loop-render a certain amount of './post' components using
// data from grabbing the first few newest posts from DB.  Will need to be fed
// in what type of data from page component (subscriber posts, newest posts, search result posts);

interface IPostContainerProps{
  posts: Post[];
}

export class PostContainer extends React.Component<IPostContainerProps, any> {
  constructor(props: IPostContainerProps) {
    super(props);
  }
  componentDidMount = async () => {
    //await getPostsById(this.props.userId);
  };
  getPostsById = async () => {};

  render() {
    return (
      <Container style={{textAlign:"left"}}>
        <h3 >Discover: </h3>
        <Card className="card mb-3 ">
          {this.props.posts.map((obj) => {
            return (
              <div key={`pKey${obj.postId}`}>
                <Row className=""   >
                  <Col md={2}>
                    <CardImg src={img}  alt="profile pic" />
                  </Col>
                  <Col md={6}>
                    <CardBody className="">
                      {/* //need to change post class in models because backend sends whole user object */}
                      <CardTitle>{obj.username}</CardTitle>
                      <p className="card-text">{obj.content}</p>
                      <p className="card-text">
                        <small className="text-muted float-md-right">
                          check comments here
                        </small>
                      </p>
                    </CardBody>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Card>
      </Container>
    );
  }
}
