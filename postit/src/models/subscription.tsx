export class Subscription {
  subscriptionId: number;
  subscriber: number;
  subscribee: number;
  blocked: boolean;
  subscriberName?: string;
  subscriberId?: number;
  subscribeeName?: string;
  subscribeeId?: number;
  constructor(
    subscriptionId: number,
    subscriber: number,
    subscribee: number,
    blocked: boolean,
    subscriberName?: string,
    subscriberId?: number,
    subscribeeName?: string,
    subscribeeId?: number
  ) {
    this.subscriptionId = subscriptionId;
    this.subscriber = subscriber;
    this.subscribee = subscribee;
    this.blocked = blocked;
    this.subscriberName = subscriberName;
    this.subscriberId = subscriberId;
    this.subscribeeName = subscribeeName;
    this.subscribeeId = subscribeeId;
  }
}
