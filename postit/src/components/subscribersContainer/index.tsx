import React from 'react';
import { SubscriberCard } from '../subscriberCard';
import './style.css';
import { Subscription } from '../../models/subscription';

interface ISubscribersContainerProps {
  subsArray: Subscription[];
  type: string;
  blockUser: (subs: Subscription) => void;
  unblockUser: (subs: Subscription) => void;
  unsubscribe: (subs: Subscription) => void;
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
            this.props.subsArray.map((u: Subscription) => {
              return (
                <SubscriberCard
                  unsubscribe={this.props.unsubscribe}
                  unblockUser={this.props.unblockUser}
                  blockUser={this.props.blockUser}
                  key={u.subscriptionId}
                  type={this.props.type}
                  subscription={u}
                />
              );
            })}
        </div>
      </>
    );
  }
}
