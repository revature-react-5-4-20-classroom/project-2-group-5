import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { SubscribersContainer } from '../../subscribersContainer';
import { connect } from 'react-redux';
import { UserState } from '../../../redux/user/userReducer';
import { Subscription } from '../../../models/subscription';
import {
  getAllsubscribee,
  getAllsubscriber,
  updateSubscriptions,
  deleteSubscriptions,
} from '../../../apis/subscriptions';

interface ISubscribersPageState {
  userSubscribersArray: Subscription[];
  userSubscriptionsArray: Subscription[];
  shouldUpdate: boolean;
}

export class SubscribersPageComponent extends React.Component<
  any,
  ISubscribersPageState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      userSubscribersArray: [],
      userSubscriptionsArray: [],
      shouldUpdate: false,
    };
  }

  componentDidMount() {
    this.retrieveSubscribers();
    this.retrieveSubscriptions();
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    if (this.state.shouldUpdate) {
      this.setState({
        shouldUpdate: false,
      });
      this.retrieveSubscribers();
      this.retrieveSubscriptions();
      return true;
    }
    return this.props !== nextProps || this.state !== nextState;
  }

  blockUser = async (subs: Subscription) => {
    let s = subs;
    let subscribee = subs.subscribeeId;
    let subscriber = subs.subscriberId;
    if (subscribee === undefined || subscriber === undefined) {
      return;
    }
    let toUpdateSub = new Subscription(
      s.subscriptionId,
      subscriber,
      subscribee,
      true
    );
    await updateSubscriptions(toUpdateSub);
    this.setState({
      shouldUpdate: true,
    });
    this.shouldComponentUpdate(this.props, this.state);
  };

  unblockUser = async (subs: Subscription) => {
    let s = subs;
    let subscribee = subs.subscribeeId;
    let subscriber = subs.subscriberId;
    if (subscribee === undefined || subscriber === undefined) {
      return;
    }
    let toUpdateSub = new Subscription(
      s.subscriptionId,
      subscriber,
      subscribee,
      false
    );
    await updateSubscriptions(toUpdateSub);
    this.setState({
      shouldUpdate: true,
    });
    this.shouldComponentUpdate(this.props, this.state);
  };

  unsubscribe = async (subs: Subscription) => {
    let s = subs;
    let subscribee = subs.subscribeeId;
    let subscriber = subs.subscriberId;
    if (subscribee === undefined || subscriber === undefined) {
      return;
    }
    let toDeleteSub = new Subscription(
      s.subscriptionId,
      subscriber,
      subscribee,
      s.blocked
    );
    await deleteSubscriptions(toDeleteSub);
    this.setState({
      shouldUpdate: true,
    });
    this.shouldComponentUpdate(this.props, this.state);
  };

  retrieveSubscribers = async () => {
    // Case for if viewing subscriptions of a random user.  UserID would be passed as prop to this component from /profile page

    // Case for if viewing your own subscriptions
    let currUserId = this.props.currUser.userId;
    let results = await getAllsubscribee(currUserId);
    this.setState({
      userSubscribersArray: results,
    });
  };

  retrieveSubscriptions = async () => {
    // Case for if viewing your own subscriptions
    let currUserId = this.props.currUser.userId;
    let results = await getAllsubscriber(currUserId);
    this.setState({
      userSubscriptionsArray: results,
    });
  };

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row h-5'>
          <Col xs={6}>
            <h3>Subscribers</h3>
          </Col>
          <Col xs={6}>
            <h3>Subscribed To:</h3>
          </Col>
        </Row>
        <Row className='h-95'>
          <Col className='center-div' xs={6}>
            <div className='subscribers-cont'>
              <SubscribersContainer
                unsubscribe={this.unsubscribe}
                unblockUser={this.unblockUser}
                blockUser={this.blockUser}
                type={'subscribee'}
                subsArray={this.state.userSubscribersArray}
              />
            </div>
          </Col>
          <Col className='center-div' xs={6}>
            <div className='subscribers-cont'>
              <SubscribersContainer
                unsubscribe={this.unsubscribe}
                unblockUser={this.unblockUser}
                blockUser={this.blockUser}
                type={'subscriber'}
                subsArray={this.state.userSubscriptionsArray}
              />
            </div>
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

export const SubscribersPage = connect(mapStateToProps)(
  SubscribersPageComponent
);
