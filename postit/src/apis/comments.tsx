import axios from 'axios';
import { Comment } from '../models/comment';
import { backendUrl } from './backendUrl';

const commentClient = axios.create({
  // baseURL: "http://localhost:8081",
  baseURL: backendUrl,

  withCredentials: true,
});

export async function getAllCommentsByPostId(id: number): Promise<Comment[]> {
  const response = await commentClient.get('/comments/' + id);
  return response.data.map((commentObj: any) => {
    // const pId=commentObj.post.postId;
    // const uId= commentObj.author.userId;
    const { commentId, content } = commentObj;
    console.log('COMMENTOBJ ', commentObj);
    return new Comment(
      commentId,
      commentObj.post.postId,
      commentObj.author.userId,
      content,
      commentObj.author.username
    );
  });
}

export async function createComment(c: Comment): Promise<Comment> {
  const response = await commentClient.post('/comments', {
    ommentId: 0,
    postId: c.postId,
    author: c.author,
    content: c.content,
  });
  const { commentId, post, author, content } = response.data;
  let newComment = new Comment(commentId, post.postId, author.userId, content);
  return newComment;
}
