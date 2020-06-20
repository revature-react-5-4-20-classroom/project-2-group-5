import axios from 'axios';
import { Subscription } from '../models/subscription';
import { backendUrl } from './backendUrl';
const subscriberClient = axios.create({
  baseURL: backendUrl,

  withCredentials: true,
});

export async function getAllsubscription(): Promise<Subscription[]> {
  const response = await subscriberClient.get('/subscriptions');
  return response.data.map((subscriptionObj: any) => {
    const { subscriptionId, subscriber, subscribee, blocked } = subscriptionObj;
    return new Subscription(subscriptionId, subscriber, subscribee, blocked);
  });
}

//get subscriptions by subscribee
export async function getAllsubscribee(id: number): Promise<Subscription[]> {
  const response = await subscriberClient.get(
    '/subscriptions/subscribee/' + id
  );
  return response.data.map((subscriptionObj: any) => {
    const { subscriptionId, subscriber, subscribee, blocked } = subscriptionObj;
    return new Subscription(
      subscriptionId,
      subscriber,
      subscribee,
      blocked,
      subscriptionObj.subscriber.username,
      subscriptionObj.subscriber.userId,
      subscriptionObj.subscribee.username,
      subscriptionObj.subscribee.userId
    );
  });
}

//get subscriptions by subscriber
export async function getAllsubscriber(id: number): Promise<Subscription[]> {
  const response = await subscriberClient.get(
    '/subscriptions/subscriber/' + id
  );
  return response.data.map((subscriptionObj: any) => {
    const { subscriptionId, subscriber, subscribee, blocked } = subscriptionObj;
    return new Subscription(
      subscriptionId,
      subscriber,
      subscribee,
      blocked,
      subscriptionObj.subscriber.username,
      subscriptionObj.subscriber.userId,
      subscriptionObj.subscribee.username,
      subscriptionObj.subscribee.userId
    );
  });
}

export async function createSubscriptions(
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.post('/subscriptions', {
    subscriptionId: 0,
    subscriber: s.subscriber,
    subscribee: s.subscribee,
    blocked: s.blocked,
  });

  const { subscriptionId, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscriptionId, subscriber, subscribee, blocked);
}

export async function deleteSubscriptions(
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.delete('/subscriptions', {
    data: {
      subscriptionId: s.subscriptionId,
      subscribee: s.subscribee,
      subscriber: s.subscriber,
      blocked: s.blocked,
    },
    headers: {
      Authorization: '***',
    },
  });
  const { subscription_id, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscription_id, subscriber, subscribee, blocked);
}

export async function updateSubscriptions(
  s: Subscription
): Promise<Subscription> {
  const response = await subscriberClient.patch('/subscriptions', {
    subscriptionId: s.subscriptionId,
    subscribee: s.subscribee,
    subscriber: s.subscriber,
    blocked: s.blocked,
  });
  const { subscription_id, subscriber, subscribee, blocked } = response.data;
  return new Subscription(subscription_id, subscriber, subscribee, blocked);
}
