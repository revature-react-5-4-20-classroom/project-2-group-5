export class Comment{
    commentId:number;
    postId:number;
    author:number;
    content:String;
    constructor(commentId:number,postId:number,author:number,content:String){
        this.commentId=commentId;
        this.postId=postId;
        this.author=author;
        this.content=content;
    }
}