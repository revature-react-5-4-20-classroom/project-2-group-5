//will use subscriptionById and postsById
import React from 'react';
import { PostContainer } from '../../postsContainer';
import { Container, Row, Col, Spinner, Button } from 'reactstrap';
import { getUsersById } from '../../../apis/user';
import img from './1.png';
import { SubscriberCard } from '../../subscriberCard/index';
import { getPostsByUserId } from '../../../apis/posts';
import ReactS3Uploader from 'react-s3-uploader';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { UserState } from '../../../redux/user/userReducer';
import { connect } from 'react-redux';
import './style.css';
import { SubscribersContainer } from '../../subscribersContainer';
import { Subscription } from '../../../models/subscription';
// import { Pic } from "../../../fileUpdoad";

interface IUserProfileState {
  reqUser: User | null;
  subscribers: Subscription[];
  posts: Post[];
  data: boolean;
  isSubscribed: boolean;
  currProfile: number;
}

class UserProfileComponent extends React.Component<any, IUserProfileState> {
  constructor(props: any) {
    super(props);
    this.state = {
      reqUser: null,
      subscribers: [],
      posts: [],
      data: false,
      isSubscribed: false,
      currProfile: 0,
    };
  }

  componentDidMount = async () => {
    this.getUser(this.props.currUser.userId);
  };

  getUser = async (userId: number) => {
    let requestedUser = await getUsersById(userId);
    console.log('req user from profile page: ', requestedUser);
    return requestedUser;
    this.setState({
      reqUser: requestedUser.fetchedUser,
      subscribers: requestedUser.fetchedSubscribers,
      posts: requestedUser.fetchedPosts,
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

  updateUser = (id: number) => {};

  render() {
    return (
      <Container className='main-container' style={{ overflowY: 'auto' }}>
        <Row>
          <Col xs={8} className='offset-2 center-div'>
            <Container className='profile-container'>
              <Row>
                <Col xs={3}>
                  <img
                    src={img}
                    alt='profile pic'
                    className='post-profile-pic'
                  />
                </Col>
                <Col xs={9}>
                  <h1>USERNAME</h1>
                  {this.state.currProfile !== this.props.currUser.userId ? (
                    [
                      this.state.isSubscribed ? (
                        <Button>Unsubscribe</Button>
                      ) : (
                        <Button>Subscribe</Button>
                      ),
                    ]
                  ) : (
                    <> </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <div className='profile-subs-div'>
                    {/* <SubscribersContainer 
                      subsArray={this.state.subscribers} 
                      type={'subscriber'} 
                      /> */}
                  </div>
                </Col>
                <Col xs={9}>
                  <div className='profile-posts-div'>
                    {/* <PostContainer posts={posts} /> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
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
