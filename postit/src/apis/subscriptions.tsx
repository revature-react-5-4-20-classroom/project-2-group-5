import axios from 'axios';
import { Subscription } from '../models/subscription';
const subscriberClient = axios.create({
  baseURL: 'http://3.133.86.196:8081',
  withCredentials: true,
});

export async function getAllsubscription(): Promise<Subscription[]> {
  const response = await subscriberClient.get('/subscriptions');
  return response.data.map((subscriptionObj: any) => {
    const {
      subscription_id,
      subscriber,
      subscribee,
      blocked,
    } = subscriptionObj;
    return new Subscription(subscription_id, subscriber, subscribee, blocked);
  });
}

//get subscriptions by subscribee
export async function getAllsubscribee(id: number): Promise<Subscription[]> {
  const response = await subscriberClient.get(
    '/subscriptions/subscribee/' + id
  );
  return response.data.map((subscriptionObj: any) => {
    const { subscription_id, blocked } = subscriptionObj;
    return new Subscription(
      subscription_id,
      subscriptionObj.subscriber.userId,
      subscriptionObj.subscribee.userId,
      blocked
    );
  });
}

//get subscriptions by subscriber
export async function getAllsubscriber(id: number): Promise<Subscription[]> {
  const response = await subscriberClient.get(
    '/subscriptions/subscriber/' + id
  );
  return response.data.map((subscriptionObj: any) => {
    const {
      subscription_id,
      subscriber,
      subscribee,
      blocked,
    } = subscriptionObj;
    return new Subscription(subscription_id, subscriber, subscribee, blocked);
  });
}

export async function createSubscriptions(
  uid: number,
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.post('/subscriptions/' + uid, {
    subscription_id: 0,
    subscriber: s.subscriber,
    subscribee: s.subscribee,
    blocked: s.blocked,
  });

  const { subscription_id, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscription_id, subscriber, subscribee, blocked);
}

export async function deleteSubscriptions(
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.delete('/subscriptions', {
    data: {
      subscription_id: s.subscriptionId,
      //   subscriber: s.subscriber,
      //   subscribee: s.subscribee,
      //   blocked: s.blocked,
    },
    headers: {
      Authorization: '***',
    },
  });
  const { subscription_id, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscription_id, subscriber, subscribee, blocked);
}

export async function updateSubscriptions(
  uid: number,
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.patch('/subscriptions/' + uid, {
    subscription_id: s.subscriptionId,
    subscriber: s.subscriber,
    subscribee: s.subscribee,
    blocked: s.blocked,
  });
  const { subscription_id, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscription_id, subscriber, subscribee, blocked);
}
