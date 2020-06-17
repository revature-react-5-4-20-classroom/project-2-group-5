import React from 'react';
import './style.css';
import {
  Col,
  Row,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';
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
        <Row className='h-90 center-div'>
          <Col className='message-box' xs={12}>
            <MessageRow />
          </Col>
        </Row>
        <Row className='h-5'>
          <Col xs={12} className='center-div'>
            <InputGroup className='input-box'>
              <Input placeholder='username' />
              <InputGroupAddon addonType='append'>
                <Button>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}
