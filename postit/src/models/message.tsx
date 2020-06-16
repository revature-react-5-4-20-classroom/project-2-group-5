export class Message {
  messageId: number;
  author: number;
  username: string;
  receiverId: number;
  receiverUsername: string;
  content: string;
  constructor(
    messageId: number,
    author: number,
    username: string,
    receiverId: number,
    receiverUsername: string,
    content: string
  ) {
    this.messageId = messageId;
    this.author = author;
    this.username = username;
    this.receiverId = receiverId;
    this.receiverUsername = receiverUsername;
    this.content = content;
  }
}
