import axios from "axios";
import { Comment } from "../models/comment";

const commentClient = axios.create({
  baseURL: "http://3.133.86.196:8081",
  withCredentials: true,
});

export async function getAllCommentsByPostId(id: number): Promise<Comment[]> {
  const response = await commentClient.get("/Comments/" + id);
  return response.data.map((commentObj: any) => {
    // const pId=commentObj.post.postId;
    // const uId= commentObj.author.userId;
    const { comment_id, content } = commentObj;
    return new Comment(
      comment_id,
      commentObj.post.postId,
      commentObj.author.userId,
      content
    );
  });
}

export async function createComment(c: Comment): Promise<Comment[]> {
  const response = await commentClient.post("/Comments", {
    omment_id: 0,
    post_id: c.postId,
    author: c.author,
    content: c.content,
  });
  return response.data.map((commentObj: any) => {
    const { comment_id, content } = commentObj;
    return new Comment(
      comment_id,
      commentObj.post.postId,
      commentObj.author.userId,
      content
    );
  });
}
