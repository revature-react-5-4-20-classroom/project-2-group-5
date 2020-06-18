import React from 'react';
import { SubscriberCard } from '../subscriberCard';
import './style.css';
import { Subscription } from '../../models/subscription';

interface ISubscribersContainerProps {
  subsArray: Subscription[];
}

export class SubscribersContainer extends React.Component<
  ISubscribersContainerProps,
  any
> {
  constructor(props: ISubscribersContainerProps) {
    super(props);
  }
  render() {
    return (
      <>
        <div className='subscriber-container'>
          {this.props.subsArray &&
            this.props.subsArray.map((u) => {
              return <SubscriberCard key={u.subscriptionId} subscription={u} />;
            })}
        </div>
      </>
    );
  }
}
