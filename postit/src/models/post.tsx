export class Post {
  postId: number;
  author: number;
  username: String;
  datePosted: Date;
  title: String;
  content: String;
  constructor(
    postId: number,
    author: number,
    username: String,
    datePosted: Date,
    title: String,
    content: String
  ) {
    this.postId = postId;
    this.author = author;
    this.username = username;
    this.datePosted = datePosted;
    this.title = title;
    this.content = content;
  }
}
