package com.g5.p2.models;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name = "users")
public class Users {
	
	@Id
	@Column(name = "userid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	@Column(name = "username")
	private String username;
	@Column(name = "password")
	private String password;
	@Column(name = "alias")
	private String alias;
	@Column(name = "role")
	private String role;
	@OneToMany(mappedBy = "author")
	@JsonIgnoreProperties({"author"})
	private List<Posts> posts;
	
	public Users() {
		super();
	}
	
	public Users(Integer userId, String username, String password, String role) {
		this(userId, username, password, "", role);
	}
	
	public Users(Integer userId, String username, String password, String alias, String role) {
		super();
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.alias = alias;
		this.role = role;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	public List<Posts> getPosts() {
		return posts;
	}

	public void setPosts(List<Posts> posts) {
		this.posts = posts;
	}
	
	
}
