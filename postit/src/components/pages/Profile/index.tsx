//will use subscriptionById and postsById
import React from 'react';
import { PostContainer } from '../../postsContainer';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { getUsersById } from '../../../apis/user';
import img from './1.png';
import { SubscriberCard } from '../../subscriberCard/index';
import { getPostsByUserId } from '../../../apis/posts';
import ReactS3Uploader from 'react-s3-uploader';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { UserState } from '../../../redux/user/userReducer';
import { connect } from 'react-redux';
// import { Pic } from "../../../fileUpdoad";

interface IUserProfileState {
  response: User;
  posts: Post[];
  data: boolean;
}

class UserProfileComponent extends React.Component<any, IUserProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: new User(0, '', '', ''),
      posts: [],
      data: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      response: await getUsersById(this.props.currUser.userId),
      posts: await getPostsByUserId(this.props.currUser.userId),

      data: true,
    });
  };

  // changePic = async (e: any) => {
  //   e.preventDefault();
  //   const updateUserObj = new User(
  //     this.state.response.userId,
  //     this.state.response.username,
  //     this.state.response.alias,
  //     this.state.response.role,
  //     this.state.response.password,
  //     e.currentTarget.value
  //   );
  //   this.setState({
  //     response:await updateUser(updateUserObj)
  //   })
  // };

  render() {
    return (
      <Container className='center' style={{ overflowY: 'auto' }}>
        <Row>
          <Col md={2}>
            <img src={img} />
          </Col>
          <Col md={10}>
            <h1>{this.state.response.username} </h1>
            <h2>i don't know what to display</h2>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Container>
              {/* <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard />
              <SubscriberCard /> */}
            </Container>
          </Col>
          <Col md={7}>
            {this.state.data ? (
              <PostContainer posts={this.state.posts}></PostContainer>
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
    ...state,
  };
};

export const UserProfile = connect(mapStateToProps)(UserProfileComponent);
