import React from 'react';
import './style.css';
import {
  Card,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from 'reactstrap';
import somepic from '../../img/profileplaceholder.jpg';
import { Subscription } from '../../models/subscription';

interface ISubscriberCardProps {
  subscription: Subscription;
  type: string;
  blockUser: (subs: Subscription) => void;
  unblockUser: (subs: Subscription) => void;
  unsubscribe: (subs: Subscription) => void;
}

export class SubscriberCard extends React.Component<ISubscriberCardProps, any> {
  constructor(props: ISubscriberCardProps) {
    super(props);
  }

  block = async (e: any) => {
    e.preventDefault();
    this.props.blockUser(this.props.subscription);
  };

  unblock = async (e: any) => {
    e.preventDefault();
    this.props.unblockUser(this.props.subscription);
  };

  unsub = async (e: any) => {
    e.preventDefault();
    this.props.unsubscribe(this.props.subscription);
  };

  render() {
    return (
      <>
        {this.props.type === 'subscribee' ? (
          <Card className='subscriber-card'>
            <Row className='card-row'>
              <Col xs={4}>
                <CardBody>
                  <img
                    className='profile-pic'
                    width='65%'
                    alt='Card image cap'
                    src={somepic}
                  />
                  <CardText>{this.props.subscription.subscriberName}</CardText>
                </CardBody>
              </Col>
              <Col className='button-column' xs={8}>
                {this.props.subscription.blocked ? (
                  <Button
                    color='danger'
                    data-id={this.props.subscription.subscriberId}
                    className='remove-button'
                    onClick={this.unblock}
                  >
                    Unblock
                  </Button>
                ) : (
                  <Button
                    color='danger'
                    data-id={this.props.subscription.subscriberId}
                    className='remove-button'
                    onClick={this.block}
                  >
                    Block
                  </Button>
                )}
              </Col>
            </Row>
          </Card>
        ) : (
          <Card className='subscriber-card'>
            <Row className='card-row'>
              <Col xs={4}>
                <CardBody>
                  <img
                    className='profile-pic'
                    width='65%'
                    alt='Card image cap'
                    src={somepic}
                  />
                  <CardText>{this.props.subscription.subscribeeName}</CardText>
                </CardBody>
              </Col>
              <Col className='button-column' xs={8}>
                <Button
                  color='danger'
                  data-id={this.props.subscription.subscriberId}
                  className='remove-button'
                  onClick={this.unsub}
                >
                  Unsubscribe
                </Button>
              </Col>
            </Row>
          </Card>
        )}
      </>
    );
  }
}
