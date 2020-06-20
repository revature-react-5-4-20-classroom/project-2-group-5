package com.g5.p2.services;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import com.g5.p2.exceptions.SubscriptionNotFoundException;
import com.g5.p2.models.Subscriptions;
import com.g5.p2.repositories.SubscriptionsRepository;
import com.g5.p2.repositories.UsersRepository;

@Service
@Primary
@Transactional
public class SubscriptionsServiceImplementation implements SubscriptionsService{

  @Autowired
  SubscriptionsRepository subscriptionsRepository;
  @Autowired
  UsersRepository usersRepository;
  
  @Override
  public List<Subscriptions> getAll() {
    return subscriptionsRepository.findAll(); 
  }

  @Override
  public List<Subscriptions> getBySubscribee(Integer userId) {
    return subscriptionsRepository.findBySubscribee(usersRepository.findByUserId(userId));
  }

  @Override
  public List<Subscriptions> getBySubscriber(Integer userId) {
    return subscriptionsRepository.findBySubscriber(usersRepository.findByUserId(userId));
  }

  @Override
  public Subscriptions create(Subscriptions s, Integer subscribeeId, Integer subscriberId) {
    s.setSubscriptionId(subscriptionsRepository.findAll().get(subscriptionsRepository.findAll().size()-1).getSubscriptionId() + 1);
    s.setSubscribee(usersRepository.findByUserId(subscribeeId));
    s.setSubscriber(usersRepository.findByUserId(subscriberId));
    return subscriptionsRepository.save(s);
  }

  @Override
  public Subscriptions update(Subscriptions s, Integer subscribeeId, Integer subscriberId) {
    s.setSubscribee(usersRepository.findByUserId(subscribeeId));
    s.setSubscriber(usersRepository.findByUserId(subscriberId));
    Optional<Subscriptions> existingSubscription = subscriptionsRepository.findById(s.getSubscriptionId());
    if(existingSubscription.isPresent()) {
        return subscriptionsRepository.save(s);
    }
    else {
        throw new SubscriptionNotFoundException();
    }
  }

  @Override
  public Subscriptions createOrUpdate(Subscriptions s) {
    return subscriptionsRepository.save(s);
  }

  @Override
  public boolean delete(Integer subscriptionId) {
    Optional<Subscriptions> existingSubscription = subscriptionsRepository.findById(subscriptionId);
    if(existingSubscription.isPresent()) {
        subscriptionsRepository.deleteById(subscriptionId);
        return true;
    }
    else {
        return false;
    }
  }

}
