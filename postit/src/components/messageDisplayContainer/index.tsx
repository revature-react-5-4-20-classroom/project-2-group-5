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
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { newMessage } from '../../apis/messages';

interface IMessageDisplayContainerProps{
  user: User;
  conversation: Message[];
}

interface IMessageDisplayContainerState{
  sendMessage: string;
  newMessage: string;
}

export class MessageDisplayContainer extends React.Component<IMessageDisplayContainerProps, IMessageDisplayContainerState> {
  constructor(props: IMessageDisplayContainerProps){
    super(props);
    this.state = {
      sendMessage: "",
      newMessage: ""
    }
  }
  createMessage = (event : any)=>{
    //create a new message
  }

  handleSendMessage = (event: any)=>{
    this.setState({sendMessage: event.currentTarget.value});
  }

  sendMessage = async (event: any)=>{
    //send a new message
    console.log(this.props.user);
    let newM: Message = new Message(0, this.props.conversation[0].author == this.props.user.userId ? this.props.conversation[0].receiverId : this.props.conversation[0].author, this.props.conversation[0].author == this.props.user.userId ? this.props.conversation[0].receiverUsername : this.props.conversation[0].username, this.props.user.userId, this.props.user.username, this.state.sendMessage);
    console.log(newM);
    let response : Message = await newMessage(newM);
    console.log(response);
  }

  render() {
    return (
      <>
        <Row className='title-row h-5'>
          <Col xs={8}>
            {this.props.user.username != "" ?
              <h3>Your conversation with {this.props.user.username}</h3> :
              <h3>Select a user to view a conversation</h3>
            }
          </Col>
          <Col xs={4}>
            <Button onClick={this.createMessage}>New Message</Button>
          </Col>
        </Row>
        <Row className='h-90 center-div'>
          <Col className='message-box' xs={12}>
            {this.props.conversation.map((m : Message)=>{
              return (<MessageRow key={`mrKey${m.messageId}`} message={m} sent={m.author === this.props.user.userId}/>);
            })}
          </Col>
        </Row>
        <Row className='h-5'>
          <Col xs={12} className='center-div'>
            <InputGroup className='input-box' >
              <Input placeholder='username' onChange={this.handleSendMessage} type={"text"}  disabled={this.props.conversation.length == 0}/>
              <InputGroupAddon addonType='append'>
                <Button onClick={this.sendMessage} disabled={this.props.conversation.length == 0}>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </>
    );
  }
}
