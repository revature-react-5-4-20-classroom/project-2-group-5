import axios from 'axios';
import { User } from '../models/user';
import { backendUrl } from './backendUrl';
import { Subscription } from '../models/subscription';
import { Post } from '../models/post';

const userClient = axios.create({
  baseURL: backendUrl,
  // If you don't have the following line, your login won't work!
  withCredentials: false,
});

export async function getAllUsers(): Promise<User[]> {
  const response = await userClient.get('/users');
  return response.data.map((userObj: any) => {
    const { userId, username, alias, role, password } = userObj;
    return new User(userId, username, alias, role, password);
  });
}

export async function getUsersById(id: number): Promise<any> {
  try {
    const response = await userClient.get('/users/' + id);
    console.log('GETUSER API', response);
    const { userId, username, alias, role, password } = response.data;
    let fetchedUser: User = new User(userId, username, alias, role, password);
    let fetchedSubscribers: Subscription[] = response.data.subscribee.map(
      (s: any) => {
        const { subscriptionId, subscriber, subscribee, blocked } = s;
        return new Subscription(
          subscriptionId,
          subscriber,
          subscribee,
          blocked,
          s.subscriber.username,
          s.subscriber.userId,
          s.subscribee.username,
          s.subscribee.userId
        );
      }
    );
    let fetchedPosts: Post[] = response.data.posts.map((p: any) => {
      return new Post(
        p.postId,
        p.author.userId,
        p.author.username,
        p.datePosted,
        p.title,
        p.content
      );
    });
    let userObject = { fetchedUser, fetchedSubscribers, fetchedPosts };
    console.log('userobj', userObject);
    return userObject;
  } catch (e) {
    console.log(e);
  }
}

export async function getUsersLikeUsername(uname: String): Promise<User[]> {
  const response = await userClient.get('/users/username/' + uname);
  return response.data.map((userObj: any) => {
    const { userId, username, alias, role, password } = userObj;
    return new User(userId, username, alias, role, password);
  });
}

export async function updateUser(u: User): Promise<User> {
  const response = await userClient.patch('/users', {
    userId: u.userId,
    username: u.username,
    password: u.password,
    alias: u.alias,
    role: u.role,
    // image: u.profilePic,
  });
  const { userId, username, alias, role, password } = response.data;
  return new User(userId, username, alias, role, password);
}

export async function addNewUser(u: User): Promise<User> {
  const response = await userClient.post('/users', {
    user_id: u.userId,
    username: u.username,
    password: u.password,
    alias: u.alias,
    role: u.role,
  });
  const { userId, username, alias, role, password } = response.data;
  return new User(userId, username, alias, role, password);
}
export async function deleteUser(id: number): Promise<String> {
  try {
    const response = await userClient.delete('/users/' + id);
    console.log('response', response);
    return 'user is deleted';
  } catch (e) {
    console.log(e);

    throw e;
  }
}

export async function uploadfrofilePic(
  userId: number,
  pic: File
): Promise<any> {
  const response = await userClient.post('/users/upload' + userId, {
    file: pic,
  });
  return response;
}

export async function getImage(userId: number): Promise<any> {
  const response = await userClient.get('/users/showFile' + userId);
  return response;
}
