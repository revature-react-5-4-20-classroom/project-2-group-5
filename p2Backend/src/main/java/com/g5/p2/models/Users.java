package com.g5.p2.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users")
public class Users {
	
	@Id
	@Column(name = "user_id")
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
	@Column(name = "picture_name")
	private String pictureName;
	@Column(name = "picture_type")
	private String pictureType;
	@Column(name = "pic")
	private String pic;
	@OneToMany(mappedBy = "author")
	@JsonIgnoreProperties({"comments"})
	private List<Posts> posts;
	@OneToMany(mappedBy = "subscribee")
    @JsonIgnoreProperties({"posts"})
	private List<Subscriptions> subscribee;
	@OneToMany(mappedBy = "subscriber")
    @JsonIgnoreProperties({"posts"})
	private List<Subscriptions> subscriber;
	

  public Users() {
		super();
	}
	
//	public Users(String username, String password) { -- working login route
//	  this();
//	  this.username = username;
//	  this.password = password;
//	} 
	
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
	
	

	public Users(Integer userId, String username, String password, String alias, String role,
      String pictureName, String pictureType, String pic) {
      super();
      this.userId = userId;
      this.username = username;
      this.password = password;
      this.alias = alias;
      this.role = role;
      this.pictureName = pictureName;
      this.pictureType = pictureType;
      this.pic = pic;
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
	
	public String getPictureName() {
      return pictureName;
    }
  
    public void setPictureName(String pictureName) {
      this.pictureName = pictureName;
    }
  
    public String getPictureType() {
      return pictureType;
    }
  
    public void setPictureType(String pictureType) {
      this.pictureType = pictureType;
    }
  
    public String getPic() {
      return pic;
    }
  
    public void setPic(String pic) {
      this.pic = pic;
    }
  
    public List<Posts> getPosts() {
		return posts;
	}

	public void setPosts(List<Posts> posts) {
		this.posts = posts;
	}
	
	public List<Subscriptions> getSubscribee() {
	    return subscribee;
	}

	public void setSubscribee(List<Subscriptions> subscribee) {
	    this.subscribee = subscribee;
	}

	public List<Subscriptions> getSubscriber() {
	    return subscriber;
	}

	public void setSubscriber(List<Subscriptions> subscriber) {
	    this.subscriber = subscriber;
	}
}
