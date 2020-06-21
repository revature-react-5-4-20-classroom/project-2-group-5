export class Comment {
  commentId: number;
  postId: number;
  author: number;
  content: String;
  username?: string;
  constructor(
    commentId: number,
    postId: number,
    author: number,
    content: String,
    username?: string
  ) {
    this.commentId = commentId;
    this.postId = postId;
    this.author = author;
    this.content = content;
    this.username = username;
  }
}
