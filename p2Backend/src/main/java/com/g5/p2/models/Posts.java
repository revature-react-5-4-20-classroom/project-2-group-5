package com.g5.p2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "posts")
public class Posts {

	@Id
	@Column(name = "postid")
	private Integer postId;
	@JoinColumn(name = "author")
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnoreProperties({"posts"})
	private Users author;
	@Column(name = "dateposted")
	private Integer datePosted;
	@Column(name = "title")
	private String title;
	@Column(name = "content")
	private String content;
	
	public Posts() {
		super();
	}
	
	public Posts(Integer postId, Users author, Integer datePosted, String title, String content) {
		super();
		this.postId = postId;
		this.author = author;
		this.datePosted = datePosted;
		this.title = title;
		this.content = content;
	}

	public Integer getPostId() {
		return postId;
	}

	public void setPostId(Integer postId) {
		this.postId = postId;
	}

	public Users getAuthor() {
		return author;
	}

	public void setAuthor(Users author) {
		this.author = author;
	}

	public Integer getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Integer datePosted) {
		this.datePosted = datePosted;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	
	
}
