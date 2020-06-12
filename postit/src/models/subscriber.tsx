export class Subscription {
  subscriptionId: number;
  subscriber: number;
  subscribee: number;
  blocked: boolean;
  constructor(
    subscriptionId: number,
    subscriber: number,
    subscribee: number,
    blocked: boolean
  ) {
    this.subscriptionId = subscriptionId;
    this.subscriber = subscriber;
    this.subscribee = subscribee;
    this.blocked = blocked;
  }
}
