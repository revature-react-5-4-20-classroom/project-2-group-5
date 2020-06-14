import React from 'react';
import { SubscriberCard } from '../subscriberCard';
import './style.css';

export class SubscribersContainer extends React.Component<any, any> {
  render() {
    return (
      <>
        <div className='subscriber-container'>
          <SubscriberCard />
          <SubscriberCard />
          <SubscriberCard />
          <SubscriberCard />
          <SubscriberCard />
          <SubscriberCard />
        </div>
      </>
    );
  }
}
