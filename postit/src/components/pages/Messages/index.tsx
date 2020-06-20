import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.css';
import { MessageListContainer } from '../../messageListContainer';
import { MessageDisplayContainer } from '../../messageDisplayContainer';
import { User } from '../../../models/user';
import { Message } from '../../../models/message';
import {
  getMessagesByUserId,
  getMessagesByAuthord,
} from '../../../apis/messages';
import { getUsersById } from '../../../apis/user';
import { setTimeout } from 'timers';

interface IMessagePageState {
  userCards: User[];
  selectedUser: User;
  conversation: Message[];
  recursiveAccess: number[];
  newConversation: boolean;
}

export class MessagesPage extends React.Component<any, IMessagePageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userCards: [],
      selectedUser: new User(0, '', '', ''),
      conversation: [],
      recursiveAccess: [],
      newConversation: false,
    };
  }

  componentDidMount() {
    this.fetchUserCards();
  }

  //need to fetch users that have messages with the signed in user
  async fetchUserCards() {
    this.setState({ userCards: [] });
    let allMessages: Message[] = await getMessagesByUserId(this.props.userId);
    let users: number[] = [];
    allMessages.forEach((m) => {
      if (m.author !== this.props.userId && !users.includes(m.author)) {
        users.push(m.author);
      } else if (
        m.receiverId !== this.props.userId &&
        !users.includes(m.receiverId)
      ) {
        users.push(m.receiverId);
      }
    });

    let actualUsers: User[] = [];
    for (let i: number = 0; i < users.length; i++) {
      let user = await getUsersById(users[i]);
      this.setState({ userCards: [...this.state.userCards, user.fetchedUser] });
      actualUsers.push(user);
    }
  }

  setSelectedUser(user: User) {
    this.setState({ selectedUser: user });
    this.fetchConversation(user);
  }

  //need to fetch conversation with selected user
  async fetchConversation(toUser: User) {
    this.setState({ recursiveAccess: [...this.state.recursiveAccess, 1] });
    this.recursiveFetch(toUser, this.state.recursiveAccess.length);
  }

  //constantly check to see if a new message exists, but if another conversation is selected, then die
  //lol this feels so hacky
  async recursiveFetch(u: User, accessIndex: number) {
    let messages: Message[] = await getMessagesByAuthord(
      this.props.userId,
      u.userId
    );
    if (this.state.newConversation && messages.length > 0) {
      this.setState({ newConversation: false });
      this.fetchUserCards();
    } else if (messages.length == 0) {
      this.setState({ newConversation: true });
    }
    //messages = this.sortMessages(messages);
    this.setState({ conversation: messages });
    //console.log(messages);
    setTimeout(() => {
      //console.log(accessIndex, this.state.recursiveAccess.length)
      if (this.state.recursiveAccess.length - 1 == accessIndex) {
        this.recursiveFetch(u, accessIndex);
      }
    }, 500);
  }

  //possibly not needed
  // sortMessages(messages :Message[]): Message[]{
  //   let out : Message[] = [];

  //   for (let i:number = 0; i < messages.length; i++){
  //     if(out.length === 0){
  //       out.push(messages[i]);
  //     }
  //     else {
  //       let added : boolean = false;
  //       for(let j:number = 0; j < out.length; j++){
  //         if(messages[i].messageId < out[j].messageId){
  //           out.splice(j, 0, messages[i]);
  //         }
  //       }
  //       if(!added){
  //         out.push(messages[i]);
  //       }
  //     }
  //   }

  //   return out;
  // }

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
              <MessageListContainer
                userCards={this.state.userCards}
                setSelectedUser={(user: User) => {
                  this.setSelectedUser(user);
                }}
              />
            </Row>
          </Col>

          <Col className='content-panel' xs={8}>
            <MessageDisplayContainer
              userId={this.props.userId}
              toUser={this.state.selectedUser}
              conversation={this.state.conversation}
              setSelectedUser={(user: User) => {
                this.setSelectedUser(user);
              }}
            />
            {/* <CreateMessageForm /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}
