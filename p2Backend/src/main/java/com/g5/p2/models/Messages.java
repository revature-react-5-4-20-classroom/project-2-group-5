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
@Table(name = "messages")
public class Messages {
  
    @Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer messageId;
    @JoinColumn(name = "author")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"writtenMessages", "password", "alias", "role", "posts"})
    private Users author;
    @JoinColumn(name = "receiver")
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"receivedMessages", "password", "alias", "role", "posts"})
    private Users receiver;
    @Column(name = "content")
    private String content; 
    
    
    public Messages() {
      super();
    }

    public Messages(Integer messageId, String content) {
      super();
      this.messageId = messageId;
      this.content = content;
    }

    public Messages(Integer messageId, Users author, Users receiver, String content) {
      super();
      this.messageId = messageId;
      this.author = author;
      this.receiver = receiver;
      this.content = content;
    }

    public Integer getMessageId() {
      return messageId;
    }

    public void setMessageId(Integer messageId) {
      this.messageId = messageId;
    }

    public Users getAuthor() {
      return author;
    }

    public void setAuthor(Users author) {
      this.author = author;
    }

    public Users getReceiver() {
      return receiver;
    }

    public void setReceiver(Users receiver) {
      this.receiver = receiver;
    }

    public String getContent() {
      return content;
    }

    public void setContent(String content) {
      this.content = content;
    }
    
    
    
}
