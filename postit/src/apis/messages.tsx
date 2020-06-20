import axios from "axios";
import { Message } from "../models/message";
import { backendUrl } from "./backendUrl";

const messageClient = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

//get list of users w/messages that have conversations open with the current user
export async function getMessagesByUserId(uId: number): Promise<Message[]> {
  const response = await messageClient.get("/messages/user/" + uId);
  return response.data.map((msgObj: any) => {
    const { messageId, content } = msgObj;
    return new Message(
      messageId,
      msgObj.author.userId,
      msgObj.author.username,
      msgObj.receiver.userId,
      msgObj.receiver.username,
      content
    );
  });
}
//get conversation between author ID and userId
export async function getMessagesByAuthord(
  authorId: number,
  reciverId: Number
): Promise<Message[]> {
  const response = await messageClient.get(
    "/messages/author/" + authorId + "/" + reciverId
  );
  return response.data.map((msgObj: any) => {
    const { messageId, content } = msgObj;
    return new Message(
      messageId,
      msgObj.author.userId,
      msgObj.author.username,
      msgObj.receiver.userId,
      msgObj.receiver.username,
      content
    );
  });
}

export async function newMessage(msg: Message): Promise<Message> {
  const response = await messageClient.post("/messages", {
    messageId: 0,
    author: msg.author,
    receiver: msg.receiverId,
    content: msg.content,
  });
  const { messageId, author, receiver, content } = response.data;
  return new Message(
    messageId,
    author.userId,
    author.username,
    receiver.userId,
    receiver.username,
    content
  );


}
