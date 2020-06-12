package com.g5.p2.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.g5.p2.exceptions.SubscriptionNotFoundException;
import com.g5.p2.models.Subscriptions;
import com.g5.p2.services.SubscriptionsServiceImplementation;

@RequestMapping(path = "/subscriptions")
@RestController
public class SubscriptionsController {

    @Autowired
    SubscriptionsServiceImplementation subscriptionsService;
    
    //get all subscriptions
    @GetMapping
    public List<Subscriptions> getSubscriptions() {
        return subscriptionsService.getAll();
    }
  
    //get subscriptions by subscribee
    @GetMapping("/subscribee/{userId}")
    public List<Subscriptions> getSubscriptionsBySubscribee(@PathVariable Integer userId) {
        return subscriptionsService.getBySubscribee(userId);
    }
    
    //get subscriptions by subscriber
    @GetMapping("/subscriber/{userId}")
    public List<Subscriptions> getSubscriptionsBySubscriber(@PathVariable Integer userId) {
        return subscriptionsService.getBySubscriber(userId);
    }
    
    //create subscription
    @PostMapping
    public Subscriptions createPost(@RequestBody LinkedHashMap<String, Object> s) {
        try {
            Subscriptions convert = new Subscriptions((Integer)s.get("subscriptionId"), (boolean)s.get("blocked"));
            return subscriptionsService.create(convert, (Integer)s.get("subscribee"), (Integer)s.get("subscriber"));
        }
        catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    
    //patch subscription
    @PatchMapping
    public Subscriptions updateSubscription(@RequestBody LinkedHashMap<String, Object> s) {
        try {
            Subscriptions convert = new Subscriptions((Integer)s.get("subscriptionId"), (boolean)s.get("blocked"));
            return subscriptionsService.update(convert, (Integer)s.get("subscribee"), (Integer)s.get("subscriber"));
        }
        catch(SubscriptionNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Subscription Not Found", e);
        }
    }
    
    //delete subscription
    @DeleteMapping
    public boolean deleteSubscription(@RequestBody LinkedHashMap<String, Object> s) {
        return subscriptionsService.delete((Integer)s.get("subscriptionId"));
    }
    
}
