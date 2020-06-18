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
} from '../../../apis/subscriptions';

interface ISubscribersPageState {
  userSubscribersArray: Subscription[];
  userSubscriptionsArray: Subscription[] | null;
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
    };
  }

  componentDidMount() {
    this.retrieveSubscribers();
    this.retrieveSubscriptions();
  }

  retrieveSubscribers = async () => {
    // Case for if viewing subscriptions of a random user.  UserID would be passed as prop to this component from /profile page

    // Case for if viewing your own subscriptions
    let currUserId = this.props.currUser.userId;
    let results = await getAllsubscribee(currUserId);
    console.log('users subscribed to userID ' + currUserId + ' ', results);
  };

  retrieveSubscriptions = async () => {
    // Case for if viewing your own subscriptions
    let currUserId = this.props.currUser.userId;
    let results = await getAllsubscriber(currUserId);
    console.log('users userID' + currUserId + 'is subscribed to ', results);
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
            <SubscribersContainer subsArray={this.state.userSubscribersArray} />
          </Col>
          <Col className='center-div' xs={6}>
            <SubscribersContainer subsArray={this.state.userSubscribersArray} />
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
