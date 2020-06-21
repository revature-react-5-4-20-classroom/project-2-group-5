import React from 'react';
import { MessageListCard } from '../messageList';
import './style.css';
import { Col } from 'reactstrap';
import { User } from '../../models/user';

export class MessageListContainer extends React.Component<any, any> {
  render() {
    return (
      <>
        <Col xs={10} className='message-container offset-1'>
          {this.props.userCards.map((card: User) => {
            return (
              <MessageListCard
                user={card}
                key={'mlcKey' + card.userId}
                setSelectedUser={(user: User) => {
                  this.props.setSelectedUser(user);
                }}
              />
            );
          })}
        </Col>
      </>
    );
  }
}
