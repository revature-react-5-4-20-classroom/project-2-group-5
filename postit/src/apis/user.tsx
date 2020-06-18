import axios from 'axios';
import { User } from '../models/user';

const userClient = axios.create({
  baseURL: 'http://3.133.86.196:8081',
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

export async function getUsersById(id: number): Promise<User> {
  const response = await userClient.get('/users/' + id);
  const { userId, username, alias, role, password } = response.data;
  return new User(userId, username, alias, role, password);
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
    image:u.profilePic,
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
