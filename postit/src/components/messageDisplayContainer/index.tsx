import React from 'react';
import './style.css';
import { Col, Row, Button, Container } from 'reactstrap';
import { MessageRow } from '../message';

export class MessageDisplayContainer extends React.Component<any, any> {
  render() {
    return (
      <>
        <Row className='title-row h-5'>
          <Col xs={8}>
            <h3>Your conversation with USERNAME</h3>
          </Col>
          <Col xs={4}>
            <Button>New Message</Button>
          </Col>
        </Row>
        <Row className='h-95'>
          <Container>
            <MessageRow />
          </Container>
        </Row>
      </>
    );
  }
}
