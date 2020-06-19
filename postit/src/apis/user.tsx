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
      (s: Subscription) => {
        return new Subscription(
          s.subscriptionId,
          s.subscriber,
          s.subscribee,
          s.blocked,
          s.subscriberName,
          s.subscriberId,
          s.subscribeeName,
          s.subscribeeId
        );
      }
    );
    let fetchedPosts: Post[] = response.data.posts.map((p: Post) => {
      return new Post(
        p.postId,
        p.author,
        p.username,
        p.datePosted,
        p.title,
        p.content
      );
    });
    let userObject = { fetchedUser, fetchedSubscribers, fetchedPosts };
    console.log('USEROBJECT', userObject);
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
    user_id: u.userId,
    username: u.username,
    password: u.password,
    alias: u.alias,
    role: u.role,
    image: u.profilePic,
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
