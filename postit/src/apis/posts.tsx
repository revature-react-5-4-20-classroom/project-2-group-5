import axios from "axios";
import { Post } from "../models/post";
import { User } from "../models/user";
import { backendUrl } from "./backendUrl";

const postClient = axios.create({
  baseURL: backendUrl,
  // If you don't have the following line, your login won't work!
  withCredentials: false,
});
//@get /posts/all-
//@ gets all posts in order by create date (earliest first), returning array of posts
export async function getAllPosts(): Promise<Post[]> {
  console.log("before try");

  try {
    const response = await postClient.get("/posts");
    //console.log("response"+ response.data[0].postId);
    return response.data.map((postObj: any) => {
      const { postId, datePosted, title, content } = postObj;
      return new Post(
        postId,
        postObj.author.userId,
        postObj.author.username,
        datePosted,
        title,
        content
      );
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
  //   // if (e.response.status === 401) {
  //   //   throw new Error(`Failed to authenticate with username`);
  //   // } else {
  //   //
  //
  // }
}

//get all posts by subscribee list
export async function getAllSubscibersPosts(id: number): Promise<Post[]> {
  const response = await postClient.get("/posts/subscriptions/" + id);
  return response.data.map((postObj: any) => {
    const userObj: User = postObj.author;
    const { postId, datePosted, title, content } = postObj;
    return new Post(
      postId,
      userObj.userId,
      userObj.username,
      datePosted,
      title,
      content
    );
  });
}

//get post by post id
export async function getPostsByPostId(postid: number): Promise<Post> {
  const response = await postClient.get("/posts/posts/" + postid);
  const userObj: User = response.data;
  const { postId, datePosted, title, content } = response.data;
  return new Post(
    postId,
    userObj.userId,
    userObj.username,
    datePosted,
    title,
    content
  );
}

//get post of certain user
export async function getPostsByUserId(userid: number): Promise<Post[]> {
  const response = await postClient.get("/posts/author/" + userid);
  return response.data.map((postObj: any) => {
    const userObj: User = postObj.author;
    const { postId, datePosted, title, content } = postObj;
    return new Post(
      postId,
      userObj.userId,
      userObj.username,
      datePosted,
      title,
      content
    );
  });
}

//new post
export async function addNewPost(p: Post): Promise<Post> {
  const response = await postClient.post("/post", {
    postId: p.postId,
    author: p.author,
    datePosted: p.datePosted,
    title: p.title,
    content: p.content,
  });
  const userObj: User = response.data;
  const { postId, datePosted, title, content } = response.data;
  return new Post(
    postId,
    userObj.userId,
    userObj.username,
    datePosted,
    title,
    content
  );
}

export async function UpdatePost(p: Post): Promise<Post> {
  const response = await postClient.patch("/post", {
    post_id: p.postId,
    author: p.author,
    datePosted: p.datePosted,
    title: p.title,
    content: p.content,
  });
  const userObj: User = response.data;
  const { postId, datePosted, title, content } = response.data;
  return new Post(
    postId,
    userObj.userId,
    userObj.username,
    datePosted,
    title,
    content
  );
}