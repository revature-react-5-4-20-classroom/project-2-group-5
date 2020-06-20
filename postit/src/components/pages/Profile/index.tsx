//will use subscriptionById and postsById
import React from 'react';
import { PostContainer } from '../../postsContainer';
import { Container, Row, Col, Button } from 'reactstrap';
import { getUsersById } from '../../../apis/user';
import img from './1.png';
import ReactS3Uploader from 'react-s3-uploader';
import { Post } from '../../../models/post';
import { User } from '../../../models/user';
import { UserState } from '../../../redux/user/userReducer';
import { connect } from 'react-redux';
import './style.css';
import { SubscribersContainer } from '../../subscribersContainer';
import { Subscription } from '../../../models/subscription';
import {
  deleteSubscriptions,
  getAllsubscription,
  createSubscriptions,
} from '../../../apis/subscriptions';

interface IUserProfileProps {
  currUser: User | null;
  reqUserId: number | null;
  path: any;
}

interface IUserProfileState {
  reqUser: User | null;
  subscribers: Subscription[];
  posts: Post[];
  data: boolean;
  isSubscribed: boolean;
  dbSubscriptionRow: Subscription | null;
  currProfile: number;
}

class UserProfileComponent extends React.Component<
  IUserProfileProps,
  IUserProfileState
> {
  constructor(props: IUserProfileProps) {
    super(props);
    this.state = {
      reqUser: null,
      subscribers: [],
      posts: [],
      data: false,
      isSubscribed: false,
      dbSubscriptionRow: null,
      currProfile:
        this.props.reqUserId !== null
          ? this.props.reqUserId
          : this.props.currUser!.userId,
    };
  }

  componentDidMount = async () => {
    console.log('this.props.reqUserId', this.props.reqUserId);
    console.log('state', this.props.currUser!.userId);
    let user = await this.getUser(this.state.currProfile);
    let isSub = await this.isSubscribedCheck(user.fetchedUser.userId);
    if (isSub) {
      this.setState({
        reqUser: user.fetchedUser,
        subscribers: user.fetchedSubscribers,
        posts: user.fetchedPosts,
      });
    } else {
      this.setState({
        reqUser: user.fetchedUser,
        subscribers: user.fetchedSubscribers,
        posts: user.fetchedPosts,
      });
    }
  };

  getUser = async (userId: number) => {
    let requestedUser = await getUsersById(userId);
    return requestedUser;
  };

  isSubscribedCheck = async (viewedUserId: number) => {
    let subArr: Subscription[] = await getAllsubscription();
    let exists = subArr.filter((s: any) => {
      return (
        s.subscriber.userId === this.props.currUser!.userId &&
        s.subscribee.userId === viewedUserId
      );
    });
    if (exists.length > 0) {
      this.setState({
        isSubscribed: true,
        dbSubscriptionRow: exists[0],
      });
      return true;
    } else {
      return false;
    }
  };

  subscribe = async () => {
    let sub: Subscription = new Subscription(
      0,
      this.props.currUser!.userId,
      this.state.reqUser!.userId,
      false
    );
    let newSubRow = await createSubscriptions(sub);
    console.log('NEWSUBROW: ', newSubRow);
    this.setState({
      // shouldUpdate: true,
      isSubscribed: true,
      dbSubscriptionRow: newSubRow,
    });
  };

  unsubscribe = async () => {
    let s = this.state.dbSubscriptionRow;
    let toDeleteSub = new Subscription(
      s!.subscriptionId,
      s!.subscriber,
      s!.subscribee,
      s!.blocked
    );
    await deleteSubscriptions(toDeleteSub);
    this.setState({
      // shouldUpdate: true,
      isSubscribed: false,
      dbSubscriptionRow: null,
    });
    // this.shouldComponentUpdate(this.props, this.state);
  };

  updateUser = (id: number) => {};

  render() {
    return (
      <Container className='main-container' style={{ overflowY: 'auto' }}>
        <Row>
          <Col xs={8} className='offset-2 center-div'>
            <Container className='profile-container'>
              <Row className='profile-info-row'>
                <Col xs={4} className=' center-div'>
                  <img
                    src={img}
                    alt='profile pic'
                    className='profile-profile-pic'
                  />
                </Col>
                <Col xs={8}>
                  <h1 className='profile-username'>
                    <u>{this.state.reqUser?.username}'s profile</u>
                  </h1>
                  {this.state.currProfile !== this.props.currUser!.userId ? (
                    [
                      this.state.isSubscribed ? (
                        <Button
                          color='danger'
                          className='profile-subbing'
                          onClick={this.unsubscribe}
                        >
                          <span className='button-text'>Unsubscribe</span>
                        </Button>
                      ) : (
                        <Button
                          color='success'
                          className='profile-subbing'
                          onClick={this.subscribe}
                        >
                          <span className='button-text'>Subscribe</span>
                        </Button>
                      ),
                    ]
                  ) : (
                    <> </>
                  )}
                </Col>
              </Row>
              <Row className='profile-container-row'>
                <Col xs={4}>
                  <div className='profile-subs-div center-div'>
                    {this.state.subscribers.length > 0 ? (
                      <SubscribersContainer
                        subsArray={this.state.subscribers}
                        type={'subscribee'}
                        blockUser={null}
                        unblockUser={null}
                        unsubscribe={null}
                      />
                    ) : (
                      <h5>
                        {this.state.reqUser?.username} has no subscribers, yet!
                        Why not subscribe?
                      </h5>
                    )}
                  </div>
                </Col>
                <Col xs={8}>
                  <div className='profile-posts-div'>
                    {this.state.posts.length > 0 ? (
                      <PostContainer posts={this.state.posts} />
                    ) : (
                      <h5>
                        {this.state.reqUser?.username} hasn't posted anything.
                      </h5>
                    )}
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

const UserProfile = connect(mapStateToProps)(UserProfileComponent);
export default UserProfile;
