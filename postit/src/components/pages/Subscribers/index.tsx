import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { SubscribersContainer } from '../../subscribersContainer';

export class SubscribersPage extends React.Component<any, any> {
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
