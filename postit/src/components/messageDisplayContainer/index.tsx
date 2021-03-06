import React from 'react';
import './style.css';
import {
  Col,
  Row,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import { MessageRow } from '../message';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { newMessage } from '../../apis/messages';
import { getUsersLikeUsername } from '../../apis/user';
import { MessageListCard } from '../messageList';

// interface IMessageDisplayContainerProps{
//   toUser: User;
//   conversation: Message[];
//   setSelectedUser
// }

interface IMessageDisplayContainerState {
  sendMessage: string;
  newMessage: boolean;
  searchedUsername: string;
  searchResults: User[];
  sendLock: boolean;
}

export class MessageDisplayContainer extends React.Component<
  any,
  IMessageDisplayContainerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      sendMessage: '',
      newMessage: false,
      searchedUsername: '',
      searchResults: [],
      sendLock: false,
    };
  }
  newMessage = (event: any) => {
    this.setState({ newMessage: !this.state.newMessage });
  };

  handleSendMessage = (event: any) => {
    this.setState({ sendMessage: event.currentTarget.value });
  };

  sendMessage = async (event: any) => {
    //send a new message
    if (!this.state.sendLock) {
      this.setState({ sendLock: true });
      let m: Message = new Message(
        0,
        this.props.userId,
        '',
        this.props.toUser.userId,
        '',
        this.state.sendMessage
      );
      let response: Message = await newMessage(m);
      this.setState({ sendLock: false });
    }
  };

  setSearchedUsername = async (event: any) => {
    this.setState({ searchedUsername: event.currentTarget.value });
  };

  search = async (event: any) => {
    event.preventDefault();
    if (this.state.searchedUsername != '') {
      let results: User[] = await getUsersLikeUsername(
        this.state.searchedUsername
      );
      for (let i: number = 0; i < results.length; i++) {
        if (results[i].userId == this.props.userId) {
          results.splice(i, 1);
          break;
        }
      }
      console.log(results);
      this.setState({ searchResults: results });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  setSelectedUser(user: User) {
    this.setState({ newMessage: false });
    this.props.setSelectedUser(user);
  }

  render() {
    return (
      <>
        {!this.state.newMessage ? (
          <>
            {/* ----------DIV TO SEE/SEND MESSAGES----------------- */}
            <Row className='h-5'>
              <Col xs={8}>
                {this.props.toUser.username != '' ? (
                  <h3 className='message-title'>
                    Your conversation with {this.props.toUser.username}
                  </h3>
                ) : (
                  <h3 className='message-title'>
                    Select a user to view a conversation
                  </h3>
                )}
              </Col>
              <Col className='center-div' xs={4}>
                <Button className='message-pg-btn' onClick={this.newMessage}>
                  New Message
                </Button>
              </Col>
            </Row>
            <Row className='h-90 center-div'>
              <Col className='message-box' xs={12}>
                {this.props.conversation.map((m: Message) => {
                  return (
                    <MessageRow
                      key={`mrKey${m.messageId}`}
                      message={m}
                      sent={m.author === this.props.toUser.userId}
                    />
                  );
                })}
              </Col>
            </Row>
            <Row className='h-5'>
              <Col xs={12} className='center-div'>
                <InputGroup className='input-box'>
                  <Input
                    placeholder='message'
                    onChange={this.handleSendMessage}
                    type={'text'}
                    disabled={this.props.toUser.userId == 0}
                  />
                  <InputGroupAddon addonType='append'>
                    <Button
                      onClick={this.sendMessage}
                      disabled={this.props.toUser.userId == 0}
                    >
                      Send
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          </>
        ) : (
          <>
            {/* ----------DIV TO SEARCH FOR PERSON TO SEND MESSAGE TO----------------- */}
            <Row className='h-5'>
              <Col xs={8}>
                <h3 className='message-title'>
                  Search a user to start a conversation
                </h3>
              </Col>
              <Col xs={4} className='center-div'>
                <Button className='message-pg-btn' onClick={this.newMessage}>
                  Back
                </Button>
              </Col>
            </Row>
            <Row className='h-95 center-div'>
              <div className='search-msg-div'>
                <Row>
                  <Col xs={4} className='offset-4'>
                    <h3 className='message-title'>User Search</h3>
                    <Form className='center' onSubmit={this.search}>
                      <FormGroup>
                        <Input
                          onChange={this.setSearchedUsername}
                          type='text'
                          name='username'
                          id='username'
                          placeholder='Username'
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button color='secondary'>Search</Button>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Col className='msg-search-results offset-2' xs={8}>
                    {this.state.searchResults.map((card: User) => {
                      return (
                        <MessageListCard
                          user={card}
                          key={'mlcKey' + card.userId}
                          setSelectedUser={(user: User) => {
                            this.setSelectedUser(user);
                          }}
                        />
                      );
                    })}
                  </Col>
                </Row>
              </div>
            </Row>
          </>
        )}
      </>
    );
  }
}
