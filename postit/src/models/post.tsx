export class Post {
  postId: number;
  author: number;
  datePosted: Date;
  title: String;
  content: String;
  constructor(
    postId: number,
    author: number,
    datePosted: Date,
    title: String,
    content: String
  ) {
    this.postId = postId;
    this.author = author;
    this.datePosted = datePosted;
    this.title = title;
    this.content = content;
  }
}
