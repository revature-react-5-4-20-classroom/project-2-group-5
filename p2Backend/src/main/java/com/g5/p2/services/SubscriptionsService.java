package com.g5.p2.services;

import java.util.List;
import com.g5.p2.models.Subscriptions;

public interface SubscriptionsService {

  List<Subscriptions> getAll();
  
  List<Subscriptions> getBySubscribee(Integer userId);
  
  List<Subscriptions> getBySubscriber(Integer userId);
  
  Subscriptions create(Subscriptions s, Integer subscribeeId, Integer subscriberId);
  
  Subscriptions update(Subscriptions s, Integer subscribeeId, Integer subscriberId);
  
  Subscriptions createOrUpdate(Subscriptions s);
  
  boolean delete(Integer postId);
  
}
