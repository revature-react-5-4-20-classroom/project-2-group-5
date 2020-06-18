//will use subscriptionById and postsById
import React from "react";
import { PostContainer } from "../../postsContainer";
import { Container, Row, Col, Spinner, Input } from "reactstrap";
import { getUsersById } from "../../../apis/user";
import img from "./1.png";
import { SubscriberCard } from "../../subscriberCard/index";
import { getPostsByUserId } from "../../../apis/posts";
import ReactS3Uploader from "react-s3-uploader";
import { connect } from "react-redux";
import { UserState } from "../../../redux/user/userReducer";
// import { Pic } from "../../../fileUpdoad";
class UserProfileComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: "any",
      posts: "any",
      data: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      response: await getUsersById(this.state.currUser.userId),
      posts: await getPostsByUserId(this.state.currUser.userId),
      
      data: true,
    });
  };

  getUser = async () => {};

  render() {
    return (
      <Container className="center" style={{overflowY:"auto"}}>
        <Row>
          <Col md={2}>
            <img src={img} />
            <Input type="file" onChange={this.changePic}/>
          </Col>
          <Col md={10}>
            <h1>{this.state.response.username} </h1>
            <h2>i don't know what to display</h2>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Container>
              <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard />
            </Container>
          </Col>
          <Col md={7}>
            {this.state.data ? (
              <PostContainer postObject={this.state.posts}></PostContainer>
            ) : (
              <Spinner></Spinner>
            )}
          </Col>
        </Row>

        {/* pass user ingormation as props */}
        {/* <PostContainer></PostContainer> */}
      </Container>
    );
  }
}

const mapStateToProps = (state: UserState) => {
  return {
    ...state
  }
}


export const UserProfile = connect(mapStateToProps)(UserProfileComponent);