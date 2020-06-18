import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { SubscribersContainer } from '../../subscribersContainer';
import { connect } from 'react-redux';
import { UserState } from '../../../redux/user/userReducer';
import { Subscription } from '../../../models/subscription';

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
            <SubscribersContainer />
          </Col>
          <Col className='center-div' xs={6}>
            <SubscribersContainer />
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
