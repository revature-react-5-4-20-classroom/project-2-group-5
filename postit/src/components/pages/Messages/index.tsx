import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { MessageListContainer } from '../../messageListContainer';
import { MessageDisplayContainer } from '../../messageDisplayContainer';
import { CreateMessageForm } from '../../createMessageForm';

export class MessagesPage extends React.Component<any, any> {
  render() {
    return (
      <Container className='main-container'>
        <Row className='h-100'>
          <Col className='title-row message-panel' xs={4}>
            {/* <Row className='title-row'>
              <Col> */}
            <h3>Messages</h3>
            {/* </Col>
            </Row> */}

            <Row>
              <MessageListContainer />
            </Row>
          </Col>

          <Col className='content-panel' xs={8}>
            <MessageDisplayContainer />
            {/* <CreateMessageForm /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
