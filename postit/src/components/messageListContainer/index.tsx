import React from 'react';
import { MessageListCard } from '../messageList';
import './style.css';
import { Col } from 'reactstrap';

export class MessageListContainer extends React.Component<any, any> {

  
  render() {
    return (
      <>
        <Col xs={10} className='message-container offset-1'>
          <MessageListCard />
          <MessageListCard />
          <MessageListCard />
          <MessageListCard />
          <MessageListCard />
          <MessageListCard />
        </Col>
      </>
    );
  }
}
