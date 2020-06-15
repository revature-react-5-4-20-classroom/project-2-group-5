import axios from "axios";
import { Comment } from "../models/comment";

const commentClient = axios.create({
  baseURL: "http://3.133.86.196:8081",
  withCredentials: true,
});

export async function getAllByPostId(id: number): Promise<Comment[]> {
  const response = await commentClient.get("/Comments/all" + id);
  return response.data.map((ommentObj: any) => {
    const { comment_id, post_id, author, content } = ommentObj;
    return new Comment(comment_id, post_id, author, content);
  });
}

export async function createComment(c: Comment): Promise<Comment[]> {
  const response = await commentClient.post("/Comment/new", {
    omment_id: 0,
    post_id: c.postId,
    author: c.author,
    content: c.content,
  });
  return response.data.map((ommentObj: any) => {
    const { comment_id, post_id, author, content } = ommentObj;
    return new Comment(comment_id, post_id, author, content);
  });
}
