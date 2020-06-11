package com.g5.p2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "comments")
public class Comments {

  @Id
  @Column(name = "comment_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer commentId;
  @Column(name = "post_id")
  private Integer postId;
  @Column(name = "author")
  private Integer author;
  @Column(name = "content")
  private String content;
  
  public Comments() {
    super();
  }
  
  public
  
  
  
  
  
}
