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
@Table(name = "subscriptions")
public class Subscriptions {

  @Id
  @Column(name = "subscription_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer subscriptionId;
  @JoinColumn(name = "subscribee")
  @ManyToOne(fetch = FetchType.EAGER)
  @JsonIgnoreProperties({"subscribee", "subscriber", "posts", "password", "alias", "role"})
  private Users subscribee;
  @JoinColumn(name = "subscriber")
  @ManyToOne(fetch = FetchType.EAGER)
  @JsonIgnoreProperties({"subscribee", "subscriber", "posts", "password", "alias", "role"})
  private Users subscriber;
  @Column(name = "blocked")
  private boolean blocked;
  
  public Subscriptions() {
    super();
}
  
  public Subscriptions(Integer subscriptionId, boolean blocked) {
    super();
    this.subscriptionId = subscriptionId;
    this.blocked = blocked;
}
  
  public Subscriptions(Integer subscriptionId, Users subscribee, Users subscriber, boolean blocked) {
      super();
      this.subscriptionId = subscriptionId;
      this.subscribee = subscribee;
      this.subscriber = subscriber;
      this.blocked = blocked;
  }

  public Integer getSubscriptionId() {
    return subscriptionId;
  }

  public void setSubscriptionId(Integer subscriptionId) {
    this.subscriptionId = subscriptionId;
  }

  public Users getSubscribee() {
    return subscribee;
  }

  public void setSubscribee(Users subscribee) {
    this.subscribee = subscribee;
  }

  public Users getSubscriber() {
    return subscriber;
  }

  public void setSubscriber(Users subscriber) {
    this.subscriber = subscriber;
  }

  public boolean isBlocked() {
    return blocked;
  }

  public void setBlocked(boolean blocked) {
    this.blocked = blocked;
  }
  
  
  
}
