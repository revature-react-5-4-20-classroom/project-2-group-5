package com.g5.p2.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g5.p2.models.Subscriptions;
import com.g5.p2.models.Users;

@Repository
public interface SubscriptionsRepository extends JpaRepository<Subscriptions, Integer> {
  Subscriptions findBySubscriptionId(Integer subscriptionId);
  List<Subscriptions> findBySubscribee(Users subscribee);
  List<Subscriptions> findBySubscriber(Users subscriber);
}
