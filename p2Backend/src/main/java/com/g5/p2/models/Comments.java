package com.g5.p2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "comments")
public class Comments {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;
    @JoinColumn(name = "post_id")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"comments"})
    private Posts post;
    @JoinColumn(name = "author")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"comments", "posts", "subscribee", "subscriber", "pictureName", "pictureType", "pic"})
    private Users author; 
    @Column(name = "content")
    private String content;
    
    public Comments() {
      super();
    }
    
    public Comments(Integer commentId, String content) {
      super();
      this.commentId = commentId;
      this.content = content;
    }
    
    public Comments(Integer commentId, Posts post, Users author, String content) {
      super();
      this.commentId = commentId;
      this.post = post;
      this.author = author;
      this.content = content;
    }

    public Integer getCommentId() {
      return commentId;
    }

    public void setCommentId(Integer commentId) {
      this.commentId = commentId;
    }

    public Posts getPost() {
      return post;
    }

    public void setPost(Posts post) {
      this.post = post;
    }

    public Users getAuthor() {
      return author;
    }

    public void setAuthor(Users author) {
      this.author = author;
    }

    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }
  
    
    
}
